import React, { useContext, useEffect, useState } from 'react';
import carData from '../../data/data.json';
import Car from '../Car/Car';
import './Home.css';
import {carContext} from '../../App';

const Home = () => {
    const [cars, setCars] = useContext(carContext);
    // useEffect( () => {
    //     setCars(carData);
    //     console.log(carData);
    // }, [])
    return (
        <div className="home">
            <div className="row card-box justify-content-center">
         {
              cars.map(car => <Car car={car} key={car.id}></Car>)
          }
         </div>

        </div>
    );
};

export default Home;