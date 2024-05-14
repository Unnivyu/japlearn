import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert, ScrollView } from 'react-native';
import { stylesOption } from './stylesOption';
import OptionButton2 from '../../components/OptionButton2';
import Banner from '../../assets/moleBanner.svg';
import BackIcon from '../../assets/back-icon.svg';
import { stylesClass } from './stylesClass';

const QuackamoleOption = () => {
    const [classcode, setClasscode] = useState('');

    const handleBackPress = () => {
        console.log('Back button pressed');
    };

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
            </ScrollView>
        </View>
    );
};

export default QuackamoleOption;
