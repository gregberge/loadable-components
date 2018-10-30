/* eslint-disable no-use-before-define, react/no-multi-comp */
import createLoadable from './createLoadable'

const library = createLoadable({
  render({ result, loading, props, error }) {
    if (!loading && !error && props.ref) {
      if (typeof props.ref === 'function') {
        props.ref(result)
      } else {
        props.ref.current = result
      }
    }

    if (!loading && props.children) {
      return props.children(result)
    }

    return null
  },
})

export default library
