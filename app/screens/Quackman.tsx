import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { stylesQuackman } from './stylesQuackman';
import { stylesClass} from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';


const Quackman = () => {
    const [text, setText] = useState('');

    // Define a function to handle back button press
    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={stylesClass.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />  
                        </View>
                    </TouchableOpacity>
                </View>
                
                </View>

                <View style={[stylesQuackman.MenuAll]}>
                    <View style={[stylesQuackman.menuContainer]}>
                    <Image source={require('../../assets/quacklogo.png')} style={[stylesQuackman.Quacklogo]} />
                        <Text style={[stylesQuackman.textStyle,]}>Quackman</Text>
                    </View>
                    <TouchableOpacity style={[stylesQuackman.BackButton]} onPress={() => console.log('GameBack Button pressed')}>
                        <Image source={require('../../assets/GameBack.png')} style={[stylesQuackman.upperLeftButtonImage]} />
                    </TouchableOpacity>

                    {/* GameRect with Text */}
                    <View style={[stylesQuackman.Progress]}>
                        <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%'}} />
                        <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>9/10</Text>
                    </View>
        
                </View>
      
        </KeyboardAvoidingView>
    );
};
export default Quackman;
