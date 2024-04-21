import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { stylesOption } from './stylesOption';

const QuackamoleOption = () => {
    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={[stylesOption.header, { padding: 20 }]}>
                    {/* Upper Left Corner Button */}
                    <TouchableOpacity style={stylesOption.BackButton} onPress={() => console.log('Upper left button pressed')}>
                        <Image source={require('../../assets/Backbutton.png')} style={stylesOption.upperLeftButtonImage} />
                    </TouchableOpacity>
                    
                    {/* Upper Right Corner Profile Picture */}
                    <View style={stylesOption.rightContainer}>
                        <View style={stylesOption.pictureCircle} />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
                    <View style={[stylesOption.menuContainer, { marginTop: -50 }]}>
                        {/* Change margin-top here */}
                        <Text style={[stylesOption.textStyle, { fontWeight: 'bold', fontSize: 20, marginTop: -500 }]}>Translate it to English.</Text>
                    </View>

                    {/* Second Button */}
                    <TouchableOpacity style={stylesOption.BackButton} onPress={() => console.log('Second button pressed')}>
                        <Image source={require('../../assets/GameBack.png')} style={stylesOption.upperLeftButtonImage} />
                        {/* Icon or text for the second button */}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuackamoleOption;
