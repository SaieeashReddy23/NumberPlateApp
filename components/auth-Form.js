import { useState } from "react";
import { View,Text,StyleSheet,Alert } from "react-native";
import Button from "./button";
import Input from "./input";
import { FontAwesome5 } from '@expo/vector-icons';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";


import { initializeApp } from "firebase/app";
import { useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDffJyYbPY5nDh_D2gKw5RPDgVp2iUiNCQ",
  authDomain: "react-native-7530c.firebaseapp.com",
  databaseURL: "https://react-native-7530c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-native-7530c",
  storageBucket: "react-native-7530c.appspot.com",
  messagingSenderId: "853411787546",
  appId: "1:853411787546:web:d37756c66db5b6725772a3"
};




const AuthForm = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [isLogin,setIsLogin] = useState(false);

    const navigation = useNavigation();

    const authcxt = useContext(AuthContext)


    const app = initializeApp(firebaseConfig);


    const handleLogin = () => {
    
        // try{
        //     const auth = getAuth();

        //     const user =  await signInWithEmailAndPassword(auth,email,password);
        //     navigation.navigate("RegisterDevice");

        // }catch(e){
        //     Alert.alert("Email or Password is incorrect");
        // }
       
       
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
            //   navigation.navigate("RegisterDevice");
                authcxt.authenticate("registered");
              setIsLogin(false);
              // ...
            })
            .catch((error) => {
            //   Alert.alert("Email or Password is incorrect");
              setIsLogin(true);
              setEmail("");
              setPassword("");
            });
            

    }

    return <View style={styles.container}>
               <View style={styles.userContainer}>
                <FontAwesome5 name="user-circle" size={100} color="#FBFCFC" style={styles.userIcon} />
            </View>
            <Text style={styles.title}> Login </Text>

            { isLogin && <Text style={styles.error}>* Incorrect email or password</Text>}

            <Input label="Email" value={email} handleChange={setEmail} isLogin={isLogin}/>
            <Input label="Password" value={password} handleChange={setPassword} isLogin={isLogin}/>
            
            <View style={styles.forgotContainer}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </View>
            <View style={styles.button}  >
                <Button text="Login" onPress = {handleLogin} />
            </View>
      
    </View>



}

export default AuthForm;

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        // elevation: 2,
        // shadowColor: 'black',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.35,
        // shadowRadius: 4,
        // backgroundColor:'white',

    },
    title :{
        color:'#FBFCFC',
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        marginVertical:10,
    },
    button :{
        marginTop:20,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'center',
    },
    userContainer :{
       flexDirection:'row',
       justifyContent:'center',
       marginBottom : 10,
    },
    forgotContainer:{
    //    marginVertical:10,
        marginTop:13,
    },
    forgotText:{
        textAlign:'center',
        color:'#D5D8DC'
    },
    error:{
        color:'#E74C3C',
        // fontWeight:'bold',
        fontSize:15,
    }

})