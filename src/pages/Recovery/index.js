import {react, Component} from 'react';
import {signInWithGoogle, auth} from '../../firebase/utils'
import Button from '../../components/forms/button/index'
import Input from '../../components/forms/formInput/index'
import './style.css'

const initialState = {
    email: '',
    errors: [],
    success: []
}

class Recovery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        // this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
    }

    
    // forceUpdateHandler = () =>{
    //     this.forceUpdate();
    // };
    
    handleSubmit = async e => {
        e.preventDefault();
        
        this.setState({
            errors: [],
        })

        const {email,errors, success} = this.state;
        const err = [];
        const successCollection = [];

        if(email === ""){
            const err = "Email feild is empty"
            errors.push(err);
            this.setState({
                errors: errors
            })
        }
        else{
            try {
                
                const config = {
                    url:'http://localhost:3000/login'
                }


                await auth.sendPasswordResetEmail(email,config)
                    .then(() =>{
                        const successCollection = "Password Recovery link has been sent to your email"
                        success.push(successCollection);
                        this.setState({
                            success: success
                        })
                    })
                    .catch( () =>{
                        const err = "Email doesnt exist"
                        errors.push(err);
                        this.setState({
                            errors: errors
                        })
                    })
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

        const {email, errors, success} = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 ">
                        <h1 class="mb-4 text-center">Recover Password</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={this.handleChange}  required/>
                            {success.length > 0 && (
                                
                                <ul className="successToken">
                                    {success.map( (success,index2) => {
                                        return(
                                            <li key={index2}>{success}</li>
                                        )
                                    })}
                                </ul>
                            )}
                            {errors.length > 0 && (
                                <ul className="errorToken">
                                    {errors.map( (error,index) => {
                                        return (
                                            <li key={index}>{error}</li>
                                        )
                                    })}
                                </ul>
                            )}
                            <div className="text-center mt-5">
                                <Button>Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recovery
