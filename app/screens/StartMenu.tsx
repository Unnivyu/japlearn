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
        console.log('Joining class...');
        try {
            // Reference to the teacher's class list
            const teacherRef = ref(db, `Teacher/defaultTeacher/classList`);
            const classSnapshot = await get(teacherRef);
            
            if (classSnapshot.exists()) {
                // Check if the class exists in the class list
                if (classSnapshot.val().includes(classcode)) {
                    // Reference to the user data
                    const userRef = ref(db, `users/${firstName}`);
                    const userSnapshot = await get(userRef);
                    
                    if (userSnapshot.exists()) {
                        // Update user data with the new class code
                        const userData = userSnapshot.val();
                        await set(userRef, { ...userData, classcode });
                        console.log('Database updated successfully');
                        alert(`Success! You have successfully joined class ${classcode}`);
                        navigation.navigate('Menu')
                    } else {
                        alert(`Error: User ${firstName} not found.`);
                    }
                } else {
                    alert('Error: Invalid class code. Please enter a valid class code.');
                }
            } else {
                alert('Error: Could not retrieve class list. Please try again later.');
            }
        } catch (error) {
            console.error('Error joining class:', error.message);
            alert('Error: An error occurred while joining the class. Please try again later.');
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
