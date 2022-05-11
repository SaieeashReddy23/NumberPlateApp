import { View,StyleSheet,ImageBackground,Image} from "react-native";
import AuthForm from "../components/auth-Form";
import background from "../assets/backgroundImage2.webp";



const LoginScreen = () => {
    return <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
            <AuthForm/>
        </ImageBackground>
       
    </View>
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECF0F1'
    },
    background:{
        width:'100%',
        height:'100%'
    },
 
})