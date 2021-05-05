import react from 'react';
import './style.css';

const Input = ({label, handleChange, ...inputProp}) => {
    return(
        <div className="form-group">
            {label && (
                <label>{label}</label>
            )}
            <input className="form-control" onChange={handleChange} {...inputProp} />
        </div>
    )
}

export default Input;