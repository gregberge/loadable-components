/* eslint-disable no-use-before-define, react/no-multi-comp */
import createLoadable from './createLoadable'

export const { loadable, lazy } = createLoadable({
  onLoad(result, props) {
    if (result && props.ref) {
      if (typeof props.ref === 'function') {
        props.ref(result)
      } else {
        props.ref.current = result
      }
    }
  },
  render({ result, loading, props }) {
    if (!loading && props.children) {
      return props.children(result)
    }

    return null
  },
})
