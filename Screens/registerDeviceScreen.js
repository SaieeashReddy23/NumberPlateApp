
import { View,Text,StyleSheet ,ImageBackground} from "react-native";

// import * as application from 'expo-application';

import Button from "../components/button";
import axios from "axios";
import { useState,useContext } from "react";
import { AuthContext } from "../store/auth-context";
import background from "../assets/backgroundImage2.webp";


const BASE_URL = 'https://react-native-7530c-default-rtdb.asia-southeast1.firebasedatabase.app/';

const RegisterDeviceScreen = () => {

    const [regSuccessful,setRegSuccessful] = useState(false);
    const [regFail,setRegFail] = useState(false);

    const authcxt = useContext(AuthContext);



    // const deviceId = application.androidId;
    const deviceId = 25;

    const registerdevice = async () => {

        try{
            await axios.post(BASE_URL+'/devices.json',{deviceId:deviceId});
            setRegSuccessful(true);
            authcxt.authenticate("registered");
        }catch(e){
            setRegFail(true);
        }
    }

    

    return <View>
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.container}>
                        <Button text="Register Device" onPress={registerdevice} />
                        {regSuccessful && <Text>Registration Successful</Text>}
                        {regFail  && <Text>Registeration Failed </Text>} 
                    </View>
                </ImageBackground>
            </View>

}

export default RegisterDeviceScreen;

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },
    background:{
        width:'100%',
        height:'100%',
    },

    deviceIdContainer :{
        flexDirection:'row',
        marginHorizontal:20,
    },

    textContainer:{
        backgroundColor:'#0f8cfa',
        borderRadius:6,
        paddingHorizontal:12,
        paddingVertical:6,

        marginVertical:8,
        marginHorizontal:8,
    },
    text:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },

    label : {
        color:'red',
    }
})