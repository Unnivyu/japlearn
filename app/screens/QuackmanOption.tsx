import React, { useState } from 'react';
import { TouchableOpacity, View, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import OptionButton from '../../components/OptionButton'; // Updated import
import BackIcon from '../../assets/back-icon.svg';
import Banner from '../../assets/qkmanBanner.svg';
import { stylesClass } from './stylesClass';

const QuackmanOption = () => {
    const [classcode, setClasscode] = useState('');

    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
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
                <OptionButton
                    imageSource={require('../../assets/QuackmanButton.png')}
                    buttonText="Intro"
                    onPress={() => console.log('Button pressed')}
                />
                <OptionButton
                    imageSource={require('../../assets/QuackmanButton.png')}
                    buttonText="Basics I"
                    onPress={() => console.log('Button pressed')}
                />
                <OptionButton
                    imageSource={require('../../assets/QuackmanButton.png')}
                    buttonText="Basics II"
                    onPress={() => console.log('Button pressed')}
                />
            </ScrollView>    

        </View>
        
    );
};

export default QuackmanOption;
