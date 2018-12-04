import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import './index.css'

function reducer(state, action) {
  if (!state) {
    return {
      themeColor: 'red'
    }
  }

  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  dispatch({})
  return { getState, dispatch, subscribe }
}

let store = createStore(reducer)


class Index extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    // Context
    return { store }
  }

  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)