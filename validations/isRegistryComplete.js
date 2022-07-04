import axios from "axios"

export const isRegistryComplete = async (email) =>{
    try{
        await axios.get(`https://tasty-hub.herokuapp.com/api/user/check/registration/completion?email=${email}`)
        return {value: true, msj: ''}
    }catch(error){
        if(error.response.status === 404){
            return {value:false, msj:'not found'}
        }else{
            return {value:false, msj:'incomplete'}
        }
    }
}
export default isRegistryComplete