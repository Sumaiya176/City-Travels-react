import React, { useContext, useEffect, useState } from 'react';
import './Description.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { userContext } from '../../App';
import { carContext } from '../../App';
import { useParams } from 'react-router';
import carData from '../.././data/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    // lat: -3.745,
    // lng: -38.523
    lat: 23.81021732852621, 
    lng: 90.41041434175473
};



const Description = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: " AIzaSyCRyCZK2FLcs86SIh-hWV3tOL3EXy3C_C0"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
   
    const [location, setLocation] = useState({
        userLocation: false,
        start: '',
        end: ''
    })

    const handleBlur = (e) => {
        let newStartLocation;
        let newEndLocation;
        if (e.target.name === "start") {
            newStartLocation = { ...location }
            newStartLocation.start = e.target.value;
            setLocation(newStartLocation)
        }
        else {
            newEndLocation = { ...location }
            newEndLocation.end = e.target.value;
            setLocation(newEndLocation)
        }
    }


    const { id } = useParams(); 
    const [vehicles, setVehicles] = useState([]);
     useEffect( () => {
        setVehicles(carData);
    }, [])
   const carImg = vehicles.find ( vehicle => id == vehicle.id )

    const handleSubmit = (e) => {
        if (location.start && location.end) {
            const newLocationInfo = { ...location };
            newLocationInfo.userLocation = true;
            setLocation(newLocationInfo)
        }

    //    let carImg = vehicles.find ( vehicle => 'id' === vehicle.id );
    //    console.log(carImg)
    //    console.log(vehicles)

        e.preventDefault();
    }

    return (
        <div>
            <h6 className="user-name">{loggedInUser.name}</h6>
            {/* <h6>{user.name}</h6> */}
            <div className="description">
                <div className="des-box">
                    <form onSubmit={handleSubmit}>
                        {location.userLocation ?
                          <div>
                                <div className="location">
                                <h6 className="location-name">{location.start} to {location.end}</h6>
                                </div>
                            <div className="img-box">
                                <div class="single-car-box">
                                <img className="car-img" src={carImg.image} alt="" srcset=""/>
                                <p><span className="name">{carImg.name}</span></p>
                                <p><span className="name"><FontAwesomeIcon icon={faUserFriends} />  {carImg.passengers}</span></p>
                                <p><span className="name">{carImg.fare}</span></p>
                                </div>
                            </div>
                            <div className="img-box">
                            <div class="single-car-box">
                                <img className="car-img" src={carImg.image} alt="" srcset=""/>
                                <p><span className="name">{carImg.name}</span></p>
                                <p><span className="name"><FontAwesomeIcon icon={faUserFriends}/>  {carImg.passengers}</span></p>
                                <p><span className="name">{carImg.fare}</span></p>
                                </div>
                            </div>
                            <div className="img-box">
                            <div class="single-car-box">
                                <img className="car-img" src={carImg.image} alt="" srcset=""/>
                                <p><span className="name">{carImg.name}</span></p>
                                <p><span className="name"><FontAwesomeIcon icon={faUserFriends} />  {carImg.passengers}</span></p>
                                <p><span className="name">{carImg.fare}</span></p>
                                </div>
                            </div>
                          </div>
                            :
                            <div>
                                <p><small>Pick From</small></p>
                                <input name="start" onBlur={handleBlur} type="text" required></input>
                                <p><small>Pick To</small></p>
                                <input name="end" onBlur={handleBlur} type="text" required></input><br />
                                <input className="btn btn-success button" type="submit" value="Search" />
                            </div>
                        }
                    </form>
                </div>
                <div className="map-img">
                   { isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <></>
                    </GoogleMap>
                    ) : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Description);