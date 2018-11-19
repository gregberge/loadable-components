import { joinURLPath } from './util'

describe('util', () => {
  describe('#joinURLPath', () => {
    it('should join paths with relative public path', () => {
      expect(joinURLPath('public', 'style.css')).toBe('public/style.css')
      expect(joinURLPath('public/', 'style.css')).toBe('public/style.css')
    })
    it('should join paths with absolute public path', () => {
      const publicPath = 'http://localhost:3001/public'

      expect(joinURLPath(publicPath, 'style.css')).toBe(
        `${publicPath}/style.css`,
      )
      expect(joinURLPath(`${publicPath}/`, 'style.css')).toBe(
        `${publicPath}/style.css`,
      )
    })
  })
})
