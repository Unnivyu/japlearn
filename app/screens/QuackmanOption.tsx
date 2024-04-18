import React, { useState } from 'react';
import { TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { stylesOption } from './stylesOption'; // Updated import
import OptionButton from '../../components/OptionButton'; // Updated import

const QuackmanOption = () => {
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
                <Image source={require('../../assets/Quackman.png')} style={stylesOption.upperImage} />

                <View style={stylesOption.menuContainer}>
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
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuackmanOption;
