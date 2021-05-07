import {react, useState} from 'react';
import {signInWithGoogle, auth} from '../../firebase/utils'
import Button from '../../components/forms/button/index'
import Input from '../../components/forms/formInput/index'
import './style.css'


const Recovery = props =>  {
    
    const [email,setEmail] = useState('')
    const [success,setSuccess] = useState([])
    const [errors,setError] = useState([])

    const reset = () => {
        setEmail('');
        setSuccess([]);
        setError([]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        setError([])

        const err = [];
        const successCollection = [];

        if(email === ""){
            const err1 = "Email feild is empty"
            err.push(err1);
            setError(err);
        }
        else{
            const config = {
                url:'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email,config)
                .then((res) => {
                    const successCollection1 = "Password Recovery link has been sent to your email"
                    successCollection.push(successCollection1);
                    setSuccess(successCollection);
                    console.log(res)
                    if(res !== undefined && res.code === "auth/user-not-found"){
                        console.log(res.message);
                    }
                })
                .catch((err) => {
                    const successCollection1 = "Password Recovery link has been sent to your email"
                    successCollection.push(successCollection1);
                    setSuccess(successCollection);
                    console.log(err)
                })

            reset();
        }  
    }


    // try {
    //     const res =  await auth.sendPasswordResetEmail(email,config);
    //     if(res !== undefined && res.code === "auth/user-not-found"){
    //         console.log(res.message);
    //     }
    //     else{
    //         console.log(res);
    //     }
    //     //   const successCollection1 = "Password Recovery link has been sent to your email"
    //     //       successCollection.push(successCollection1);
    //     //       setSuccess(successCollection);
    //     //       console.log(successCollection)
    // } catch (error) {
    //     // console.log(error);
    //     // const err2 = "Email doesnt exist"
    //     // err.push(err2);
    //     // setError(err);
    //     if (error.response) {
    //         /*
    //          * The request was made and the server responded with a
    //          * status code that falls out of the range of 2xx
    //          */
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         /*
    //          * The request was made but no response was received, `error.request`
    //          * is an instance of XMLHttpRequest in the browser and an instance
    //          * of http.ClientRequest in Node.js
    //          */
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request and triggered an Error
    //         console.log('Error: ', error.message);
    //     }
    // }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 ">
                    <h1 className="mb-4 text-center">Recover Password</h1>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}  required/>
                        { success.length > 0 || (errors.length > 0 && (
                             <div className="mt-3 pt-3 border-top"> 
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
                            </div>
                        ))}
                        <div className="text-center mt-5">
                            <Button>Send</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Recovery
