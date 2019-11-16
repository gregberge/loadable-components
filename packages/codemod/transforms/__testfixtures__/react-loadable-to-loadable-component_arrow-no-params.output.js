/* eslint-disable */
import loadable from '@loadable/component'

const CustomLinkLoadable = loadable(() =>
  import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'), {
  fallback: (() => <div>loading...</div>)(),
})
