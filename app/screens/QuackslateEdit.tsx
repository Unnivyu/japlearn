import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from './stylesEdit';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import expoconfig from '../../expoconfig';

const QuackslateEdit = ({ navigation, route }) => {
    const { classCode, levelID, title } = route.params;
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [wordToTranslate, setWordToTranslate] = useState('');
    const [japaneseCharacter, setJapaneseCharacter] = useState('');
    const [updatedWord, setUpdatedWord] = useState('');
    const [updatedTranslatedWord, setUpdatedTranslatedWord] = useState('');
    const [selectedContentID, setSelectedContentID] = useState(null);
    const [content, setContent] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateContent/getByLevel/${title}`);
            if (response.ok) {
                const data = await response.json();
                setContent(data);
            } else {
                throw new Error('Failed to fetch content');
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            Alert.alert('Error', 'Failed to fetch content');
        }
    };

    const addTranslationToDatabase = async () => {
        try {
            let response = await fetch(`${expoconfig.API_URL}/api/quackslateContent/addQuackslateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: Math.floor(Math.random() * 10000), // Generate a random ID or handle it differently
                    word: japaneseCharacter,
                    translatedWord: wordToTranslate,
                    level: title,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Content added successfully!');
                fetchContent(); // Refresh the list of content
                setAddModalVisible(false);
                setWordToTranslate('');
                setJapaneseCharacter('');
            } else {
                throw new Error('Failed to add content');
            }
        } catch (error) {
            console.error('Error adding content:', error);
            Alert.alert('Error', 'Failed to add content');
        }
    };

    const updateContentInDatabase = async () => {
        if (!selectedContentID) return;

        try {
            let response = await fetch(`http://localhost:8080/api/quackslateContent/updateQuackslateContent/${selectedContentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedContentID,
                    word: updatedWord,
                    translatedWord: updatedTranslatedWord,
                    level: title,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Content updated successfully!');
                fetchContent(); // Refresh the list of content
                setEditModalVisible(false);
                setUpdatedWord('');
                setUpdatedTranslatedWord('');
            } else {
                throw new Error('Failed to update content');
            }
        } catch (error) {
            console.error('Error updating content:', error);
            Alert.alert('Error', 'Failed to update content');
        }
    };

    const handleCloseModal = () => {
        setAddModalVisible(false);
        setEditModalVisible(false);
        setWordToTranslate('');
        setJapaneseCharacter('');
        setUpdatedWord('');
        setUpdatedTranslatedWord('');
    };

    const handleBackPress = () => {
        navigation.navigate('QuackslateLevels', { classCode });
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = (item) => {
        setSelectedItem(item);
        setRemoveModalVisible(true);
    };

    const handleEditPress = (item) => {
        setSelectedContentID(item.id);
        setUpdatedWord(item.word);
        setUpdatedTranslatedWord(item.translatedWord);
        setEditModalVisible(true);
    };

    const handleRemoveTranslation = () => {
        if (selectedItem) {
            handleDelete(selectedItem.id);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Game Name: Quackslate</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>
            <ScrollView style={{ flex: 1 }}>
                {content.map((item) => (
                    <TouchableOpacity key={item.id} onLongPress={() => handleEditPress(item)}>
                        <View style={stylesEdit.quackmaneditContent}>
                            <Text style={stylesEdit.contentText}>{item.word}</Text>
                            <Text style={stylesEdit.contentText}>{item.translatedWord}</Text>
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
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Enter new content:</Text>
                            <TextInput
                                style={styles.input}
                                value={wordToTranslate}
                                onChangeText={setWordToTranslate}
                                placeholder="Enter word to be translated"
                            />
                            <TextInput
                                style={styles.input}
                                value={japaneseCharacter}
                                onChangeText={setJapaneseCharacter}
                                placeholder="Enter Japanese character"
                            />
                            <CustomButton title="Add" onPress={addTranslationToDatabase} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Edit content:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedWord}
                                onChangeText={setUpdatedWord}
                                placeholder="Enter word"
                            />
                            <TextInput
                                style={styles.input}
                                value={updatedTranslatedWord}
                                onChangeText={setUpdatedTranslatedWord}
                                placeholder="Enter translated word"
                            />
                            <CustomButton title="Save" onPress={updateContentInDatabase} style={styles.button} textStyle={styles.buttonText} />
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
                        <TouchableOpacity onPress={() => setRemoveModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Are you sure you want to remove this?</Text>
                            <CustomButton title="Remove" onPress={handleRemoveTranslation} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuackslateEdit;
