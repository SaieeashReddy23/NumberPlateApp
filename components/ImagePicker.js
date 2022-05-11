
import { useState } from "react";

import { View,Text,StyleSheet,Image,Pressable } from "react-native";

import Button from "./button";

import { launchCameraAsync,launchImageLibraryAsync } from "expo-image-picker";
import axios from "axios";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AWS from "aws-sdk";



const BASE_URL = 'https://react-native-7530c-default-rtdb.asia-southeast1.firebasedatabase.app/';

const keyId = 'AKIAYTRWT6LJCDCOOV4O';
const securityKey = 'BopV1UbH42UJPfKpmKNSKSl6BqkfqesozIsmRDD6';
const bucketName = "sai-reactapp-2022";




// AWS.config.update({
//     accessKeyId: keyId,
//     secretAccessKey: securityKey
// })

// const myBucket = new AWS.S3({
//     params: { Bucket: bucketName},
//     region: 'ap-south-1',
// })

const ImagePicker = () => {

    const [pickedImage,setPickedImage] = useState();

    const imageHandler = async () => {
        const image = await  launchCameraAsync({
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
          });

        console.log(image);

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
                includeBase64:false
            }

        }

        const image = await launchImageLibraryAsync(options);
        console.log(image);

        setPickedImage(image);

    }

    const handleUpload = async () => {

       



        const data = new FormData();
    


        // const params = {
        //     Body: 'scene.jpg' ,
        //     Bucket: bucketName,
        //     Key: 'image2.jpg',
        // };

        // console.log("after appending to the form data");
        data.append('photo',
                        {
                            type:pickedImage.type,
                            uri:pickedImage.uri,
                        });

        // console.log(data);

        try{
          let res = await   axios.post(BASE_URL+'/images.json',
                                    {image:data._parts[0]},
                                    // {
                                    //     headers:{
                                    //         'Content-Type':'multipart/form-data', 
                                    //     }
                                    // }
                                    );


            // fetch('scene.jpg')
            //     .then((data) => console.log(data));
                        
            

            // myBucket.putObject(params)
            // .on('httpUploadProgress', (evt) => {
            //     setProgress(Math.round((evt.loaded / evt.total) * 100))
            // })
            // .send((err) => {
            //     if (err) console.log(err)
            // })
                    



            // let res = await fetch(
            //     BASE_URL + '/images.json',
            //     {
            //         method:'post',
            //         body:data,
            //         headers:{
            //             'Content-Type':'multipart/form-data',
            //         },
            //     }
            // )



            // const s3 = new AWS.S3({
            //     accessKeyId:keyId,
            //     secretAccessKey: securityKey,
            //   })
    
    
            //     const filename = 'scene';

            //     const file = new File('scene');

            //     const read = new  FileReader();

            //     read.readAsDataURL(file)
            

            //     const fileContent = readFileSync(filename);
    
        
    
            //     const params = {
            //         Bucket: bucketName,
            //         Key: `${filename}.jpg`,
            //         Body: fileContent
            //         }
    
            //     s3.upload(params, (err, data) => {
            //     if (err) {
            //         reject(err)
            //     }
            //     resolve(data.Location)
            //     })

            fetch('testfile.txt')
                .then(response => response.text())
                .then(data => {
                    // Do something with your data
                    console.log(data);
                }).catch((e) => {
                    console.log("could not fetch the file");
                });

     

            setPickedImage();

            console.log("successfully submitted the data");
        }catch(e){
            console.log(e)

            console.log("some error occured while submitting data");
        }
        
    }

    const handleRemove = () => {
        // console.log("handle Rmove pressed");
        setPickedImage()
    }

    let imagePreview = <Text style={styles.imageText}>No image taken yet</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri:pickedImage.uri}}/>
    }

return  <View style={styles.container}>

            {/* <View  style={styles.buttons} >
                <Button style={styles.buttonsSpace} text="Open Camera" onPress={imageHandler} />
                <Button  style={styles.buttonsSpace} text="Open Gallery" onPress={galleryHandler}/>
            </View> */}

            <View style={styles.buttonIcons}>
                <Pressable android_ripple={{color:'#72B5F7'}} onPress={imageHandler}>
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
        
                    {imagePreview}
             
               
                {/* <View>
                    <MaterialIcons name="highlight-remove" size={50} color="black" />
                </View> */}
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
                
          
           
            <View style={[styles.buttonIcons,{marginVertical:20}]}>
                <Pressable onPress={handleUpload}>
                    <View style={styles.icons}>
                        <FontAwesome name="send" size={30} color="#FBFCFC" />
                    </View>
                </Pressable>
            </View>
{/*            
            <View style={styles.submitButton}>
                <Button text="Upload" onPress={handleUpload}/>
            </View> */}

        </View>
}

export default ImagePicker;

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
        backgroundColor:'#F3F5F7',
        borderRadius:40,
        color:'black',

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

})