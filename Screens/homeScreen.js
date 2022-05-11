
import { View,Text,StyleSheet,ImageBackground } from "react-native";
import ImagePicker from "../components/ImagePicker";
import img from "../assets/backgroundImage2.webp";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const HomeScreen = () => {

    return <View>
        <ImageBackground style={styles.background} source={img}>
            <View style={styles.logout}>
                <MaterialCommunityIcons name="logout" size={40} color="black" />
            </View>
            <ImagePicker/>
    
           
         
        </ImageBackground>
    </View>
}

export default HomeScreen;

const styles = StyleSheet.create({

    background:{
        width:'100%',
        height:'100%'
    },
    logout :{
        flexDirection:'row-reverse',
        marginTop:50,
        marginHorizontal:20,
    }

   
})