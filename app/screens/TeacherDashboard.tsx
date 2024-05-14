import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { stylesDashboard } from './stylesDashboard';
import { styles } from './stylesModal';
import { AuthContext } from '../../context/AuthContext';

const TeacherDashboard = ({ navigation }) => {
    const [classCodes, setClassCodes] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteClassCode, setDeleteClassCode] = useState('');
    const [newClassCode, setNewClassCode] = useState('');
    const { user } = useContext(AuthContext);

    const fetchClassCodes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/classes/getAllClasses');
            if (response.ok) {
                const data = await response.json();
                setClassCodes(data.map(item => item.classCodes));
            } else {
                const errorData = await response.json();
                throw new Error('Failed to fetch class codes: ' + errorData.message);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
            alert('Failed to load class codes: ' + error.message);
        }
    };

    useEffect(() => {
        fetchClassCodes();
    }, []);

    const addClass = async () => {
        if (!newClassCode.trim()) {
            alert("Please enter a class code");
            return;
        }
        const classEntity = {
            classCodes: newClassCode
        };
        try {
            const response = await fetch('http://localhost:8080/api/classes/addClass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classEntity)
            });
            const data = await response.json(); // Parse the JSON data
            if (response.ok) {
                fetchClassCodes();
                setAddModalVisible(false);
                setNewClassCode('');
            } else {
                alert(data.error || 'Error adding class'); // Show error from backend
            }
        } catch (error) {
            console.error('Error adding class:', error);
            alert('Error adding class: ' + error.message);
        }
    };

    const handleRemoveClass = async () => {
        if (!deleteClassCode.trim()) {
            alert("Please enter a valid class code to delete");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/classes/removeClass?classCode=${deleteClassCode}`, {
                method: 'DELETE'
            });
            const data = await response.json(); // Always parse JSON
            if (response.ok) {
                alert(data.message); // Handle successful removal
                fetchClassCodes();
                setDeleteModalVisible(false);
                setDeleteClassCode('');
            } else {
                throw new Error(data.error || 'Failed to delete class'); // Handle errors
            }
        } catch (error) {
            alert(`Error removing class: ${error.message}`);
        }
    };

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setDeleteModalVisible(true);
    };

    const closeModal = () => {
        setAddModalVisible(false);
        setDeleteModalVisible(false);
        setDeleteClassCode('');
    };

    const handleClassPress = (classCode) => {
        navigation.navigate('ClassDashboard', { classCode });
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
                            <CustomButton title="Remove" onPress={handleRemovePress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={stylesDashboard.classContainer}>
                        {classCodes.map((code, index) => (
                            <TouchableOpacity key={index} onPress={() => handleClassPress(code)}>
                                <View style={stylesDashboard.classContent}>
                                    <Text style={stylesDashboard.classContentText}>{code}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
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
                                    <TextInput
                                        placeholder="Class Code"
                                        value={newClassCode}
                                        onChangeText={setNewClassCode}
                                        style={styles.input}
                                    />
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
                                <View style={styles.modalContent}>
                                    <Text style={styles.text}>Are you sure you want to delete the following class?</Text>
                                    <TextInput
                                        placeholder="Enter Class Code"
                                        value={deleteClassCode}
                                        onChangeText={setDeleteClassCode}
                                        style={styles.input}
                                    />
                                    <CustomButton title="Delete" onPress={handleRemoveClass} style={styles.button} textStyle={styles.buttonText} />
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
