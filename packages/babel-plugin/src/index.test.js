/* eslint-disable import/no-extraneous-dependencies */
import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = code => {
  const result = transform(code, {
    plugins: [plugin],
    configFile: false,
  })

  return result.code
}

describe('plugin', () => {
  describe('simple import', () => {
    it('should work with template literal', () => {
      const result = testPlugin(`
        loadable(() => import(\`./ModA\`))
      `)

      expect(result).toMatchSnapshot()
    })

    it('should transform path into "chunk-friendly" name', () => {
      const result = testPlugin(`
        loadable(() => import('../foo/bar'))
      `)

      expect(result).toMatchSnapshot()
    })

    describe('with "webpackChunkName" comment', () => {
      it('should use it', () => {
        const result = testPlugin(`
          loadable(() => import(/* webpackChunkName: "ChunkA" */ './ModA'))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should use it even if comment is separated by ","', () => {
        const result = testPlugin(`
          loadable(() => import(/* webpackPrefetch: true, webpackChunkName: "ChunkA" */ './ModA'))
        `)

        expect(result).toMatchSnapshot()
      })
    })

    describe('without "webpackChunkName" comment', () => {
      it('should add it', () => {
        const result = testPlugin(`
          loadable(() => import('./ModA'))
        `)

        expect(result).toMatchSnapshot()
      })
    })

    describe('in a complex promise', () => {
      it('should work', () => {
        const result = testPlugin(`
          loadable(() => timeout(import('./ModA'), 2000))
        `)

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('aggressive import', () => {
    it('should work with destructuration', () => {
      const result = testPlugin(`
        loadable(({ foo }) => import(/* webpackChunkName: "Pages" */ \`./\${foo}\`))
      `)
      expect(result).toMatchSnapshot()
    })

    describe('with "webpackChunkName"', () => {
      it('should replace it', () => {
        const result = testPlugin(`
          loadable(props => import(/* webpackChunkName: "Pages" */ \`./\${props.foo}\`))
        `)

        expect(result).toMatchSnapshot()
      })
    })

    describe('without "webpackChunkName"', () => {
      it('should add it', () => {
        const result = testPlugin(`
          loadable(props => import(\`./\${props.foo}\`))
        `)

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('loadable.lib', () => {
    it('should be transpiled too', () => {
      const result = testPlugin(`
        loadable.lib(() => import('moment'))
      `)

      expect(result).toMatchSnapshot()
    })
  })
})
