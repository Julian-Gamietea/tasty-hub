import axios from "axios"

export const isRegistryComplete = (email,{navigation}) =>{
    axios.get(`https://tasty-hub.herokuapp.com/api/user/check/registration/completion?email=${email}`)
        .then(()=>{ 
            console.log("RegistroCompleto")
            return true})
        .catch( ()=>{
             navigation.navigate("IncompleteRegistry")
             return false
        })
}
export default isRegistryComplete