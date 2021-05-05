import {react, Component} from 'react';
import {Link} from 'react-router-dom'
import {signInWithGoogle, auth} from '../../firebase/utils'
import Button from '../../components/forms/button/index'
import Input from '../../components/forms/formInput/index'

import './style.css'

const initialState = {
    email: '',
    password: '',
    errors: []
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        
        this.setState({
            errors: []
        })

        const {email,password,errors} = this.state;
        const err = [];


        if(email === "" || password === ""){
            if(email === ""){
                const err = "Email feild is empty"
                errors.push(err);
                this.setState({
                    errors: errors
                })
            }
            if(password === ""){
                const err = "Password feild is empty"
                errors.push(err);
                this.setState({
                    errors: errors
                })
            }
        }
        else{
            try {
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({
                    ...initialState
                })
            }
            catch (err) {
                console.error(err)
            }
        }  
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    render(){

        const {email, password, errors} = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <h1 class="mb-4 text-center">Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={this.handleChange}  required/>
                            <Input type="password" label="Password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required/>  
                            <Link class="mb-3 text-black" to="/recovery">Recover Password</Link>
                            <div className="text-center mt-5">
                                <Button>Login</Button>
                            </div>
                            {errors.length > 0 && (
                                <ul>
                                    {errors.map( (error,index) => {
                                        return (
                                            <li key={index}>{error}</li>
                                        )
                                    })}
                                </ul>
                            )}
                        </form>
                        <form onSubmit={this.handleSubmit}>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <Button btnProp="googleBtn" onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login
