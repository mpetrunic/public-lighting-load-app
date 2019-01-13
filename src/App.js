import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'
import streetService from './streetService'
import GoogleMapComponent from './GoogleMapComponent'

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
                  <li style={{width: '100%', 'list-style-type': 'none'}}><Button
                    block>{street}</Button>
                  </li>)
              })
            }
          </ul>
        </div>

        <div id="right">
          <div className="Map">
            <GoogleMapComponent/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
