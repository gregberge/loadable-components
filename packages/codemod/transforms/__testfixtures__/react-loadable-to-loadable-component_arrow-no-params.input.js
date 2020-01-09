/* eslint-disable */
import Loadable from 'react-loadable'

const CustomLinkLoadable = Loadable({
  loader: () =>
    import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'),
  loading: () => <div>loading...</div>,
  delay: 0,
})
