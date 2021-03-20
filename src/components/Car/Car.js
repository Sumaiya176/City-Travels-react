import React from 'react';
import { useHistory } from 'react-router';
import './Car.css';

const Car = (props) => {
    const { name, image, id } = props.car;
    const history = useHistory();
    const handleDescription = (id) => {
        history.push(`/description/${id}`);
    }
    return (
        <div>
            <div>
                <div onClick={() => handleDescription(id)}>
                    <div className="card card-size" >
                        <img className="img" src={image} alt="" />
                        <div>
                            <h6 className="car-name">{name}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Car;