import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton2 from '../../components/OptionButton2'; // Updated import
import BackIcon from '../../assets/back-icon.svg';
import { stylesClass } from './stylesClass';

const QuackamoleOption = () => {
    const [classcode, setClasscode] = useState('');

    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    return (
        <KeyboardAvoidingView behavior='padding'>
             <View style={stylesClass.container}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>

                {/* Image above buttons */}
                <Image source={require('../../assets/Quackamole.png')} style={stylesOption.upperImage} />

                <View style={stylesOption.menuContainer}>
                    <OptionButton2
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Hiragana I"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton2
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Hiragana II"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton2
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Hiragana Dakuten"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton2
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText="Hiragana Handakuten"
                        onPress={() => console.log('Button pressed')}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuackamoleOption;
