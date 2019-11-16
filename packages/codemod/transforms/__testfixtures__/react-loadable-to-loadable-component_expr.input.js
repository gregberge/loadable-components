/* eslint-disable */
import Loadable from 'react-loadable'

const Loading = props => {
  if (props.error || props.timedOut) {
    throw new Error('Failed to load custom link chunk')
  } else {
    return null
  }
}

const CustomLinkLoadable = Loadable({
  loader: () =>
    import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'),
  loading: Loading,
  delay: 0,
})
