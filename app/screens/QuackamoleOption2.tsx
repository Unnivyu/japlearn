import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton3 from '../../components/OptionButton3'; // Updated import

const QuackamoleOption2 = () => {
    const [classcode, setClasscode] = useState('');

    const joinClass = async () => {
    };

    return (
        <KeyboardAvoidingView behavior='padding'>
            <View>
                <View style={[stylesOption.header, { padding: 20 }]}>
                    {/* Upper Left Corner Button */}
                    <TouchableOpacity style={stylesOption.upperLeftButton} onPress={() => console.log('Upper left button pressed')}>
                        <Image source={require('../../assets/Backbutton.png')} style={stylesOption.upperLeftButtonImage} />
                    </TouchableOpacity>
                    
                    {/* Upper Right Corner Profile Picture */}
                    <View style={stylesOption.rightContainer}>
                        <View style={stylesOption.pictureCircle} />
                    </View>
                </View>

                {/* Image above buttons */}
               

                <View style={stylesOption.menuContainer}>
                    <OptionButton3
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Katakana I"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton3
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Katakana II"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton3
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Katakana Dakuten"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton3
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Katakana Handakuten"
                        onPress={() => console.log('Button pressed')}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuackamoleOption2;
