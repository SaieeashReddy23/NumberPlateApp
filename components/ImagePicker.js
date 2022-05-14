
import { useState } from "react";

import { View,Text,StyleSheet,Image,Pressable,FlatList,ScrollView } from "react-native";


import { launchCameraAsync,launchImageLibraryAsync } from "expo-image-picker";
import axios from "axios";

import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {launchCamera, launchImageLibrary}from 'react-native-image-picker';

import { RNS3 } from "react-native-aws3";

import FormData from "form-data";



import AWS from "aws-sdk";



const BASE_URL = 'https://react-native-7530c-default-rtdb.asia-southeast1.firebasedatabase.app/';

const keyId = 'AKIAYTRWT6LJBH7ZM4MR';
const securityKey = 'ARKYQHKWaHyuVax8lEni6Rl5t4Ccjs09NLlobn8K';
const bucketName = "saieeash-aws-bucket";
const region = "ap-south-1";




// AWS.config.update({
//     accessKeyId: keyId,
//     secretAccessKey: securityKey
// })

// const myBucket = new AWS.S3({
//     params: { Bucket: bucketName},
//     region: 'ap-south-1',
// })

const ImagePickerComponent = () => {

    const [pickedImage,setPickedImage] = useState();

    
    const [uploadSuccessMessage,setUploadSuccessMessage] = useState("");

    const [detectedText,setDetectedText] = useState([]);

    const [isDetected,setIsDetected] = useState(false);

    const [filePath, setFilePath] = useState({});
 
   


   

    const imageHandler = async () => {
        const image = await  launchCameraAsync({
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
          });


        console.log(image);

        if(isDetected){
            setIsDetected(false);
            setDetectedText(false);
        }
        

        setPickedImage(image);
    }


    const galleryHandler = async () => {

        const options = {
            title : 'Select Image',
            type :'library',
            options:{
                maxHeight:200,
                maxWidth:200,
                selectedLimit: 1 ,
                mediaType:'photo',
                includeBase64:false,
            },
            
        }

        // const option = {
        //     storageOptions:{
        //         path: 'images',
        //         mediaType: 'photo',
        //     },
        //     includeBase64: true,
        // };

        const image = await launchImageLibraryAsync(options);
        console.log(image);

        if(isDetected){
            setIsDetected(false);
            setDetectedText(false);
        }

        setPickedImage(image);

    }

    const handleUpload = async () => {

        try{

            
            // const response = await axios.get("http://192.168.29.31:9090/check");
            // console.log(response.data);

            const form = new FormData();



            form.append('file', {
                name:"image.jpg", // Whatever your filename is
                uri: pickedImage.uri, //  file:///data/user/0/com.cookingrn/cache/rn_image_picker_lib_temp_5f6898ee-a8d4-48c9-b265-142efb11ec3f.jpg
                type: 'image/jpg', // video/mp4 for videos..or image/png etc...
              });

            let response = await fetch('http://192.168.29.31:9090/upload/file',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                    body: form
                })

            let json = await response.json();

            setDetectedText(json);

            console.log(json);

            setPickedImage();

            setIsDetected(true);

            console.log("successfully submitted the data");
        }catch(e){
            console.log(e)

            console.log("some error occured while submitting data");
        }
        
    }

    const handleRemove = () => {
        // console.log("handle Rmove pressed");
        setPickedImage()
        if(isDetected){
            setIsDetected(false);
            setDetectedText([]);
        }
    }

    const handleText = async (text) => {

        try{
            let response = await fetch('http://192.168.29.31:9090/upload/text', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text+"",
                })
            });

            let json = await response.json();
            console.log(json)
            console.log("successfully uploaded text");
        }catch(E){
            console.log("error while uploading text");
        }

        setIsDetected(false);
        setDetectedText([]);
        setPickedImage();
        
    }

    // "detectedText": "ANGE ROVER",
    //     "type": "LINE",
    //     "id": 0,
    //     "parentId": null,
    //     "confidence": 65.81267,
    const textRender = ({item}) => {

        console.log(item);


        return  <Pressable onPress={() => handleText(item.detectedText)}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textComponent}>{item.detectedText}</Text>
                    </View>
                </Pressable>
            
    }

    let detected =  <FlatList data={detectedText} keyExtractor = {item => item.id}  renderItem={textRender} />
                   

    let imagePreview = <Text style={styles.imageText}>No image taken yet</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage.uri}}/>
    }

    // if(isDetected){
    //     return detected;
    // }
    


