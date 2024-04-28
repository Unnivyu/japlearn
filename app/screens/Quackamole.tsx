import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { stylesSlate } from './stylesSlate';
import { stylesClass} from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';


const Quackamole= () => {
    const [text, setText] = useState('');

    // Define a function to handle back button press
    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={stylesClass.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />  
                        </View>
                    </TouchableOpacity>
                </View>
                
                </View>
                <Image source={require('../../assets/QuackslateDisplay.png')} style={[stylesSlate.imageStyle]} />
                <View style={[stylesSlate.Progress]}>
                        <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                        <Text style={{ position: 'absolute', color: 'black', fontSize: 18 }}>Timer: 0:45</Text>
                    </View>
                <View style={[stylesSlate.MenuAll]}>
                    
                    <Image source={require('../../assets/QuackslateBody.png')} style={stylesSlate.SlateBody} />
                    <Image source={require('../../assets/Mole.png')} style={stylesSlate.Mole} />
                </View>
      
        </KeyboardAvoidingView>
    );
};
export default Quackamole;
