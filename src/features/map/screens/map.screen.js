import React, { useContext, useState, useEffect } from "react"
import MapView, {Marker} from "react-native-maps"
import styled from "styled-components"
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";

const Map = styled(MapView)`
    height:100%
    width:100%
`;

export const MapScreen = () => {

    const { restaurants = [] } = useContext(RestaurantsContext);
    const [latDelta, setLatDelta] = useState(0);
    const lng = -87.629799;
    const lat = 41.878113;
    const viewport = {
        northeast: {
            lat: 41.88758823029149,
            lng: -87.6194830697085,
        },
        southwest: {
            lat: 41.88489026970849,
            lng: -87.6221810302915,
        },
    };

    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
    }, [viewport]);
    return (
        <>
            <Search />
            <Map
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02,
                }}>
                {restaurants.map((restaurant) => {
                    return <Marker
                        key={restaurant.name}
                        title={restaurant.name}
                        coordinate={{
                            latitude: restaurant.geometry.location.lat,
                            longitude: restaurant.geometry.location.lng,
                        }} />;
                })}
            </Map>
        </>
    )
}