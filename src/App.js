import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'
import streetService from './streetService'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      streets: []
    }
  }

  componentDidMount () {
    streetService.getStreets()
      .then(data => {
        console.log(data)
        this.setState({streets: data})
      })
  }

  render () {
    return (
      <div className="App">
        <div id="left">
          <h1>Streets:</h1>
          <ul>
            {
              this.state.streets.map((street) => {
                return (
                  <li style={{width: "100%", "list-style-type": "none"}}><Button block>{street}</Button>
                  </li>)
              })
            }
          </ul>
        </div>

        <div id="right">
          <p>Right Half</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
            vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
            amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
            placerat eleifend leo. Quisque sit amet est et sapien ullamcorper
            pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,
            ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
            condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
            dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent
            dapibus, neque id cursus faucibus, tortor neque egestas augue, eu
            vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
            tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
            vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
            amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
            placerat eleifend leo. Quisque sit amet est et sapien ullamcorper
            pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,
            ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
            condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
            dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent
            dapibus, neque id cursus faucibus, tortor neque egestas augue, eu
            vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
            tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        </div>
      </div>
    )
  }
}

export default App
