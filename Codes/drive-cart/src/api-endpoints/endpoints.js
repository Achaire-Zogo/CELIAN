import axios from "axios";

export const getAllUsers = async () => {
    const res = await axios.get(`/api/v1/users`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch users");
    }
 
    const data = res.data;
    return data;    
}
export const getUser = async (id) => {

    const res = await axios.get(`/api/v1/users/${id}`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch user");
    }
 
    const data = res.data;
    return data;
}

export const getAllVehicles = async () => {
    const res = await axios.get(`/api/vehicules`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch vehicles");
    }
 
    const data = res.data;
    return data;
}

export const addElectricCar = async(data)=>{

    const res = await axios.post(`/api/vehicules/electric/car`,{
        marque: data.marque,
        model: data.model,
        price: data.price,
        uri: data.uri,
        options: data.options,
        type: "ELECTRIC_CAR",
        batteryCapacity: data.batteryCapacity,
        drivingRange: data.drivingRange
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add electric car ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}
export const addFuelCar = async(data)=>{
    const res = await axios.post(`/api/vehicules/petrol/car`,{
        marque: data.marque,
        model: data.model,
        price: data.price,
        uri: data.uri,
        options: data.options,
        type: "FUEL_CAR",
        engineSize: data.engineSize,
        fuelType: data.fuelType
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add petrol car ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const addElectricScooter = async(data)=>{
    const res = await axios.post(`/api/vehicules/electric/scooter`,{
        marque: data.marque,
        model: data.model,
        price: data.price,
        uri: data.uri,
        options: data.options,
        type: "ELECTRIC_SCOOTER",
        batteryCapacity: data.batteryCapacity
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add electric scooter ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const addFuelScooter = async(data)=>{

    const res = await axios.post(`/api/vehicules/petrol/scooter`,{
        marque: data.marque,
        model: data.model,
        price: data.price,
        uri: data.uri,
        options: data.options,
        type: "FUEL_SCOOTER",
        engineSize: data.engineSize,
        fuelType: data.fuelType


    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add petrol scooter ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const addVehicleFleet = async(data)=>{
    const res = await axios.post(`/api/vehicules/flotte`,{
        flotteType: "ELECTRIC",
        vehicules: data.vehicules
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add fleet ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const addCart = async(id,qty=1)=>{
    let userId = parseInt(localStorage.getItem('userId'));
    const res = await axios.post(`/api/v1/cart/add?userId=${userId}&vehicleId=${id}&quantity=${qty}`)
    .catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to add to cart ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}


export const updateCartQuantity = async(id,qty=1)=>{
    //let userId = parseInt(localStorage.getItem('userId'));
    const res = await axios.post(`/api/v1/cart/update_cart_quantity?cartId=${id}&quantity=${qty}`)
    .catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to change cart quantity ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const removeCart = async(id)=>{

    let userId = parseInt(localStorage.getItem('userId'))
    const res = await axios.post(`/api/v1/cart/remove?userId=${userId}&vehicleId=${id}`)
    .catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to remove from cart ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}
export const login = async (data) => {
    const res = await axios.post(`/api/v1/users/login`,{
        email: data.email,
        password: data.password
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to authenticate ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}

export const register = async (data) => {
    const res = await axios.post(`/api/v1/users/register`,{
        email: data.email,
        password: data.password,
        name: data.name,
        clientType: data.clientType,
        companyName: data.companyName ? data.companyName : "", 
        registrationNumber: data.registrationNumber ? data.registrationNumber : "",
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
    }).catch((err)=> console.log(err));

    if(res.status !== 200 && res.status !== 201 ){
        return console.log(`Unable to authenticate ${res.status}`);
    }

    const resData = await res.data;
    return resData;
}


export const getAllOrders = async () => {
    const res = await axios.get(`/api/v1/orders/`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch orders");
    }
 
    const data = res.data;
    return data;    
}
export const getOrderById = async (id) => {
    const res = await axios.get(`/api/v1/orders/${id}`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log(`Unable to fetch order ${id}`);
    }
 
    const data = res.data;
    return data;    
}
export const getUserOrders = async () => {
    let userId = parseInt(localStorage.getItem('userId'))

    const res = await axios.get(`/api/v1/orders/user/${userId}`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch user orders");
    }
 
    const data = res.data;
    return data;
}


export const getUserCart = async () => {
    let userId = parseInt(localStorage.getItem('userId'))

    const res = await axios.get(`/api/v1/cart?userId=${userId}`).catch((err)=> console.log(err));
  
    if(res?.status !== 200){
     return console.log("Unable to fetch user cart");
    }
 
    const data = res.data;
    return data;
}

export const payUserOrders = async (paymentType,countryId) => {

    let userId = parseInt(localStorage.getItem('userId'))

    const res = await axios.post(`/api/v1/orders?userId=${userId}&type=${paymentType}&countryId=${countryId}`).catch((err)=> console.log(err));
  
    if(res.status !== 200 && res.status !== 201){
     return console.log("Unable to pay user orders");
    }
 
    const data = res.data;
    return data;
}



export const getAllCountries = async () => {
    const res = await axios.get(`/countries`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log("Unable to fetch countries");
    }
 
    const data = res.data;
    return data;    
}

export const getDocumentsByOrderId = async (id) => {
    const res = await axios.get(`/api/documents/get-by-order/${id}`).catch((err)=> console.log(err));
  
    if(res.status !== 200){
     return console.log(`Unable to fetch documents list ${id}`);
    }
 
    const data = res.data;
    return data;    
}