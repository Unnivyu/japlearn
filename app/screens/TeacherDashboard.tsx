import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import { stylesDashboard } from './stylesDashboard';
import CustomButton from '../../components/CustomButton';
import { styles } from './stylesTeacherDashboard';
import { db } from '../../config';
import { ref, get } from "firebase/database";
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import { AuthContext } from '../../context/AuthContext';


const TeacherDashboard = ({ navigation }) => {
    const [classes, setClasses] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newClassCode, setNewClassCode] = useState('');
    const [selectedClassCodes, setSelectedClassCodes] = useState([]);
    const [selectedClassCode, setSelectedClassCode] = useState(null);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const { user } = useContext(AuthContext);

    const fetchTeacherData = async () => {
        try {
            const teacherName = 'defaultTeacher';
            const teacherRef = ref(db, `Teacher/${teacherName}`);

            const teacherSnapshot = await get(teacherRef);
            const teacherData = teacherSnapshot.val();

            if (teacherData && teacherData.classList) {
                setClasses(
                    teacherData.classList.map((classItem, index) => ({
                        name: `Class ${index + 1}`,
                        code: classItem
                    }))
                );
            }
        } catch (error) {
            console.error('Error fetching teacher data:', error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchTeacherData(); 
        }, [])
    );

    useEffect(() => {
        console.log("Current user:", user);
    }, [user]);



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

    const handleClassNavigate = (classCode) => {
        navigation.navigate('ClassDashboard', { code: classCode });
    };

    const addClass = async () => {
        const teacherName = 'defaultTeacher';
        const newClassName = `Class ${classes.length + 1}`;

        if (!newClassCode) {
            console.error('Class code is missing');
            return;
        }

        try {
            const teacherRef = ref(db, `Teacher/${teacherName}`); // Get a reference to 'Teacher/teacherName' in the database

            const classListRef = child(teacherRef, 'classList');
            const classListSnapshot = await get(classListRef);
            const classList = classListSnapshot.exists() ? classListSnapshot.val() : [];

            const updatedClassList = [...classList, newClassCode];

            await set(classListRef, updatedClassList);

            setClasses(currentClasses => [...currentClasses, { name: newClassName, code: newClassCode }]);
            setNewClassCode('');
            setNewClassName('');
            setAddModalVisible(false);
        } catch (error) {
            console.error('Error adding class to Firebase:', error.message);
        }
    };

    const deleteClass = async () => {
        try {
            const teacherName = 'defaultTeacher';
            const teacherRef = ref(db, `Teacher/${teacherName}`);

            const classListRef = child(teacherRef, 'classList');
            const classListSnapshot = await get(classListRef);
            const classList = classListSnapshot.exists() ? classListSnapshot.val() : [];

            const updatedClassList = classList.filter(classItem => classItem !== selectedClassCode);

            await set(classListRef, updatedClassList);

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
        } catch (error) {
            console.error('Error deleting class from database:', error.message);
        }
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
                                    placeholder="Class Code"
                                    value={newClassCode}
                                    onChangeText={setNewClassCode}
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