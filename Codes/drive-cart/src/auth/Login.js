import {React, useState, useEffect} from 'react'
import {Box, Typography, TextField,Button} from '@mui/material'
import { login} from '../api-endpoints/endpoints';
import {useDispatch} from 'react-redux';
import {authActions} from '../store'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({email: "", password: ""});
    
const onResReceived = (data)=>{
    console.log(data);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("clientType", data.user.clientType);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("username", data.user.name);
    localStorage.setItem("firstName", data.user.firstName);
    localStorage.setItem("lastName", data.user.lastName);
    localStorage.setItem("phoneNumber", data.user.phoneNumber);
    localStorage.setItem("registrationNumber", data.user.registrationNumber);
    localStorage.setItem("companyName", data.user.companyName);


    dispatch(authActions.login());
   
   navigate('/');
}

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
            login(inputs).then(onResReceived)
            .catch((err)=>console.log(err));

        

    }

    const handleChange = (e)=>{
       setInputs((prev)=>({
        ...prev,
        [e.target.name] : e.target.value,
       }))
    }
  return (
    <Box width={{ xs: "90%", sm: "40%" }}

     borderRadius={10}
      boxShadow={"10px 5px 15px #ccc"}
       margin={"auto"}
        marginTop={12}>
             <form onSubmit={handleSubmit}>
                <Box 
                display={"flex"}
                flexDirection={"column"}
                width={"60%"}
                padding={2}
                margin={"auto"}
                >
                    <Typography fontFamily={"quicksand"} padding={1} variant="h4" color='info' textAlign={"center"}>
                    {"Login"}
                    </Typography>
                    <TextField label="Email" value={inputs.email} onChange={handleChange} name="email" type="email" required margin="normal"/>
                    <TextField label="Password" value={inputs.password} onChange={handleChange} name="password" type="password"  required margin="normal"/>
                    <Button sx={{mt: 2, borderRadius: 10}} type="submit" variant="contained"> {"Login"}</Button>
                    <Button sx={{mt:2 , borderRadius: 10}} LinkComponent={Link} to='/register' variant="outlined">Change to {"Signup"}</Button>
                    
                </Box>
             </form>
        </Box>
  )
}

export default Login