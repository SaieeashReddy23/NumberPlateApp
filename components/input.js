
import { View,Text,TextInput,StyleSheet} from "react-native";import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
4

const Input = ({value,label,handleChange,isLogin}) => {




    return <View style={[styles.container,isLogin && styles.error]}>
        <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.textInputContainer}>
            <TextInput autoCapitalize='none' style={styles.input} onChangeText={(newText) => handleChange(newText) } defaultValue={value}/>
        </View>
    </View>


}

export default Input;


const styles = StyleSheet.create({
    container:{
        margin:8,
        flexDirection:'row',
        alignItems:'stretch',
        backgroundColor:'#FBFCFC',
        justifyContent:'center',
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:13,
        marginHorizontal:-10,
    },
    error:{
        borderWidth:2,
        borderColor:'#E74C3C',
    },
    label:{
        marginBottom:4,
        color:'#ABB2B9',
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',    

    },
    input:{
        // paddingHorizontal:6,
        // paddingVertical:8,
        // backgroundColor:'#dfe9f2',
        borderRadius:4,
        fontSize:18,
        width:200,
    },
    labelContainer:{
        flex:1,
        marginRight:10,
    },
    textInputContainer:{
        flex:3,
    }

})