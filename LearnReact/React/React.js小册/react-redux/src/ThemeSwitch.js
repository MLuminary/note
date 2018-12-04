import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  // dispatch action 去改变颜色
  handleSwitchColor = (color) => {
    const { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.handleSwitchColor('red')}>Red</button>
        <button onClick={() => this.handleSwitchColor('blue')}>Blue</button>
      </div>
    )
  }
}

export default ThemeSwitch