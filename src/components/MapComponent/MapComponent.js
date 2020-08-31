import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
export const MapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${__GOOGLE_MAP_KEY__}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    return <GoogleMap
        defaultZoom={16}
        center={props.marker}
    >
        {props.isMarkerShown && <Marker position={props.marker} />}
    </GoogleMap>;
}
);

MapComponent.propTypes = {
    isMarkerShown: PropTypes.bool.isRequired
};

export default MapComponent;
