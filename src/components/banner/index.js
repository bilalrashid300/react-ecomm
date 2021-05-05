import react from 'react';
import './style.css';

const Banner = props => {
    return(
        <div className="banner">
            <img className={props.classTitle} src={props.image} alt="" />
        </div>
    )
}

export default Banner;