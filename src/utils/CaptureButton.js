import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';




const CaptureButton = (props) => {

    return (
        <TouchableOpacity style={styles.capture} 
            onLongPress={props.longPressed}
            onPress={props.clicked}
            delayLongPress={2000}
        >
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    capture: {
        height: 70,
        width: 70,
        borderRadius: 70/2,
        backgroundColor: "#fff",
        borderWidth: 3,
        marginBottom: 10,
        borderColor: "gray",
    }
})

export default CaptureButton;