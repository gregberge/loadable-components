import React from 'react'
import { render } from 'react-dom'
import loadable from '../../../packages/component'

const Hello = loadable(() => import('./Hello'))
const Moment = loadable.lib(() => import('moment'))

// You can now get a ref directly to the DOM button:

class App extends React.Component {
  constructor(props) {
    super(props)
    this.moment = React.createRef()
  }

  state = {
    moment: null,
  }

  handleRef = props => this.setState({ moment: props.default })

  render() {
    return (
      <>
        <Hello />
        <Moment>{({ default: moment }) => moment().format('HH:mm')}</Moment>

        <button type="button" onClick={this.handleClick}>
          Click
        </button>
        <Moment ref={this.handleRef} />
        <>{this.state.moment && this.state.moment().format('HH:mm')}</>
      </>
    )
  }
}

const root = document.createElement('div')
document.body.append(root)

render(<App />, root)
