/* eslint-disable */
import loadable from '@loadable/component'

const Loading = props => {
  if (props.error || props.timedOut) {
    throw new Error('Failed to load custom link chunk')
  } else {
    return null
  }
}

const CustomLinkLoadable = loadable(() =>
  import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'), {
  fallback: Loading({
    pastDelay: true,
    error: false,
    timedOut: false,
  }),
})
