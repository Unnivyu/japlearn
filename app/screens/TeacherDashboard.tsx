import React, { useState } from 'react';
import {
    Modal, View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, ScrollView,
    TextInput, Button, StyleSheet
} from 'react-native';
import { stylesDashboard } from './stylesDashboard';
import CustomButton from '../../components/CustomButton';
import {styles} from './stylesTeacherDashboard';
import { db } from '../../config';
import {ref,set, push, child, get} from "firebase/database";

const TeacherDashboard = ({ navigation }) => {
    const [classes, setClasses] = useState([{ name: 'Class 1', code: '333555' }]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newClassCode, setNewClassCode] = useState('');
    const [selectedClassCodes, setSelectedClassCodes] = useState([]);
    const [selectedClassCode, setSelectedClassCode] = useState(null);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [TeacherName, setTeacherName] = useState('');

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setDeleteModalVisible(true);
        setSelectedClassCodes(classes.map(classItem => classItem.code));
    };

    const handleClassNavigate = () => {
        navigation.navigate('ClassDashboard');
    };

    const addClass = async () => {
        const teacherName = 'Herrera'; // You can also set this dynamically if needed
        
        if (!newClassName) {
            console.error('Class name is missing');
            return;
        }
    
        try {
            const teacherRef = ref(db, `Teacher/${teacherName}`); // Get a reference to 'Teacher/Herrera' in the database
            
            // Update classList
            const classListRef = child(teacherRef, 'classList'); 
            const classListSnapshot = await get(classListRef);
            const classList = classListSnapshot.exists() ? classListSnapshot.val() : [];
    
            const updatedClassList = [...classList, newClassName];
            
            await set(classListRef, updatedClassList);
    
            setClasses(currentClasses => [...currentClasses, { name: newClassName }]);
            setNewClassName(''); 
            setAddModalVisible(false);
        } catch (error) {
            console.error('Error adding class to Firebase:', error.message); // Log error message
        }
    }; 

    const deleteClass = () => {
        setClasses(currentClasses => {
            const indexToRemove = currentClasses.findIndex(classItem => classItem.code === selectedClassCode);
            const newClasses = [...currentClasses.slice(0, indexToRemove), ...currentClasses.slice(indexToRemove + 1)];
            newClasses.forEach((classItem, index) => {
                classItem.name = `Class ${index + 1}`;
            });
            return newClasses;
        });
        setDeleteModalVisible(false);
        setConfirmDeleteModalVisible(false);
        setSelectedClassCode(null);
    };

    const closeModal = () => {
        setAddModalVisible(false);
        setDeleteModalVisible(false);
        setConfirmDeleteModalVisible(false);
        setSelectedClassCodes([]);
        setSelectedClassCode(null);
    };

    const handleClassCodePress = (code) => {
        setSelectedClassCode(code);
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
                            <CustomButton title="Remove" onPress={handleRemovePress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={stylesDashboard.classContainer}>
                            {classes.map((classItem, index) => (
                                <TouchableOpacity key={index} onPress={() => handleClassNavigate(classItem.code)}>
                                    <View style={stylesDashboard.classContent}>
                                        <Text style={stylesDashboard.classContentText}>Name: {classItem.name}</Text>
                                        <Text style={stylesDashboard.classContentText}>Code: {classItem.code}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
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
                                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>
                                <TextInput
                                    placeholder="Class Name"
                                    value={newClassName}
                                    onChangeText={setNewClassName}
                                    style={styles.input}
                                />
                                <Button title="Add Class" onPress={addClass} />
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
                                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>Are you sure you want to delete the following classes?</Text>
                                <View style={styles.stack}>
                                    {selectedClassCodes.map((code, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleClassCodePress(code)} style={[styles.stackText, selectedClassCode === code && { backgroundColor: 'gray' }]}>
                                            <Text style={styles.stackText}>{code}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Button title="Delete Classes" onPress={handleConfirmDeletePress} />
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
                                <TouchableOpacity onPress={handleCancelDeletePress} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={styles.text}>Are you sure you want to delete class {selectedClassCode}?</Text>
                                <Button title="Delete Class" onPress={deleteClass} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default TeacherDashboard;
