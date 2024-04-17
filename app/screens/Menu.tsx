import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import MenuButton from '../../components/MenuButton';



const Menu = ({navigation}) => {
    const [classcode, setClasscode] = useState('');

    const joinClass = async () => {
    }
    const handleProfilePress = () => {
        navigation.navigate('Profile');
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior='padding'>
                <View>
                    
                    <View style={[stylesMenu.header, {padding: 20}]}>
                        <View style={stylesMenu.leftContainer}>
                            <Text style={stylesMenu.hText}>Welcome Back</Text>
                            <Text style={stylesMenu.hText}>Jan Shaono</Text>
                        </View>
                        <View style={stylesMenu.rightContainer}>
                            <TouchableOpacity onPress={handleProfilePress}> 
                                <View style={stylesMenu.pictureCircle} 
                                ></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={stylesMenu.menuContainer}>
                        <MenuButton
                        imageSource={require('../../assets/button1.png')}
                        buttonText="KANA"
                        onPress={() => console.log('Button pressed')}
                        />
                        <MenuButton
                        imageSource={require('../../assets/button2.png')}
                        buttonText="VOCAB"
                        onPress={() => console.log('Button pressed')}
                        />
                        <MenuButton
                        imageSource={require('../../assets/button3.png')}
                        buttonText="SENTENCE AND GRAMMAR"
                        onPress={() => console.log('Button pressed')}
                        />
                    </View>
                    
                    
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}

export default Menu;
