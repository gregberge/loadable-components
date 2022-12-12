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
        import loadable from '@loadable/component'
        loadable(() => import(\`./ModA\`))
      `)

      expect(result).toMatchSnapshot()
    })
    it('should work with lazy if imported', () => {
      const result = testPlugin(`
        import { lazy } from '@loadable/component'
        lazy(() => import(\`./ModA\`))
      `)

      expect(result).toMatchSnapshot()
    })
    it('should not work with lazy if not imported', () => {
      const result = testPlugin(`
        import React, { lazy } from 'react'
        lazy(() => import(\`./ModA\`))
      `)

      expect(result).toMatchInlineSnapshot(`
        "import React, { lazy } from 'react';
        lazy(() => import(\`./ModA\`));"
      `)
    })
    it('should not work with renamed specifier by default', () => {
      const result = testPlugin(`
        import renamedLoadable from '@loadable/component'
        renamedLoadable(() => import(\`./ModA\`))
      `)

      expect(result).toMatchSnapshot()
    })
    it('should work with renamed lazy specifier', () => {
      const result = testPlugin(`
        import { lazy as renamedLazy } from '@loadable/component'
        renamedLazy(() => import(\`./ModA\`))
      `)

      expect(result).toMatchSnapshot()
    })
    it('should work with + concatenation', () => {
      const result = testPlugin(`
        import loadable from '@loadable/component'
        loadable(() => import('./Mod' + 'A'))
      `)

      expect(result).toMatchSnapshot()
    })

    it('should work with * in name', () => {
      const result = testPlugin(`
        import loadable from '@loadable/component'
        loadable(() => import(\`./foo*\`))
      `)

      expect(result).toMatchSnapshot()
    })

    it('should transform path into "chunk-friendly" name', () => {
      const result = testPlugin(`
        import loadable from '@loadable/component'
        loadable(() => import('../foo/bar'))
      `)

      expect(result).toMatchSnapshot()
    })

    describe('with "webpackChunkName" comment', () => {
      it('should use it', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(() => import(/* webpackChunkName: "ChunkA" */ './ModA'))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should use it even if comment is separated by ","', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(() => import(/* webpackPrefetch: true, webpackChunkName: "ChunkA" */ './ModA'))
        `)

        expect(result).toMatchSnapshot()
      })
    })

    describe('without "webpackChunkName" comment', () => {
      it('should add it', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(() => import('./ModA'))
        `)

        expect(result).toMatchSnapshot()
      })
    })

    describe('in a complex promise', () => {
      it('should work', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(() => timeout(import('./ModA'), 2000))
        `)

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('aggressive import', () => {
    it('should work with destructuration', () => {
      const result = testPlugin(`
        import loadable from '@loadable/component'
        loadable(({ foo }) => import(/* webpackChunkName: "Pages" */ \`./\${foo}\`))
      `)
      expect(result).toMatchSnapshot()
    })

    describe('with "webpackChunkName"', () => {
      it('should replace it', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(props => import(/* webpackChunkName: "Pages" */ \`./\${props.foo}\`))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should keep it', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(props => import(/* webpackChunkName: "pages/[request]" */ \`./pages/\${props.path}\`))
        `)

        expect(result).toMatchSnapshot()
        expect(result).toEqual(
          expect.stringContaining('return "pages/" + props.path.replace'),
        )
        expect(result).toEqual(
          expect.stringContaining('/* webpackChunkName: "pages/[request]"'),
        )
      })
    })

    describe('without "webpackChunkName"', () => {
      it('should support simple request', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(props => import(\`./\${props.foo}\`))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should support complex request', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(props => import(\`./dir/\${props.foo}/test\`))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should support destructuring', () => {
        const result = testPlugin(`
          import loadable from '@loadable/component'
          loadable(({ foo }) => import(\`./dir/\${foo}/test\`))
        `)

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('loadable.lib', () => {
    it('should be transpiled too', () => {
      const result = testPlugin(`
        import loadable from '@loadable/component'
        loadable.lib(() => import('moment'))
      `)

      expect(result).toMatchSnapshot()
    })
  })

  describe('Magic comment', () => {
    it('should transpile shortand properties', () => {
      const result = testPlugin(`
        const obj = {
          /* #__LOADABLE__ */
          load() {
            return import('moment')
          }
        }
      `)

      expect(result).toMatchSnapshot()
    })

    it('should transpile arrow functions', () => {
      const result = testPlugin(`
        const load = /* #__LOADABLE__ */ () => import('moment')
      `)

      expect(result).toMatchSnapshot()
    })

    it('should transpile function expression', () => {
      const result = testPlugin(`
        const load = /* #__LOADABLE__ */ function () {
          return import('moment')
        }
      `)
      expect(result).toMatchSnapshot()
    })

    it('should remove only needed comments', () => {
      const result = testPlugin(`
        const load = /* #__LOADABLE__ */ /* IMPORTANT! */ () => import('moment')
      `)

      expect(result).toMatchSnapshot()
    })
  })
})
