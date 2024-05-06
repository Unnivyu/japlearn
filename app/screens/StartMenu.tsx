import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import { db } from '../../config';
import {ref,set, push, child, get} from "firebase/database";
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';


const StartMenu = ({route}) => {
    const [classcode, setClasscode] = useState('');
    const { firstName } = route.params;
    const { user } = useContext(AuthContext);
    console.log('User:', user);
    const navigation = useNavigation();


    

    const joinClass = async () => {
        console.log('Attempting to join class...');
        try {
            // Reference to the teacher's class list
            const teacherRef = ref(db, `Teacher/defaultTeacher/classList`);
            const classSnapshot = await get(teacherRef);
    
            if (classSnapshot.exists()) {
                const classList = classSnapshot.val();
                console.log('Class list:', classList);
    
                // Check if the class code exists in the class list
                if (classList && classList.includes(classcode)) {
                    console.log(`Class code ${classcode} found in class list.`);
    
                    // Reference to the users node
                    const usersRef = ref(db, 'users');
                    const usersSnapshot = await get(usersRef);
    
                    if (usersSnapshot.exists()) {
                        const usersData = usersSnapshot.val();
                        let userId = null;
    
                        // Find the user ID based on the provided firstName
                        for (const id in usersData) {
                            if (usersData[id].firstname === firstName) {
                                userId = id;
                                console.log('User ID found:', userId);
                                break;
                            }
                        }
    
                        if (userId) {
                            // Reference to the specific user data
                            const userRef = ref(db, `users/${userId}`);
                            const userSnapshot = await get(userRef);
    
                            if (userSnapshot.exists()) {
                                // Retrieve user data
                                const userData = userSnapshot.val();
                                console.log('User data before update:', userData);
    
                                // Update user data with the new class code
                                const updatedData = {
                                    ...userData,
                                    classcode: classcode, // Add classcode as a string to the user data
                                };
    
                                await set(userRef, updatedData);
                                console.log('User data updated successfully:', updatedData);
    
                                Alert.alert('Success', `You have successfully joined class ${classcode}`);
                                // Navigate to the next screen
                                navigation.navigate('Menu');
                            } else {
                                Alert.alert('Error', `User with ID ${userId} not found.`);
                            }
                        } else {
                            Alert.alert('Error', `User with first name ${firstName} not found.`);
                        }
                    } else {
                        Alert.alert('Error', 'Could not retrieve users list. Please try again later.');
                    }
                } else {
                    Alert.alert('Error', 'Invalid class code. Please enter a valid class code.');
                }
            } else {
                Alert.alert('Error', 'Could not retrieve class list. Please try again later.');
            }
        } catch (error) {
            console.error('Error joining class:', error);
            Alert.alert('Error', 'An error occurred while joining the class. Please try again later.');
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
                        <Text style={stylesMenu.hText}>{firstName}</Text>
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
