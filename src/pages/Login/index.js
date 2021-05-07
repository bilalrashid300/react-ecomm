import {react, useState} from 'react';
import {Link} from 'react-router-dom'
import {signInWithGoogle, auth} from '../../firebase/utils'
import Button from '../../components/forms/button/index'
import Input from '../../components/forms/formInput/index'

import './style.css'


const Login = props =>  {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setError] = useState([])

    const reset = () => {
        setEmail('');
        setPassword('');
        setError([]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setError([]);
        const err = [];

        if(email === "" || password === ""){
            if(email === ""){
                const err1 = "Email feild is empty"
                err.push(err1);
                setError(err)
            }
            if(password === ""){
                const err2 = "Password feild is empty"
                err.push(err2);
                setError(err)
            }
        }
        else{
            try {
                await auth.signInWithEmailAndPassword(email, password);
                reset();
            }
            catch (err) {
                console.error(err)
            }
        }  
    }

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     this.setState({
    //         [name] : value
    //     })
    // }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 ">
                    <h1 class="mb-4 text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <Input type="password" label="Password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} required />  
                        <Link className="mb-3 text-black" to="/recovery">Recover Password</Link>      
                        {errors.length > 0 && (
                            <ul className="mt-3 pt-3 border-top errorToken">
                                {errors.map( (error,index) => {
                                    return (
                                        <li key={index}>{error}</li>
                                    )
                                })}
                            </ul>
                        )}
                        <div className="text-center mt-5">
                            <Button>Login</Button>
                        </div>
                    </form>
                    <form onSubmit={handleSubmit}>
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

export default Login
