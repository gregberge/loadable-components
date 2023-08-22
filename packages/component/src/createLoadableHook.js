/* eslint-disable no-use-before-define, react/no-multi-comp, no-underscore-dangle */
import React from 'react'
import { invariant } from './util'
import Context from './Context'
import { LOADABLE_SHARED } from './shared'

const STATUS_PENDING = 'PENDING'
const STATUS_RESOLVED = 'RESOLVED'
const STATUS_REJECTED = 'REJECTED'

function resolveConstructor(ctor) {
  if (typeof ctor === 'function') {
    return {
      requireAsync: ctor,
      resolve() {
        return undefined
      },
      chunkName() {
        return undefined
      },
    }
  }

  return ctor
}

const useChunkExtractor = () => {
  return React.useContext(Context)
}

const identity = v => v

/**
 * options
 *  - cacheKey - override default cache key
 *  - suspense  set via lazy - throws promise if pending
 * 
 * @returns 
 */
function createLoadableHook(
  defaultResolveExport = identity
) {
  function loadableHook(loadableConstructor, options = {}) {
    const ctor = resolveConstructor(loadableConstructor)
    const cache = {}

    /**
     * Cachekey represents the component to be loaded
     * if key changes - component has to be reloaded
     * @param props
     * @returns {null|Component}
     */
    function getCacheKey(props) {
      if (options.cacheKey) {
        return options.cacheKey(props)
      }
      if (ctor.resolve) {
        return ctor.resolve(props)
      }
      return 'static'
    }

    function cachedLoad(props) {
      const cacheKey = getCacheKey(props)
      let promise = cache[cacheKey]

      if (!promise || promise.status === STATUS_REJECTED) {
        promise = ctor.requireAsync(props)
        promise.status = STATUS_PENDING
        cache[cacheKey] = promise

        promise.then(
          () => {
            promise.status = STATUS_RESOLVED
          },
          error => {
            console.error(
              'loadable-components: failed to asynchronously load component',
              {
                fileName: ctor.resolve(props),
                chunkName: ctor.chunkName(props),
                error: error ? error.message : error,
              },
            )
            promise.status = STATUS_REJECTED
          },
        )
      }
 
      return promise
    }

    /**
     * access the persistent cache
     */
    function getCache(cacheKey) {
      return cache[cacheKey]
    }

    /**
     * sets the cache value. If called without value sets it as undefined
     */
    function setCache(cacheKey, value = undefined) {
      cache[cacheKey] = value
    }

    function resolve(module, props) {
      return options.resolveExport
        ? options.resolveExport(module, props)
        : defaultResolveExport(module)
    }

    /**
     * Synchronously loads component
     * target module is expected to already exists in the module cache
     * or be capable to resolve synchronously (webpack target=node)
     */
    function loadSync(props) {
      try {
        return {
          result: resolve(ctor.requireSync(props)),
        }
      } catch (error) {
        console.error(
          'loadable-components: failed to synchronously load component, which expected to be available',
          {
            fileName: ctor.resolve(props),
            chunkName: ctor.chunkName(props),
            error: error ? error.message : error,
          },
        )
        return {
          error
        }
      }
    }

    /**
     * Asynchronously loads a component.
     */
    function loadAsync(props) {
      return cachedLoad(props)
    }
  
    function useLoadable(props) {
      const cacheKey = getCacheKey(props)
      const isMounted = React.useRef(true)
      const loadingResult = React.useRef({
        result: null,
        error: null,
      })
      const [loadingState, setLoadingState] = React.useState({
        cacheKey,
        loading: true,
      })
      React.useEffect(() => {
        isMounted.current = true
        return () => {
          isMounted.current = false
        }
      }, [])
      const chunkExtractor = useChunkExtractor()
      invariant(
        !chunkExtractor || ctor.requireSync,
        'SSR requires `@loadable/babel-plugin`, please install it',
      )
      const cacheKeyChanged = cacheKey !== loadingState.cacheKey

      let loadingThisRender = loadingState.loading || cacheKeyChanged

      const isServer = !!chunkExtractor

      // Client-side with `isReady` method present (SSR probably)
      // If module is already loaded, we use a synchronous loading
      // Only perform this synchronous loading if the component has not
      // been marked with no SSR, else we risk hydration mismatches
      const isSyncClientLoad = !isServer && loadingThisRender &&
      options.ssr !== false &&
      // is ready - was loaded in this session
      ((ctor.isReady && ctor.isReady(props)) ||
        // is ready - was loaded during SSR process
        (ctor.chunkName &&
          LOADABLE_SHARED.initialChunks[ctor.chunkName(props)]))

      // Clear the cache if a new hook was mounted and the cached promise was rejected.
      React.useEffect(() => {
        // retrieve loading promise from a global cache
        const cachedPromise = getCache(cacheKey)

        // if promise exists, but rejected - clear cache
        if (cachedPromise && cachedPromise.status === STATUS_REJECTED) {
          setCache(cacheKey)
        }
      }, [cacheKey])

      React.useEffect(() => {
        if (!isSyncClientLoad && loadingThisRender) {
          loadAsync(props)
          .then(module =>  resolve(module, props))
          .then(result => {
            loadingResult.current = { result, error: null }
            if (isMounted.current) {
              setLoadingState({ loading: false, cacheKey })
            }
          })
          .catch(error => {
            loadingResult.current = { result: null, error }
            if (isMounted.current) {
              setLoadingState({ loading: false, cacheKey })
            }
          })
        }
      }, [cacheKey, loadingThisRender, isSyncClientLoad])

      // Server-side
      if (isServer) {
        // This module has been marked with no SSR
        if (options.ssr === false) {
          return null
        }

        // We run load function, we assume that it won't fail and that it
        // triggers a synchronous loading of the module
        ctor.requireAsync(props).catch(() => null)

        if (loadingThisRender) {
          // So we can require now the module synchronously
          loadingResult.current = loadSync(props)
          setLoadingState({
            cacheKey,
            loading: false,
          })
        }

        chunkExtractor.addChunk(ctor.chunkName(props))
        return loadingResult.current.result
      }

      if (isSyncClientLoad) {
        loadingResult.current = loadSync()
        setLoadingState({
          cacheKey,
          loading: false,
        })
        loadingThisRender = false
      }

      const { error, result } = loadingResult.current

      if (options.suspense) {
        const cachedPromise = getCache(cacheKey) || loadAsync(props)
        if (cachedPromise.status === STATUS_PENDING) {
          throw loadAsync(props)
        }
      }

      if (error) {
        throw error
      }

      if (loadingThisRender) {
        return null
      }

      return result
    }
    // In future, preload could use `<link rel="preload">`
    useLoadable.preload = props => {
      useLoadable.load(props)
    }

    useLoadable.load = props => {
      return cachedLoad(props)
    }

    return useLoadable
  }

  function lazy(ctor, options) {
    return loadableHook(ctor, { ...options, suspense: true })
  }

  return { loadableHook, lazy }
}

export default createLoadableHook
