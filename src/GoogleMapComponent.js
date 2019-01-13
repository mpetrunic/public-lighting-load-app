import React from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import { compose, withProps } from 'recompose'
import config from './config'

class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 38.889484, lng: -77.035278}}
      >

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
)(GoogleMapComponent);
