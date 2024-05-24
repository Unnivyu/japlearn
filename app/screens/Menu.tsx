import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import MenuButton from '../../components/MenuButton';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import AsyncStorage from '@react-native-async-storage/async-storage';
import expoconfig from '../../expoconfig';
import studentProfile from '../../assets/studentProfile.png';
import { useFocusEffect } from '@react-navigation/native';

const Menu = ({navigation}) => {
    const { user, login } = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            // Code to refresh the component, e.g., fetching new data from the backend
            const fetchData = async () => {
                try {
                    // Your fetch logic here
                    console.log('Fetching data...');
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, [])
    );

    

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
                            <Image source={studentProfile} style={stylesMenu.pictureCircle} />
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
