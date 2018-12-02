import * as React from 'react'

export default (WrappedComponent, name) => {
  class LocalStorageActions extends React.Component {
    constructor(props) {
      super(props)
      this.state = { data: null }
    }
    // 如果是 Did 会造成子组件接受不到 props
    componentWillMount() {
      let data = localStorage.getItem(name)
      try {
        // 解析为 JSON 对象
        this.setState({data: JSON.parse(data)})
      } catch (e) {
        // 出错就当为普通字符串
        this.setState({data})
      }
    }

    saveData = (data) => {
      try {
        localStorage.setItem(name, JSON.stringify(data))
      } catch (e) {
        localStorage.setItem(name, `${data}`)
      }
    }

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          saveData={this.saveData}
          {...this.props}
        />
      )
    }
  }
  return LocalStorageActions
}