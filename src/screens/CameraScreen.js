import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import CaptureButton from '../utils/CaptureButton';
// import RNFS from 'react-native-fs';

export default function CameraScreen() {

    const [{ cameraRef }, { takePicture }] = useCamera(null);
    const [ state, setState ] = useState({ path: null});
    const { path } = state;

    const handleLongPress = () => {
      //handler for Long Click
      alert('Button Long Pressed');
    };
  
    const handleSnap = async () => {                  //<--  handler for click and display the captured Image
        try {
            const data = await takePicture();
            setState({path: data.uri});
            // const filePath = data.uri;                     //<-- save the image to device storage
            // const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
            // RNFS.moveFile(filePath, newFilePath)
            //     .then(() => {
            //         console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })                                        // <<
        } catch (error) {
            console.log(error);
        }
    };

    function renderCamera(){
      return(
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={styles.preview}
        >
          <CaptureButton 
            clicked={handleSnap}
            longPressed={handleLongPress}
          />
        </RNCamera>
      )
    };

    function renderImage(){
      // console.log(path);
      return(
        <View>
            <ImageBackground
              source={{ uri: path }}
              style={styles.Image}
            />
            <Text style={styles.cancel} onPress={()=> setState({path: null})}>Cancel</Text>
        </View> 
      )
    };

    return (
        <View style={styles.body}>
            {path ? renderImage() : renderCamera()}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    preview: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    Image: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    cancel: {
      position: 'absolute',
      right: 20,
      top: 20,
      color: '#000',
      fontWeight: '600',
      fontSize: 17,
    }
});