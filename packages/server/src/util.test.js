import { joinURLPath } from './util'

describe('util', () => {
  describe('#joinURLPath', () => {
    it('should join paths with relative public path', () => {
      expect(joinURLPath('public', 'style.css')).toBe('public/style.css')
      expect(joinURLPath('public/', 'style.css')).toBe('public/style.css')
    })

    it('should join paths starting with "/"', () => {
      expect(joinURLPath('/foo', 'style.css')).toBe('/foo/style.css')
      expect(joinURLPath('/', 'style.css')).toBe('/style.css')
    })

    it('should join paths with absolute public path', () => {
      const publicPath = 'http://localhost:3001/public'

      expect(joinURLPath(publicPath, 'style.css')).toBe(
        `http://localhost:3001/public/style.css`,
      )
      expect(joinURLPath(`${publicPath}/`, 'style.css')).toBe(
        `http://localhost:3001/public/style.css`,
      )
    })

    it('should join paths with protocol free public path', () => {
      const publicPath = '//127.0.0.1/public'
      expect(joinURLPath(publicPath, 'style.css')).toBe(
        `//127.0.0.1/public/style.css`,
      )
    })
  })
})
