import React from 'react'

class Counter extends React.Component {
  state = { count: 0 }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState(previousState => ({ count: previousState.count + 1 })),
      500,
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return this.state.count
  }
}

export default Counter
