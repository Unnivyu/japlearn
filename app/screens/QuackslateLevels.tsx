import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { stylesLevels } from './stylesLevels';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import { styles } from './stylesModal';

const QuackslateLevels = ({ navigation, route }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [newLevelName, setNewLevelName] = useState('');
    const [levels, setLevels] = useState([]);
    const [selectedLevelID, setSelectedLevelID] = useState(null);
    const { classCode } = route.params; 

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quackslateLevels/allquackslatelevels?classCode=${classCode}`);
            if (response.ok) {
                const data = await response.json();
                setLevels(data);
            } else {
                throw new Error('Failed to fetch levels');
            }
        } catch (error) {
            console.error('Error fetching levels:', error);
            Alert.alert('Error', 'Failed to fetch levels');
        }
    };

    const handleBackPress = () => {
        navigation.navigate('ClassDashboard', { classCode });
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    };

    const handleAddLevel = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quackslateLevels/addquackslatelevel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    levelID: Math.floor(Math.random() * 10000), // Generate a random ID or handle it differently
                    title: newLevelName,
                    classID: classCode, // Use classCode as classID
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Level added successfully!');
                setAddModalVisible(false);
                setNewLevelName('');
                fetchLevels(); // Refresh the list of levels
            } else {
                throw new Error('Failed to add level');
            }
        } catch (error) {
            console.error('Error adding level:', error);
            Alert.alert('Error', 'Failed to add level');
        }
    };

    const handleRemoveLevel = async () => {
        if (!selectedLevelID) {
            Alert.alert('Error', 'Please select a level to remove.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/quackslateLevels/deletequackslatelevel/${selectedLevelID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Success', 'Level removed successfully!');
                setRemoveModalVisible(false);
                setSelectedLevelID(null);
                fetchLevels(); // Refresh the list of levels
            } else {
                throw new Error('Failed to remove level');
            }
        } catch (error) {
            console.error('Error removing level:', error);
            Alert.alert('Error', 'Failed to remove level');
        }
    };

    const handleLevelNavigate = (levelID, title) => {
        navigation.navigate('QuackslateEdit', { classCode, levelID, title });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesLevels.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesLevels.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesLevels.titleTextContainer}>
                <Text style={stylesLevels.titleText}>Classname: Quackslate</Text>
            </View>
            <View style={stylesLevels.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
            </View>
            <ScrollView contentContainerStyle={stylesLevels.levelContainer} style={{ flex: 1 }}>
                {levels.map((level) => (
                    <TouchableOpacity key={level.levelID} onPress={() => handleLevelNavigate(level.levelID, level.title)}>
                        <View style={stylesLevels.level}>
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
                <ScrollView contentContainerStyle={styles.centeredView}>
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
                                value={newLevelName}
                                onChangeText={setNewLevelName}
                                placeholder="Level Name"
                            />
                            <CustomButton title="Add" onPress={handleAddLevel} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={removeModalVisible}
                onRequestClose={() => setRemoveModalVisible(false)}
            >
                <ScrollView contentContainerStyle={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setRemoveModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Select a level to remove:</Text>
                            <ScrollView>
                                {levels.map((level) => (
                                    <TouchableOpacity key={level.levelID} onPress={() => setSelectedLevelID(level.levelID)}>
                                        <View style={selectedLevelID === level.levelID ? stylesLevels.selectedLevel : stylesLevels.level}>
                                            <Text style={stylesLevels.levelText}>{level.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <CustomButton title="Remove" onPress={handleRemoveLevel} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

export default QuackslateLevels;
