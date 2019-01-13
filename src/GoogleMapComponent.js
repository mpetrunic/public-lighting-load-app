import React from 'react'
import { GoogleMap, Polyline, withScriptjs, withGoogleMap } from 'react-google-maps'
import { compose, withProps} from 'recompose'
import config from './config'
import interpolate from './color-interpolation'

class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        features: []
      },
      minWatts: props.minWatts,
      maxWatts: props.maxWatts,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.state.data) {
      console.log({geo: nextProps.data})
      this.setState({
        data: nextProps.data
      })
    }
    if(nextProps.minWatts !== this.state.minWatts) {
      this.setState({
        minWatts: nextProps.minWatts
      })
    }
    if(nextProps.maxWatts !== this.state.maxWatts) {
      this.setState({
        maxWatts: nextProps.maxWatts
      })
    }
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 38.889484, lng: -77.035278}}
      >
        {
          this.state.data.features.map((segment, i) => {
            const path = segment.geometry.coordinates.map(elem => {return {
              lat: elem[1],
              lng: elem[0]
            }});
            const color = interpolate(((parseInt(segment.properties.sum, 10) - this.state.minWatts) * 100) / (this.state.maxWatts - this.state.minWatts));
            console.log({path})
            return (
              <Polyline
                key={i}
                geodesic={true}
                path={path}
                options={{
                  strokeColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  strokeOpacity: 1.0,
                  strokeWeight: 5,
                  style: {
                    strokeColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    strokeOpacity: 1.0,
                    strokeWeight: 5
                  }
                }}
              />
            )
          })
        }

      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${config.gapiKey}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => new GoogleMapComponent(props));
