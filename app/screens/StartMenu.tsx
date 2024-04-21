import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image, Alert } from 'react-native';
import { stylesMenu } from './stylesMenu';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import { db } from '../../config';
import {ref,set, push, child, get} from "firebase/database";


const StartMenu = ({route}) => {
    const [classcode, setClasscode] = useState('');
    const { firstName } = route.params;

    

    const joinClass = async () => {
        console.log('Joining class...');
        try {
            const teacherRef = ref(db, `Teacher/Herrera/classList`);
            const classSnapshot = await get(teacherRef);
    
            if (classSnapshot.exists()) {
                // Class exists, perform the logic to join the class here
                const userRef = ref(db, `users/${firstName}`);
                const userSnapshot = await get(userRef);
                
                    // User exists, update the classCode
                    const userData = userSnapshot.val();
                    await set(userRef, { ...userData, classcode });
                    console.log('Database updated successfully');
                    alert(`Success, You have successfully joined class ${classcode}`);
                
            } else {
                // Class does not exist
                alert('Error, Invalid class code. Please enter a valid class code.');
            }
        } catch (error) {
            console.error('Error joining class:', error.message);
            alert('Error, An error occurred while joining the class. Please try again later.');
        }
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
                       <View style={stylesMenu.pictureCircle} />
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
