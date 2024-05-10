import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import { db } from '../../config';
import {ref,set, push, child, get} from "firebase/database";
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';


const StartMenu = ({}) => {
    const [classcode, setClasscode] = useState('');
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    


    

    const joinClass = async () => {
        console.log
        if (!classcode.trim()) {
          Alert.alert('Error', 'Please enter a class code.');
          return;
        }
    
        if (!user || !user.fname) {
          Alert.alert('Error', 'Unable to identify the user.');
          return;
        }
    
        try {
          // Prepare the URL search parameters for the backend request
          const params = new URLSearchParams({ fname: user.fname, classCode: classcode });
    
          // Send the POST request to the backend
          const response = await fetch('http://localhost:8080/api/students/joinClass?' + params.toString(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          // Handle the response appropriately
          if (response.ok) {
            const message = await response.text();
            Alert.alert('Success', message);
            navigation.navigate('Menu');
          } else {
            // Display the error message from the server response
            const errorMessage = await response.text();
            Alert.alert('Error', `Error joining class: ${errorMessage}`);
          }
        } catch (error) {
          console.error('Error joining class:', error.message);
          Alert.alert('Error', 'Error joining class. Please try again later.');
        }
      };

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (    
        <KeyboardAvoidingView behavior='padding'>
            <View>
                
                <View style={[stylesMenu.header, {padding: 20}]}>
                    <View style={stylesMenu.leftContainer}>
                        <Text style={stylesMenu.hText}>Welcome Back</Text>
                        <Text style={stylesMenu.hText}>{user?.fname}</Text>
                    </View>
                    <View style={stylesMenu.rightContainer}>
                        <TouchableOpacity onPress={handleProfilePress}>
                            <View style={stylesMenu.pictureCircle} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={stylesMenu.menuContainer}>
        
                    <View>
                        <Text style={stylesMenu.menuText}>Join a class!</Text>
                    </View>
                    <TextInput
                            style={stylesMenu.input}
                            value={classcode}
                            placeholder='Classcode'
                            autoCapitalize="none"
                            onChangeText={(text) => setClasscode(text)}
                    />
                    <CustomButton title='Join' onPress={joinClass} style={stylesMenu.button} textStyle={stylesMenu.buttonText}/>
                    
                    <EmptyClass width={300} height={300} />

                </View>
            </View>
        </KeyboardAvoidingView>
    );

}

export default StartMenu;
