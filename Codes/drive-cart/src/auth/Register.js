import {React, useState, useEffect} from 'react'
import {Box, Typography, TextField,Button,
     Select, FormControl, InputLabel, MenuItem} from '@mui/material'
import {register} from '../api-endpoints/endpoints';
import {useDispatch} from 'react-redux';
import {authActions} from '../store'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCompany, setIsCompany] = useState(true);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
        clientType: "COMPANY",
        companyName: "",
        registrationNumber: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });

    const clientType = {
        "INDIVIDUAL": false,
        "COMPANY": true
    }
    
const onResReceived = (data)=>{
    //console.log(data);
   
    //dispatch(authActions.login());
   
   navigate('/login');
}

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
     
            register(inputs).then(onResReceived)
            .catch((err)=>console.log(err));

       

    }

    const handleChange = (e)=>{
        if(e.target.name === "clientType"){
            setIsCompany(clientType[e.target.value]);
        }
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
                    { "Register" }
                    </Typography>
                   
                    <TextField label="Email" value={inputs.email} onChange={handleChange} name="email" type="email" required margin="normal"/>
                    <TextField label="Password" value={inputs.password} onChange={handleChange} name="password" type="password"  required margin="normal"/>
                    <TextField label="Name" value={inputs.name} onChange={handleChange} name="name" type="text" required margin="normal"/>
                    <FormControl fullWidth>
                        <InputLabel id="clientType">Type</InputLabel>
                    <Select labelId="clientType" label="Type Account" value={inputs.clientType} onChange={handleChange} name="clientType" required margin="normal">
                        <MenuItem value="COMPANY" >Company</MenuItem>
                        <MenuItem value="INDIVIDUAL"  >Individual</MenuItem>
                    </Select>
                    </FormControl>
                    {isCompany && <>
                    <TextField label="Company Name" value={inputs.companyName} onChange={handleChange} name="companyName" type="text"  margin="normal"/>
                    <TextField label="Registration Number" value={inputs.registrationNumber} onChange={handleChange} name="registrationNumber" type="text"  margin="normal"/>
                    </> }
                    <TextField label="First Name" value={inputs.firstName} onChange={handleChange} name="firstName" type="text"  margin="normal"/>
                    <TextField label="Last Name" value={inputs.lastName} onChange={handleChange} name="lastName" type="text"  margin="normal"/>
                    <TextField label="Phone Number" value={inputs.phoneNumber} onChange={handleChange} name="phoneNumber" type="tel"  margin="normal"/>

                    <Button sx={{mt: 2, borderRadius: 10}} type="submit" variant="contained"> {"Register"}</Button>
                    <Button sx={{mt:2 , borderRadius: 10}} LinkComponent={Link} to="/login" variant="outlined">Change to {"Login"}</Button>
                    
                </Box>
             </form>
        </Box>
  )
}

export default Register