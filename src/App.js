import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './App.css'
import streetService from './streetService'
import GoogleMapComponent from './GoogleMapComponent'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      streets: [],
      street: null,
      totalWatts: 0,
      avgWatts: 0,
      maxWatts: 0,
      minWatts: Number.MAX_SAFE_INTEGER,
      streetData: null
    }
  }

  componentDidMount () {
    streetService.getStreets()
      .then(data => {
        console.log(data)
        this.setState({streets: data})
      })
  }

  onStreetClick = async (street) => {
    this.setState({
      street: street
    })
    const streetData = await streetService.fetchStreetData(street);
    let sum = 0, min = Number.MAX_SAFE_INTEGER, max = 0;
    for(const segment of streetData.features) {
      const value = parseInt(segment.properties.sum, 10);
      if(value < min) min = value;
      if(value > max) max = value;
      sum += value;
    }

    this.setState({
      streetData,
      totalWatts: sum / 1000,
      avgWatts: (sum/streetData.features.length)/1000,
      minWatts: min,
      maxWatts: max
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
                  <li style={{width: '100%', 'list-style-type': 'none'}}>
                    <Button block onClick={() => this.onStreetClick(street)}>{street}</Button>
                  </li>)
              })
            }
          </ul>
        </div>

        <div id="right">
          <div className="Map">
            <GoogleMapComponent data={this.state.streetData} minWatts={this.state.minWatts} maxWatts={this.state.maxWatts}/>
          </div>
          <div id="calculations">
            <h3>Street: {this.state.street}</h3>
            <h5>Total watts: </h5> <span>{this.state.totalWatts || 0} kW</span>
            <h5>Average watts per km: </h5> <span>{this.state.avgWatts || 0} kW</span>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