return  <View style={styles.container}>
            <View style={styles.buttonIcons}>
                <Pressable  android_ripple={{color:'#72B5F7'}} onPress={imageHandler}>
                    <View style={[styles.icons,{borderRightWidth:2,borderColor:'white'}]}>
                            <SimpleLineIcons name="camera" size={30} color="#FBFCFC" />
                    </View>
                </Pressable>

                <Pressable android_ripple={{color:'#72B5F7'}}  onPress={galleryHandler}>
                    <View style={styles.icons}>
                        <Ionicons name="md-images-outline" size={30} color="#FBFCFC" />
                    </View>
                </Pressable>
            </View>

            <View style={styles.imagePreview}>
                    {isDetected ? detected : imagePreview}
            </View>

            { pickedImage &&
                <View style={styles.removeContainer}>
                <Pressable onPress={handleRemove} android_ripple={{color:'#72B5F7'}}>
                    <View style={styles.remove}>
                        <FontAwesome name="remove" size={40} color="#EFC2BB" />
                    </View>
                </Pressable>
            </View>
        
            }

            { isDetected &&
                <View style={styles.removeContainer}>
                <Pressable onPress={handleRemove} android_ripple={{color:'#72B5F7'}}>
                    <View style={styles.remove}>
                        <FontAwesome name="remove" size={40} color="#EFC2BB" />
                    </View>
                </Pressable>
            </View>
        
            }
                
          
           
            <View style={[styles.buttonIcons,{marginVertical:20}]}>
                <Pressable onPress={handleUpload}>
                    <View style={styles.icons}>
                        {/* <FontAwesome name="send" size={30} color="#FBFCFC" /> */}
                        <MaterialCommunityIcons name="upload" size={30} color="#FBFCFC" />
                    </View>
                </Pressable>
            </View>
        </View>
}

export default ImagePickerComponent;

const styles = StyleSheet.create({
    container:{
 
        justifyContent:'center',
        alignItems:'center'
    },
    imagePreview:{
        width:'90%',
        height:500,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E0E0E0',
        borderRadius:40,
        color:'black',
        overflow:'scroll',

    },
    imageText:{
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // flexDirection:'column-reverse',
        // flexDirection:'row-reverse',
    },
    remove :{
        // marginTop:300,
        // flex:1,
        // flexDirection:'column-reverse',
        // justifyContent:'center',
        // alignItems:'center',
        // marginTop:-50,
        // borderWidth:2,
        // borderColor:'black',
    },
    removeContainer:{
        marginTop: -50,
    },
  
    image:{
        width:'100%',
        // minHeight:300,
        height:'100%',
        borderRadius:40,
    },
    buttons:{
        flexDirection:'row',
        // textAlign:'center',
        justifyContent:'space-between',
        // alignItems:'center',
        marginVertical:10,
        marginHorizontal:40,
    },
    buttonIcons:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#0655A2',
        alignItems:'center',
        borderRadius:20,
        borderWidth:2,
        // paddingHorizontal:20,
        // paddingVertical:10,
        borderColor:'white',
        marginVertical:20,
    },
    icons:{
        // backgroundColor:'#7DBCFA',
        // marginHorizontal:20,
        borderColor:'#101E2D',  
        paddingHorizontal:40,
        paddingVertical:10,
        // borderWidth:2,
        // borderColor:'black',
 
    },

    buttonsSpace:{
        marginHorizontal:40,
    },

    submitButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
    },

    scrollView:{
        width:'100%',
        height:'100%'
    },
    textContainer:{
        flexDirection:'row', 
        backgroundColor:'#2196F3',
        justifyContent:'center',  
        marginHorizontal:30,
        marginVertical:20,
        borderRadius:15,
        paddingVertical:10,
        paddingHorizontal:10,
    },
    textInnerContainer:{
        marginHorizontal:10,
        marginVertical:10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    textComponent:{
        color:'white',
        fontSize:15,
    }

})