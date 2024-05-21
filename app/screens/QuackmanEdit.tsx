import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from './stylesEdit';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';

const QuackmanEdit = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [editWord, setEditWord] = useState('');
    const [editHint, setEditHint] = useState('');
    const [content, setContent] = useState([]);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [selectedWordIndex, setSelectedWordIndex] = useState(null);
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
            const encodedWord = encodeURIComponent(word);
            const encodedHint = encodeURIComponent(hint);
            const encodedLevelId = encodeURIComponent(levelId);
            const response = await fetch(`http://localhost:8080/api/quackmancontent/addContentToLevel?levelId=${encodedLevelId}&word=${encodedWord}&hint=${encodedHint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
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

    const handleEditContent = async () => {
        try {
            const updatedContent = {
                word: [...content[0].word],
                hint: [...content[0].hint]
            };
    
            updatedContent.word[selectedWordIndex] = editWord;
            updatedContent.hint[selectedWordIndex] = editHint;
    
            const response = await fetch(`http://localhost:8080/api/quackmancontent/updateContent/${selectedContentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contentId: selectedContentId,
                    levelId: content[0].levelId,
                    word: updatedContent.word,
                    hint: updatedContent.hint
                })
            });
    
            if (response.ok) {
                Alert.alert('Success', 'Content updated successfully!');
                fetchContent();
                setEditModalVisible(false);
                setEditWord('');
                setEditHint('');
            } else {
                const errorData = await response.text();
                console.error('Failed to update content:', errorData);
                Alert.alert('Error', 'Failed to update content');
            }
        } catch (error) {
            console.error('Error updating content:', error);
            Alert.alert('Error', 'Failed to update content');
        }
    };

    const handleRemoveContent = async () => {
        try {
            const wordToRemove = content[0].word[selectedWordIndex];
            const hintToRemove = content[0].hint[selectedWordIndex];
    
            const response = await fetch(`http://localhost:8080/api/quackmancontent/deleteContent/${selectedContentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    word: wordToRemove,
                    hint: hintToRemove,
                })
            });
            console.log(response);
    
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

    const handleOpenEditModal = (contentId, wordIndex, word, hint) => {
        setSelectedContentId(contentId);
        setSelectedWordIndex(wordIndex);
        setEditWord(word);
        setEditHint(hint);
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
        setEditWord('');
        setEditHint('');
    };

    const handleOpenRemoveModal = () => {
        setRemoveModalVisible(true);
    };

    const handleCloseRemoveModal = () => {
        setRemoveModalVisible(false);
    };

    const handleSelectContentForRemoval = (contentId, wordIndex) => {
        setSelectedContentId(contentId);
        setSelectedWordIndex(wordIndex);
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
                <Text style={stylesEdit.titleText}>Classname: Quackman</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
                <CustomButton title="Add" onPress={() => setModalVisible(true)} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
                <CustomButton title="Remove" onPress={handleOpenRemoveModal} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>

            <ScrollView style={{ flex: 1 }}>
                {content.map((item, index) =>
                    item.word.map((wordItem, wordIndex) => (
                        <TouchableOpacity
                            key={`${index}-${wordIndex}`}
                            onLongPress={() => handleOpenEditModal(item.levelId, wordIndex, wordItem, item.hint[wordIndex])}
                        >
                            <View style={stylesEdit.quackmaneditContent}>
                                <Text style={stylesEdit.contentText}>{`Hint: ${item.hint[wordIndex]}`}</Text>
                                <Text style={stylesEdit.contentText}>{`Word: ${wordItem}`}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
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
                visible={editModalVisible}
                onRequestClose={handleCloseEditModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={handleCloseEditModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Edit content:</Text>
                            <TextInput
                                style={styles.input}
                                value={editWord}
                                onChangeText={setEditWord}
                                placeholder="Enter word"
                            />
                            <TextInput
                                style={styles.input}
                                value={editHint}
                                onChangeText={setEditHint}
                                placeholder="Enter hint"
                            />
                            <CustomButton title="Save" onPress={handleEditContent} style={styles.button} textStyle={styles.buttonText} />
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
                <ScrollView contentContainerStyle={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={handleCloseRemoveModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Select content to remove:</Text>
                            <ScrollView style={{flex: 1}}>
                                {content.map((item, index) =>
                                    item.word.map((wordItem, wordIndex) => (
                                        <TouchableOpacity
                                            key={`${index}-${wordIndex}`}
                                            onPress={() => handleSelectContentForRemoval(item.levelId, wordIndex)}
                                        >
                                            <View style={selectedContentId === item.levelId && selectedWordIndex === wordIndex ? stylesEdit.selectedContent : stylesEdit.quackmaneditContent}>
                                                <Text style={stylesEdit.contentText}>{item.hint[wordIndex]}</Text>
                                                <Text style={stylesEdit.contentText}>{wordItem}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </ScrollView>
                            <CustomButton title="Remove" onPress={handleRemoveContent} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

export default QuackmanEdit;
