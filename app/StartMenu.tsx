import React, { useState, useContext, useEffect } from 'react';
import { Pressable, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import EmptyClass from '../assets/svg/empty.svg';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import expoconfig from '../expoconfig';
import { styles }  from '../styles/stylesStartMenu';


const StartMenu = () => {
    const [classcode, setClasscode] = useState('');
    const { user} = useContext(AuthContext);
    const router = useRouter();

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
          const response = await fetch(`${expoconfig.API_URL}/api/students/joinClass?` + params.toString(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          // Handle the response appropriately
          if (response.ok) {
            const message = await response.text();
            Alert.alert('Success', message);
            await AsyncStorage.setItem('classCode', classcode);
            router.push('/Menu');
            
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

    return (    
        <KeyboardAvoidingView behavior='padding'>
            <View>
                
                <View style={[styles.header, {padding: 20}]}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.hText}>Welcome Back</Text>
                        <Text style={styles.hText}>{user?.fname}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Pressable onPress={undefined}>
                            <View style={styles.pictureCircle} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.menuContainer}>
        
                    <View>
                        <Text style={styles.menuText}>Join a class!</Text>
                    </View>
                    <TextInput
                            style={styles.input}
                            value={classcode}
                            placeholder='Classcode'
                            autoCapitalize="none"
                            onChangeText={(text) => setClasscode(text)}
                    />
                    <CustomButton title='Join' onPress={joinClass} buttonStyle={styles.button} textStyle={styles.buttonText}/>
                    
                    <EmptyClass width={300} height={300} />

                </View>
            </View>
        </KeyboardAvoidingView>
    );

}

export default StartMenu;
