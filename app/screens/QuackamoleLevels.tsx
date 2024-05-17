import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { stylesLevels } from './stylesLevels';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import { stylesEdit } from './stylesEdit';

const QuackamoleLevels = ({ navigation, route }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const { classCode } = route.params;
    const [newTitle, setNewTitle] = useState('');
    const [levels, setLevels] = useState([]);
    const [selectedLevelId, setSelectedLevelId] = useState('');

    // Fetch levels from the server
    const fetchLevels = async () => {
        const url = `http://localhost:8080/api/quackamolelevels/getLevels/${classCode}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                setLevels(data);  // Assuming the response is an array of levels
                console.log('Fetched levels:', data);
            } else {
                throw new Error(`Failed to fetch levels: ${data.message} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error fetching levels:', error);
        }
    };

    useEffect(() => {
        fetchLevels();  // Fetch levels when the component mounts
    }, [classCode]);  // Refetch levels whenever classCode changes

    const handleBackPress = () => {
        navigation.navigate('ClassDashboard', { classCode: classCode });
    };

    const handleLevelNavigatePress = (level) => {
        navigation.navigate('QuackamoleEdit', { classCode, levelId: level.levelId });
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        if (selectedLevelId) {
            setRemoveModalVisible(true);
        } else {
            alert('Please select a level to remove.');
        }
    };

    const handleAddLevel = async () => {
        const url = 'http://localhost:8080/api/quackamolelevels/addLevel';
        const levelData = {
            title: newTitle,
            classId: classCode
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(levelData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Level added successfully:', data);
                setAddModalVisible(false);
                setNewTitle('');
                fetchLevels();  // Refetch levels to update the list after adding a new level
            } else {
                throw new Error(`Failed to add level: ${data.message} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error adding level:', error);
        }
    };

    const handleRemoveLevel = async () => {
        const url = `http://localhost:8080/api/quackamolelevels/deleteLevel/${selectedLevelId}`;
        console.log(`Sending DELETE request to: ${url}`);
        try {
            const response = await fetch(url, { method: 'DELETE' });
            console.log(`Response status: ${response.status}`);
            if (response.ok) {
                console.log('Level removed successfully');
                setSelectedLevelId('');  // Clear the selected level ID
                setRemoveModalVisible(false);
                fetchLevels();  // Refetch levels to update the list after deletion
            } else {
                throw new Error(`Failed to remove level: ${response.statusText} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error removing level:', error);
        }
    };

    const toggleLevelSelection = (levelId) => {
        setSelectedLevelId(levelId === selectedLevelId ? '' : levelId);
    };

    return (
        <View>
            <View style={stylesLevels.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesLevels.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesLevels.titleTextContainer}>
                <Text style={stylesLevels.titleText}>Classname: Quackamole</Text>
            </View>
            <View style={stylesLevels.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
            </View>
            <ScrollView contentContainerStyle={stylesLevels.levelContainer}>
                {levels.map((level) => (
                    <TouchableOpacity key={level.levelId} onPress={() => handleLevelNavigatePress(level)}>
                        <View style={[stylesLevels.level, selectedLevelId === level.levelId && stylesLevels.selectedLevel]}>
                            <Text style={stylesLevels.levelText}>{level.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Enter new level name:</Text>
                            <TextInput
                                style={styles.input}
                                value={newTitle}
                                onChangeText={setNewTitle}
                                placeholder="Level Name"
                            />
                            <CustomButton title="Add" onPress={handleAddLevel} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={removeModalVisible}
                onRequestClose={() => setRemoveModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setRemoveModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Are you sure you want to remove this level?</Text>
                            <CustomButton title="Remove" onPress={handleRemoveLevel} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default QuackamoleLevels;
