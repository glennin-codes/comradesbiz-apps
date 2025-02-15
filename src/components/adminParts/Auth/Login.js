import React, { useContext, useEffect } from 'react';
import { Typography, FormControl, InputLabel, InputAdornment, IconButton, Input, Button, FormHelperText, CircularProgress, ThemeProvider, CssBaseline } from '@mui/material';
import "./Login.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Container, } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';
import axios from 'axios';
import MuiTheme from '../utils/MuiTheme';
// import { AuthContext } from '../context/AuthContext';
import {TextField} from '@mui/material'
const Login = () => {
// const {setUser }=useContext(AuthContext)
    const navigate =useNavigate();
const[error,setError]=useState(null);
const[succes,setSucces]=useState(null);
const[loading,setIsLoading]=useState(false);
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = values;
       

      

       
        let err

        if(email === ''){
            err = "Email is required" ;
          
        }
         
           else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
            err = "Enter a valid email";
            
           } 
          else if ( password === '' ){
               err = "Password is required";
               
          }
          if (err) {
            setError(err);
            return; // exit function early
          }
              

                const newValues={
                    ...values
                };
                delete newValues.showPassword
                setValues(newValues);
                setIsLoading(true);
                setError(null);
              

       try {
        const response=await axios.post('https://comradesbizapi.azurewebsites.net/api/user/login',values);
        if( response ){
            console.log(response.data);
            const{data,status}=response
            // setUser(data);
            setIsLoading(false);
            if(status===200){
                const {token,name,email,id}=data;
                 localStorage.setItem('name',name);
                 localStorage.setItem('token',token);
                    localStorage.setItem('email',email);
                    localStorage.setItem('id',id);
               //setting up cookie
               console.log('name',name)
               
console.log(id);
              
                
           setValues('');
              setSucces("logged in succesfull");
              navigate('/admin');
        
         
             
            }
        }
        
        }catch (error) {
         if(error && error.response){
            const{data,status}=error.response;
            if(status === 401){
                console.log(data.error);
             
              setError(data.error);
            
        
             
            }
            else if(status === 500){
              
              setError(data.error,'kindly try again later');
              
            }else{
             
              setError('Timeout,something went wrong');
              
            }
        }else{
            setError('network error check your connection and try again later')
            
        }
        setIsLoading(false);
    }
}    
    return (

    <ThemeProvider theme={MuiTheme}>
          <Container sx={{marginTop:'30px'}} component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop:'30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
     >
        <div className="login-container">
            <div className="formmcontainer">
                <Typography variant="h3" sx={{textAlign:'center'}} >
                    <Typewriter
                        options={{ loop: true }}
                        onInit={(typewriter) => {
                            typewriter.typeString('Login')
                                .pauseFor(2500).deleteAll()
                                .typeString('Sign in').pauseFor(2500)
                                .start();
                        }}
                    />
                </Typography>
                <Box component='form'  style={{ margin: '20px 0 0' }} onSubmit={handleSubmit}>
                <TextField sx={{ m: 1 }} color="primary"  fullWidth 
                        label="Email"
                            id="login-email"
                            type='email'
                            defaultValue={values.email}
                            onChange={handleChange('email')} />
                
                    <TextField  sx={{ m: 1 }} color="primary"  fullWidth 

                        label="Password"
                            id="login-passwordField"
                            type={values.showPassword ? 'text' : 'password'}
                            defaultValue={values.password}
                            onChange={handleChange('password')}
                           InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                           }}
                           
                        />
                    
 

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormHelperText sx={{
                            color: 'red', mx: 1, textTransform: 'capitalize'
                        }}>{error}</FormHelperText>
                        <FormHelperText sx={{
                            color: 'blue', mx: 1, textTransform: 'capitalize'
                        }}>{succes}</FormHelperText>

                        <Typography sx={{ ml: 4 }}>Forgot Password</Typography>
                    </Box>

                  
                    <Button variant="contained" size="large" color="primary" type="submit"
                        sx={{ width: '100%', mt: 1.5, mb: 4 }}
                        disabled={loading}
                        >
                        {loading?<CircularProgress size={24} />: 'Login'}
                    </Button>

                </Box>
                <Box>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have account? <NavLink to="/auth/signup"
                            style={{ color: 'red' }}>
                            Create account</NavLink>
                    </Typography>
                </Box>
            </div>
        </div>
        </Box>
        </Container>

        </ThemeProvider>
         
    );

}

export default Login;