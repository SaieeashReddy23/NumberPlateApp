
import { View,Text,Pressable,StyleSheet } from "react-native";

const Button = ({text,onPress}) => {

    return <Pressable android_ripple={{color:'white'}} style={({pressed}) => [styles.container, pressed && styles.buttonPressed] } onPress={onPress}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Pressable>
           

            
    
}

export default Button;

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#0f8cfa',
        // flexDirection:'row',
        // justifyContent:'center',
        borderRadius:20,
        paddingHorizontal:12,
        paddingVertical:6,
    },
    // buttonContainer:{
    //     width:100,
    // },

    buttonPressed:{
        opacity:0.5,
    },

    text:{
        textAlign:'center',
        color:'#FBFCFC',
        fontSize:23,
        fontWeight:'bold',
        width:150,
    }
    
})