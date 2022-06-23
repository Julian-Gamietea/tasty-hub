import { Text, View,StyleSheet,Image,ScrollView, Dimensions } from 'react-native'
import React  from 'react'
import { InputTasty } from '../shared-components/InputTasty'
import { ButtonCustom } from '../shared-components/ButtonCustom'
import axios from 'axios';
import validateEmail from '../validations/validateEmail';
import { isRegistryComplete } from '../validations/isRegistryComplete';

export const InsertMail = ({navigation}) =>{
  const [isValid, setIsValid] = React.useState(true)
  const [status, setStatus] = React.useState("");
  const [inputMail, setInputMail] = React.useState({mail: ''})
  const mail = inputMail.mail
  const handleChange = (text, mail) => {
    setInputMail({
        ...inputMail,
        [mail] : text
    });
}
const sentCode =  () => {
  setIsValid(true)
  setStatus("")
    if(validateEmail(mail)){
    isRegistryComplete(mail,{navigation})
      if(!isUserStudent(mail)){
        axios.get('https://tasty-hub.herokuapp.com/api/auth/token?email='+mail)
        .then(()=>{
            navigation.navigate('InsertCode',{mail: mail})
        })
        .catch( (e)=>{
          if (e.response.status == 422) {
            navigation.navigate('InsertCode',{mail: mail})
          }
          if(e.response.status == 404){
            setIsValid(false)
            setStatus("El mail ingresado no se encuentra registrado")
          }
          })
    }}
    else{
      setIsValid(false)
      setStatus("El mail ingresado no es valido")
    }

}
 const isUserStudent = (email) =>{
  axios.get(`https://tasty-hub.herokuapp.com/api/user/email/${email}`)
      .then((response)=>{
        if(response.data.role==="STUDENT"){
          navigation.navigate("UserStudentConflict")
          return true;
        }
        else{
          console.log("No es estudiante")
          return false
        }

        
      }).catch( (e)=>{
        console.log("el mail no existe")
        return false
      })
}


      
  return (
        <ScrollView style={styles.scrollView}>

          <View style = {styles.container}>
            <View style = {styles.imageContainer}>
              <Image source={require('../assets/icons/email-icon.png')} style = {styles.image}/>
            </View>
            
            <View style = {styles.formContainer}>
              <View style = {styles.formContainerItem}>
                <Text style = {styles.primaryText}> Ingrese su email </Text>
                <InputTasty onChange={(text) => handleChange(text, 'mail')}
                            value={inputMail.mail}
                            isValid={isValid}
                            placeholder = 'E.g: cooking@mail.com'/>
                             
                <Text style={styles.errorMessage}>{status}</Text>
                <Text style= {styles.secondaryText}> Le enviaremos un codigo de 6 digitos para continuar
                con su recuperacion de contraseña</Text>
              </View>
          
            </View>

            <View style = {styles.buttonContainer}>
              <ButtonCustom callback={() => sentCode()} text = 'Continuar'/> 
            </View>
            
          </View>

        </ScrollView>
      )
  }

const styles = StyleSheet.create(
  {
      image:{
          marginTop:"15%",
          alignContent:"center",
          alignItems:"center",
          width:Dimensions.get("screen").width-190,
          height:Dimensions.get("screen").height-715
      },
      errorMessage:{
        alignSelf:"center",
        alignContent:"center",
        fontWeight:"bold",
        fontSize:16,
        marginTop:"2%",
        color:"#FF9494"
      },
  
      container:{
          flex:1,
          justifyContent:"center",
          alignContent:"center",
          flexDirection:"column",
          backgroundColor: '#fff',
          alignItems: 'stretch'
      }
      ,
      primaryText:{
        marginTop:"30%",
        marginBottom:"4%",
        fontWeight: "600",
        color: "#000000",
        fontSize: 28,
        letterSpacing: 0,
        textAlign: "center"

      },
      secondaryText:{
        width:"92%",
        justifyContent:"center",
        fontWeight: "600",
        color: "#000000",
        fontSize: 14,
        marginTop:"10%",
        letterSpacing: 0,
        textAlign: "center",
      }
      
      ,
      imageContainer:{
          marginTop: "15%",
          alignItems: 'center'
      }
      ,
      formContainer:{
          flex:3,
          paddingLeft: "2%",
          paddingRight: "2%",
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginBottom: "8%"
      }
      ,
      inputContainer:{
          
          flex:.5,
          flexDirection: 'column',
          justifyContent: 'flex-start',
      },
      formContainerItem:{
        flex:.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
      buttonContainer:{
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: "10%",
        marginTop:"20%",
        marginBottom:"13%",
        flex:.5,

}
      ,
      button:{
        
          width: "100%"
      }
  }
)
export default InsertMail