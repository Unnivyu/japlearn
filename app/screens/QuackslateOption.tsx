import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import EmptyClass from '../../assets/empty.svg';
import CustomButton from '../../components/CustomButton';
import OptionButton from '../../components/OptionButton'; // Updated import

const QuackslateOption = () => {
    const [classcode, setClasscode] = useState('');

    const joinClass = async () => {
    };

    return (
        <KeyboardAvoidingView behavior='padding'>
            <View>
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
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuackslateOption;
