import React, { useState, useEffect } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { Container, Typography, Grid, Button,  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SignIn, SignUp } from '../../actions/auth';

import Input from './Input';

const initialState = { username:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorSignUp, setErrorSignUp] = useState('');
    const [errorSignIn, setErrorSignIn] = useState('');
    const [rerender, setRerender] = useState(false);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(SignUp(formData,setErrorSignUp));
        } else {
            dispatch(SignIn(formData,setErrorSignIn));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }    

    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    useEffect(()=> {
        setRerender(!rerender);
    },[dispatch])
    
    return (
        <>
            
            <Typography sx={{p:1}} component='h3' variant='h6'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
            {errorSignIn && (<Typography sx={{color:'secondary.main'}}>{errorSignIn}</Typography>)}
            {errorSignUp && (<Typography sx={{color:'secondary.main'}}>Username or email already taken</Typography>)}
            <form onSubmit={handleSubmit}>
                <Grid sx={{p:1}} container spacing={2}>
                    {isSignup && (
                        <Input fullWidth name='email' label='Email Address' handleChange={handleChange} type='email'/>
                    )}
                    <Input name='username' label='Username' handleChange={handleChange} />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{backgroundColor:'primary.main',marginTop:1}}>
                { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <Grid container justifyContent='flex-end'>
                <Grid sx={{marginTop:1}} item>
                    <Button onClick={switchMode}>{ isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
                </Grid>
            </Grid>
            </form>
        </>
    )
}


export default Auth;