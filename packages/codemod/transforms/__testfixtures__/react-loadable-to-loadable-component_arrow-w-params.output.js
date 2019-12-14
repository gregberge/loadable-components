/* eslint-disable */
import loadable from '@loadable/component'

const CustomLinkLoadable = loadable(() =>
  import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'), {
  fallback: (props => {
    if (props.error || props.timedOut) {
      throw new Error('Failed to load custom link chunk')
    } else if (props.loading) {
      return <div>loading...</div>;
    }
  })({
    pastDelay: true,
    error: false,
    timedOut: false,
  }),
})
