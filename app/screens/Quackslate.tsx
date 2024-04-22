import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { stylesOption } from './stylesOption';
import { stylesClass} from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';


const Quackslate = () => {
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

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
                    <View style={[stylesOption.menuContainer, { marginTop: -50 }]}>
                        {/* Change margin-top here */}
                        <Text style={[stylesOption.textStyle, { fontWeight: 'bold', fontSize: 30, marginTop: -350 }]}>Translate it to English.</Text>
                    </View>
                    <Image source={require('../../assets/QuackslateDisplay.png')} style={[stylesOption.imageStyle, { marginTop: -100, width: 250, height: 100 }]} />
                    {/* Second Button (GameBack) */}
                    <TouchableOpacity style={[stylesOption.BackButton, { position: 'absolute', top: -230, left: 20 }]} onPress={() => console.log('GameBack Button pressed')}>
                        <Image source={require('../../assets/GameBack.png')} style={[stylesOption.upperLeftButtonImage, { width: 70, height: 40 }]} />
                    </TouchableOpacity>

                    {/* GameRect with Text */}
                    <View style={{ position: 'absolute', top: -230, left: 250, width: 90, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                        <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>9/10</Text>
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity style={[stylesOption.BackButton, { position: 'absolute', top: 400, left: 250}]} onPress={() => console.log('Next Button pressed')}>
                        <Image source={require('../../assets/NextButton.png')} style={[stylesOption.upperLeftButtonImage, { width: 85, height: 40 }]} />
                    </TouchableOpacity>

                    <TextInput
                        style={stylesOption.textInput}
                        placeholder="Answer Here"
                        placeholderTextColor="#888"
                        value={text}
                        onChangeText={setText}
                    />
                    
                </View>
      
        </KeyboardAvoidingView>
    );
};
export default Quackslate;
