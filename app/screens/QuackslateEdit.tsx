import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from './stylesEdit';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';

const QuackslateEdit = ({ navigation, route }) => {
    const { classCode, levelID, title } = route.params;
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [wordToTranslate, setWordToTranslate] = useState('');
    const [japaneseCharacter, setJapaneseCharacter] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quackslateContent/getByLevel/${title}`);
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
            let response = await fetch('http://localhost:8080/api/quackslateContent/addQuackslateContent', {
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

    const handleCloseModal = () => {
        setAddModalVisible(false);
        setWordToTranslate('');
        setJapaneseCharacter('');
    };

    const handleBackPress = () => {
        navigation.navigate('QuackslateLevels', { classCode });
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    };

    const handleAddTranslation = () => {
        setAddModalVisible(false);
        setWordToTranslate('');
        setJapaneseCharacter('');
    };

    const handleRemoveTranslation = () => {
        setRemoveModalVisible(false);
    };

    return (
        <View>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Classname: Quackslate</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>
            <ScrollView contentContainerStyle={stylesEdit.scrollViewContent}>
                {content.map((item) => (
                    <View key={item.id} style={stylesEdit.quackmaneditContent}>
                        <Text style={stylesEdit.contentText}>{item.word}</Text>
                        <Text style={stylesEdit.contentText}>{item.translatedWord}</Text>
                    </View>
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
