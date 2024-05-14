import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton3 from '../../components/OptionButton3'; // Updated import
import BackIcon from '../../assets/back-icon.svg';
import { stylesClass } from './stylesClass';

const QuackamoleOption2 = () => {
    
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
