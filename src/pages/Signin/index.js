import {react, Component} from 'react';
import {auth, handleUserProfile} from '../../firebase/utils'
import Input from '../../components/forms/formInput/index'
import Button from '../../components/forms/button/index'
import './style.css'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async e => {
        e.preventDefault();
        const {displayName, email, password, confirmPassword, errors} = this.state;
        const err = [];
        if(password !== confirmPassword || displayName === "" || email === ""){
            if( password !== confirmPassword){
                const err = ['Password does not match']; 
                errors.push(err);
                this.setState({
                    errors: errors
                })
            }
            if( displayName === "" ){
                const err = ['Name is required']; 
                errors.push(err);
                this.setState({
                    errors: errors
                })
            }
            if( email === "" ){
                const err = ['Email is required']; 
                errors.push(err);
                this.setState({
                    errors: errors
                })
            }
            return
        }
        else{
            const {displayName} = this.state;
            try{
                const { user } = await auth.createUserWithEmailAndPassword(email,password)
                console.log('Username',{displayName})
                await handleUserProfile( user, {displayName});
            }
            catch(e){
                console.log(e)
            }
            this.setState({
                ...initialState
            })
        }
    }  

    render() {

        const {displayName, email, password, confirmPassword, errors} = this.state

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className="text-center">Signin</h1>
                        <form onSubmit={this.handleFormSubmit}>
                            <Input type="text" label="Name" name="displayName" value={displayName} placeholder="Full Name" onChange={this.handleChange}  required />
                            <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={this.handleChange}  required />
                            <Input type="password" label="Password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required />  
                            <Input type="password" label="Confirm Password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={this.handleChange} required />
                            <div className="text-center mt-5">
                                <Button>Submit</Button>
                            </div>
                            {errors.length > 0 &&(
                                <ul>
                                    {errors.map((err,index) => {
                                        return(
                                            <li key={index}>{err}</li>
                                        )
                                    })}
                                </ul>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin