import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import { stylesDashboard } from './stylesDashboard';
import CustomButton from '../../components/CustomButton';
import { styles } from './stylesModal';
import { db } from '../../config';
import {ref,set, push, child, get} from "firebase/database";
import { useFocusEffect } from '@react-navigation/native'; 
import { AuthContext } from '../../context/AuthContext';


const TeacherDashboard = ({ navigation }) => {
    const [classCodes, setClassCodes] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newClassCode, setNewClassCode] = useState('');
    const [selectedClassCodes, setSelectedClassCodes] = useState([]);
    const [selectedClassCode, setSelectedClassCode] = useState(null);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const { user } = useContext(AuthContext);

    const addClass = async () => {
        // Ensure there's a value in newClassCode
        if (!classCodes.trim()) {
            alert("Please enter a class code");
            return;
        }
    
        // Create the class entity to send to the backend
        const classEntity = {
            classCode: [classCodes]
        };
    
        try {
            // Send the class entity to your backend API endpoint
            const response = await fetch('http://localhost:8080/api/classes/addClass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classEntity)
            });
    
            if (response.ok) {
                // Parse response data if needed
                const data = await response.json();
                console.log('Class added successfully:', data);
                // Close the modal and reset the input
                setAddModalVisible(false);
                setNewClassCode('');
                // Optionally, refresh the classes list here
            } else {
                const errorData = await response.json();
                alert(`Error adding class: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding class:', error);
            alert('Error adding class');
        }
    };

   


    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);



    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

  


  

    const closeModal = () => {
        setAddModalVisible(false);
        setDeleteModalVisible(false);
        setConfirmDeleteModalVisible(false);
        setSelectedClassCodes([]);
        setSelectedClassCode(null);
    };



    const handleConfirmDeletePress = () => {
        setConfirmDeleteModalVisible(true);

    };

    const handleCancelDeletePress = () => {
        setSelectedClassCode(null);
        setConfirmDeleteModalVisible(false);

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={stylesDashboard.header}>
                        <View style={stylesDashboard.leftContainer}>
                            <Text style={stylesDashboard.hText}>Welcome Back</Text>
                            <Text style={stylesDashboard.hText}>Teacher</Text>
                        </View>
                        <View style={stylesDashboard.rightContainer}>
                            <TouchableOpacity onPress={handleProfilePress}>
                                <View style={stylesDashboard.pictureCircle}></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={stylesDashboard.menuContainer}>
                        <View>
                            <Text style={stylesDashboard.titleText}>Classes</Text>
                        </View>
                        <View style={stylesDashboard.buttonContainer}>
                            <CustomButton title="Add" onPress={handleAddPress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                            <CustomButton title="Remove" onPress={handleAddPress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={stylesDashboard.classContainer}>
                           
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={addModalVisible}
                        onRequestClose={closeModal}
                    >
                        
                        <View style={styles.centeredView}>
                            
                            <View style={styles.modalView}>
                                <View style={styles.closeButtonContainer}>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalContent}>
                                    <View>
                                        <TextInput
                                            placeholder="Class Code"
                                            value={classCodes}
                                            onChangeText={setClassCodes}
                                            style={styles.input}
                                        />
                                    </View>
                                    <CustomButton title="Add" onPress={addClass} style={styles.button} textStyle={styles.buttonText} />
                                </View>
                                
                            </View>
                        </View>

                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={deleteModalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.closeButtonContainer}>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Class Selection</Text>
                                <View style={styles.modalContent}>
                                    <View style={styles.stack}>
                                        {selectedClassCodes.map((code, index) => (
                                            <TouchableOpacity key={index} onPress={() => addClass} style={[styles.stackText, selectedClassCode === code && { backgroundColor: 'gray' }]}>
                                                <Text style={styles.stackText}>{code}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <CustomButton title="Delete" onPress={handleConfirmDeletePress} style={styles.button} textStyle={styles.buttonText} />
                                </View>
                                
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={confirmDeleteModalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.closeButtonContainer}>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalContent}>
                                    <Text style={styles.text}>Are you sure you want to delete class {selectedClassCode}?</Text>
                                    <CustomButton title="Delete" onPress={addClass} style={styles.button} textStyle={styles.buttonText} />
                                </View>
                                
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default TeacherDashboard;