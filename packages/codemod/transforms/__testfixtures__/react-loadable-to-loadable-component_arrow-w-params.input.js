/* eslint-disable */
import Loadable from 'react-loadable'

const CustomLinkLoadable = Loadable({
  loader: () =>
    import(/* webpackChunkName: "custom-link" */ '@components/CustomLink/Link'),
  loading: (props) => {
    if (props.error || props.timedOut) {
      throw new Error('Failed to load custom link chunk')
    } else if (props.loading) {
      return <div>loading...</div>;
    }
  },
  delay: 0,
})
