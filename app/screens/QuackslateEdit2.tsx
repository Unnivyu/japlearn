import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { stylesEdit } from './stylesEdit';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import expoconfig from '../../expoconfig';

const QuackslateEdit2 = ({ navigation }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [wordToTranslate, setWordToTranslate] = useState('');
    const [japaneseCharacter, setJapaneseCharacter] = useState('');

    const addTranslationToDatabase = async () => {
        try {
            let response = await fetch(`${expoconfig.API_URL}/api/quackslatebasics1/add1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `japPhrase=${encodeURIComponent(japaneseCharacter)}&engTransl=${encodeURIComponent(wordToTranslate)}`
            });
            let json = await response.json();
            alert('Content updated');
            console.log('Translation added:', json);
            setWordToTranslate('');
            setJapaneseCharacter('');
        } catch (error) {
            console.error('Error adding translation:', error);
        }
    };

    const handleCloseModal = () => {
        setAddModalVisible(false);
        setWordToTranslate('');
        setJapaneseCharacter('');
    };
    

    const handleBackPress = () => {
        navigation.navigate('QuackslateLevels');
    }

    const handleAddPress = () => {
        setAddModalVisible(true);
    }

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    }

    const handleAddTranslation = () => {
        setAddModalVisible(false);
        setWordToTranslate('');
        setJapaneseCharacter('');
    }

    const handleRemoveTranslation = () => {
        setRemoveModalVisible(false);
    }

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
            <ScrollView>
                <View style={stylesEdit.editContainer}>
                    <View style={stylesEdit.quackmaneditContent}>
                        <TextInput
                            style={stylesEdit.input}
                            value={wordToTranslate}
                            onChangeText={setWordToTranslate}
                            placeholder='Enter word to be translated'
                        />
                        <TextInput
                            style={stylesEdit.input}
                            value={japaneseCharacter}
                            onChangeText={setJapaneseCharacter}
                            placeholder='Enter Japanese character'
                        />
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
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
}

export default QuackslateEdit2;
