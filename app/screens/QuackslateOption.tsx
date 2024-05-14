import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton from '../../components/OptionButton'; // Updated import
import BackIcon from '../../assets/back-icon.svg';
import { stylesClass } from './stylesClass';

const QuackslateOption = ({navigation}) => {
    const [classcode, setClasscode] = useState('');

    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    const intro = () => {
        navigation.navigate('Quackslate');
    }

    const basics1 = () => {
        navigation.navigate('Quackslate2');
    }

    const basics2 = () => {
        navigation.navigate('Quackslate3');
    }

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
                        onPress={intro}
                    />
                    <OptionButton
                        imageSource={require('../../assets/QuackslateButton.png')}
                        buttonText="Basics I"
                        onPress={basics1}
                    />
                    <OptionButton
                        imageSource={require('../../assets/QuackslateButton.png')}
                        buttonText="Basics II"
                        onPress={basics2}
                    />
                </View>
            
        </KeyboardAvoidingView>
    );
};

export default QuackslateOption;
