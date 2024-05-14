import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert, ScrollView } from 'react-native';
import { stylesOption } from './stylesOption'; 
import OptionButton from '../../components/OptionButton'; 
import BackIcon from '../../assets/back-icon.svg';
import Banner from '../../assets/slateBanner.svg';
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
    
        <View style={stylesClass.container}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={stylesOption.bannerContainer}>
                <Banner width={300} height={150} />
            </View>
            <ScrollView contentContainerStyle={stylesOption.menuContainer}>
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
            </ScrollView>

        </View>

            
    );
};

export default QuackslateOption;
