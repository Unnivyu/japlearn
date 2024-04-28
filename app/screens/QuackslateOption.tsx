import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton from '../../components/OptionButton'; // Updated import
import BackIcon from '../../assets/back-icon.svg';
import { stylesClass } from './stylesClass';

const QuackslateOption = () => {
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
                </View>

                {/* Image above buttons */}
                <Image source={require('../../assets/Quackslate.png')} style={stylesOption.upperImage} />

                <View style={stylesOption.menuContainer}>
                    <OptionButton
                        imageSource={require('../../assets/QuackslateButton.png')}
                        buttonText="Intro"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton
                        imageSource={require('../../assets/QuackslateButton.png')}
                        buttonText="Basics I"
                        onPress={() => console.log('Button pressed')}
                    />
                    <OptionButton
                        imageSource={require('../../assets/QuackslateButton.png')}
                        buttonText="Basics II"
                        onPress={() => console.log('Button pressed')}
                    />
                </View>
            
        </KeyboardAvoidingView>
    );
};

export default QuackslateOption;
