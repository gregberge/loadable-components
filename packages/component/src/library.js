/* eslint-disable no-use-before-define, react/no-multi-comp */
import createLoadable from './createLoadable'

export const { loadable, lazy } = createLoadable({
  onLoad(result, props) {
    if (result && props.forwardedRef) {
      if (typeof props.forwardedRef === 'function') {
        props.forwardedRef(result)
      } else {
        props.forwardedRef.current = result
      }
    }
  },
  render({ result, props }) {
    if (props.children) {
      return props.children(result)
    }

    return null
  },
})
