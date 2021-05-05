import react from 'react';
import './style.css';

const Button = ({children, ...btnProp}) => {
    return(
        <button className="btn" {...btnProp}>
            {children}
        </button>
    )
}

export default Button;