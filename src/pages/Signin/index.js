import {react, useState} from 'react';
import {auth, handleUserProfile} from '../../firebase/utils'
import Input from '../../components/forms/formInput/index'
import Button from '../../components/forms/button/index'
import './style.css'


const Signin = props => {

    const [displayName,setDisplayName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [errors,setErrors] = useState('')

    const reset = () => {   
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors('');
    }


    const handleFormSubmit = async e => {
        e.preventDefault();
        const err = [];
        if(password !== confirmPassword || displayName === "" || email === ""){
            if( password !== confirmPassword){
                const err1 = ['Password does not match']; 
                err.push(err1);
                setErrors(err);
            }
            if( displayName === "" ){
                const err2 = ['Name is required']; 
                err.push(err2);
                setErrors(err);
            }
            if( email === "" ){
                const err3 = ['Email is required']; 
                err.push(err3);
                setErrors(err);
            }
            if( password === "" ){
                const err4 = ['Password is required']; 
                err.push(err4);
                setErrors(err);
            }
            if( confirmPassword === "" ){
                const err5 = ['Confirm password is required']; 
                err.push(err5);
                setErrors(err);
            }
            return
        }
        else{
            document.getElementById('errorList').remove();
            try{
                const { user } = await auth.createUserWithEmailAndPassword(email,password)
                await handleUserProfile( user, {displayName});
            }
            catch(e){
                console.log(e)
            }
            reset()
        }
    }  

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="text-center">Signin</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Input type="text" label="Name" name="displayName" value={displayName} placeholder="Full Name" onChange={e => setDisplayName(e.target.value)}   />
                        <Input type="email" label="Email" name="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}   />
                        <Input type="password" label="Password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}  />  
                        <Input type="password" label="Confirm Password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}  />
                        <div className="text-center mt-5">
                            <Button>Submit</Button>
                        </div>
                        {errors.length > 0 &&(
                            <ul id="errorList" className=" mt-3 pt-3 border-top errorToken">
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

export default Signin