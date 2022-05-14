
import { View,Text,StyleSheet,ImageBackground,Pressable,Modal } from "react-native";
import ImagePickerComponent from "../components/ImagePicker";
import img from "../assets/backgroundImage2.webp";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";


const HomeScreen = () => {

    const authcxt = useContext(AuthContext);


    const handleUnRegister = () => {
        authcxt.openLogin();
    }

    return <View>
        <ImageBackground style={styles.background} source={img}>

            {/* <Modal visible={true} animationType={"slide"} style={styles.modalContent}>
                <View >
                    <Text>Hello world</Text>
                </View>
            </Modal> */}
      
            <View style={styles.unRegisterContainer}>
                <View style={styles.buttonIcons}>
                        <Pressable  onPress={handleUnRegister}>
                            <View style={styles.icons}>
                                <AntDesign name="deleteuser" size={24} color="#FBFCFC" />
                            </View>
                        </Pressable>
                </View>
            </View>
                
            
       
            <ImagePickerComponent/>
    
           
         
        </ImageBackground>
    </View>
}

export default HomeScreen;

const styles = StyleSheet.create({

    background:{
        width:'100%',
        height:'100%'
    },
    unRegisterContainer:{

        flexDirection:'row',
        justifyContent:'flex-end',
        marginHorizontal:20,

    },
    unregister :{
        flexDirection:'row',
        marginTop:50,
        marginHorizontal:20,
        borderColor:'#101E2D', 
        backgroundColor:'#0655A2',
        width:20,
        justifyContent:'flex-end',
    },
    buttonIcons:{
        flexDirection:'row',
        justifyContent:'center',
  
        backgroundColor:'#0655A2',
        // alignItems:'center',
        borderRadius:15,
        borderWidth:2,
        // paddingHorizontal:20,
        // paddingVertical:10,
        borderColor:'white',
        marginTop:40,
        width:60,
    },
    icons:{
        // backgroundColor:'#7DBCFA',
        // marginHorizontal:20,
        borderColor:'#101E2D',  
        // paddingHorizontal:40,
        paddingVertical:10,
        // borderWidth:2,
        // borderColor:'black',
        // width:30,

 
    },
    modalContent:{
        height:'100%',
        width:'100%',
    },

   
})