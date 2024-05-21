import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from './stylesEdit';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';

const QuackmanEdit = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [content, setContent] = useState([]);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const { classCode, levelId } = route.params;

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quackmancontent/getContentByLevelId/${levelId}`);
            const responseText = await response.text();
            console.log("Response text:", responseText); // Log the raw response text

            if (response.ok) {
                if (responseText) {
                    const data = JSON.parse(responseText);
                    setContent([data]);
                    console.log("Fetched data:", data);
                } else {
                    console.warn("Response was empty, creating a content");
                    await createNewContent();
                }
            } else {
                console.error('Failed to fetch content:', responseText);
                Alert.alert('Error', 'Failed to fetch content');
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            Alert.alert('Error', 'Failed to fetch content');
        }
    };

    const createNewContent = async () => {
        try {
            const newContent = {
                word: [],
                hint: [],
                levelId: levelId
            };
    
            const response = await fetch(`http://localhost:8080/api/quackmancontent/addContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContent)
            });
    
            if (response.ok) {
                const createdContent = await response.json();
                setContent([createdContent]);
                console.log("Created new content:", createdContent);
            } else {
                const errorData = await response.text();
                console.error('Failed to create new content:', errorData);
                Alert.alert('Error', 'Failed to create new content');
            }
        } catch (error) {
            console.error('Error creating new content:', error);
            Alert.alert('Error', 'Failed to create new content');
        }
    };


    const handleAddContent = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quackmancontent/addContentToLevel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    levelId: levelId,
                    word: word,
                    hint: hint,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Content added successfully!');
                fetchContent(); // Refresh the list
                setModalVisible(false);
                setWord('');
                setHint('');
            } else {
                const errorData = await response.text();
                console.error('Failed to add content:', errorData);
                Alert.alert('Error', 'Failed to add content');
            }
        } catch (error) {
            console.error('Error adding content:', error);
            Alert.alert('Error', 'Failed to add content');
        }
    };

    const handleRemoveContent = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quackmancontent/deleteContent/${selectedContentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Success', 'Content removed successfully!');
                fetchContent(); // Refresh the list
                setRemoveModalVisible(false);
            } else {
                const errorData = await response.text();
                console.error('Failed to remove content:', errorData);
                Alert.alert('Error', 'Failed to remove content');
            }
        } catch (error) {
            console.error('Error removing content:', error);
            Alert.alert('Error', 'Failed to remove content');
        }
    };

    const handleBackPress = () => {
        navigation.navigate('QuackmanLevels', { classCode, levelId });
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setWord('');
        setHint('');
    };

    const handleOpenRemoveModal = (contentId) => {
        setSelectedContentId(contentId);
        setRemoveModalVisible(true);
    };

    const handleCloseRemoveModal = () => {
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
                <Text style={stylesEdit.titleText}>Classname: Quackman</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <CustomButton title="Add" onPress={() => setModalVisible(true)} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
                <CustomButton title="Remove" onPress={() => setRemoveModalVisible(true)} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>
            <ScrollView contentContainerStyle={stylesEdit.scrollViewContent}>
                {content.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleOpenRemoveModal(item.levelId)}>
                        <View style={stylesEdit.quackmaneditContent}>
                            <Text style={stylesEdit.contentText}>{item.word}</Text>
                            <Text style={stylesEdit.contentText}>{item.hint}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
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
                                value={word}
                                onChangeText={setWord}
                                placeholder="Enter word"
                            />
                            <TextInput
                                style={styles.input}
                                value={hint}
                                onChangeText={setHint}
                                placeholder="Enter hint"
                            />
                            <CustomButton title="Add" onPress={handleAddContent} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={removeModalVisible}
                onRequestClose={handleCloseRemoveModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={handleCloseRemoveModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Are you sure you want to remove this content?</Text>
                            <CustomButton title="Remove" onPress={handleRemoveContent} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuackmanEdit;
