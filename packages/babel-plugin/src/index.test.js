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

    it('should work with + concatenation', () => {
      const result = testPlugin(`
        loadable(() => import('./Mod' + 'A'))
      `)

      expect(result).toMatchSnapshot()
    })

    it('should work with * in name', () => {
      const result = testPlugin(`
        loadable(() => import(\`./foo*\`))
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

      it('should keep it', () => {
        const result = testPlugin(`
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
          loadable(props => import(\`./\${props.foo}\`))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should support complex request', () => {
        const result = testPlugin(`
          loadable(props => import(\`./dir/\${props.foo}/test\`))
        `)

        expect(result).toMatchSnapshot()
      })

      it('should support destructuring', () => {
        const result = testPlugin(`
          loadable(({ foo }) => import(\`./dir/\${foo}/test\`))
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
