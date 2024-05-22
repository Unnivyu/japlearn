import React, { useState, useContext, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import MenuButton from '../../components/MenuButton';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import AsyncStorage from '@react-native-async-storage/async-storage';
import expoconfig from '../../expoconfig';

const Menu = ({navigation}) => {
    const { user, login } = useContext(AuthContext);

    

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    }

    const handleNavigateToQuackamoleOption = () => {
        navigation.navigate('QuackamoleOption');
    }

    const handleNavigateToQuackmanOption = () => {
        navigation.navigate('QuackmanOption');
    }
    
    const handleNavigateToQuackslateOption = () => {
        navigation.navigate('QuackslateOption');
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior='padding'>
                <View>
                    
                    <View style={[stylesMenu.header, { padding: 20 }]}>
                        <View style={stylesMenu.leftContainer}>
                            <Text style={stylesMenu.hText}>Welcome Back</Text>
                            <Text style={stylesMenu.hText}>{user?.fname}</Text> 
                        </View>
                        <View style={stylesMenu.rightContainer}>
                            <TouchableOpacity onPress={handleProfilePress}> 
                                <View style={stylesMenu.pictureCircle}></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={stylesMenu.menuContainer}>
                        <MenuButton
                            imageSource={require('../../assets/button1.png')}
                            buttonText="KANA"
                            onPress={handleNavigateToQuackamoleOption}
                        />
                        <MenuButton
                            imageSource={require('../../assets/button2.png')}
                            buttonText="VOCAB"
                            onPress={handleNavigateToQuackmanOption}
                        />
                        <MenuButton
                            imageSource={require('../../assets/button3.png')}
                            buttonText="SENTENCE AND GRAMMAR"
                            onPress={handleNavigateToQuackslateOption}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Menu;
