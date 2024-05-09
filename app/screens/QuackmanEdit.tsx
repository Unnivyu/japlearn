import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { stylesEdit } from './stylesEdit';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import { styles } from './stylesModal';

const QuackmanEdit = ({ navigation }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [newWord, setNewWord] = useState('');
    const [newJapaneseChar, setNewJapaneseChar] = useState('');

    const handleBackPress = () => {
        navigation.navigate('QuackmanLevels');
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    };

    const handleAddWord = () => {
        setAddModalVisible(false);
        // Add logic here to handle adding the new word
        setNewWord('');
        setNewJapaneseChar('');
    };

    const handleRemoveWord = () => {
        setRemoveModalVisible(false);
        // Add logic here to handle removing the selected word
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
                <CustomButton title="Add" onPress={handleAddPress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>
            <ScrollView>
                <View style={stylesEdit.editContainer}>
                    <View style={stylesEdit.quackmaneditContent}>
                        <TextInput
                            style={stylesEdit.input}
                            value={newWord}
                            onChangeText={setNewWord}
                            placeholder='Enter Word'
                        />
                        <TextInput
                            style={stylesEdit.input}
                            value={newJapaneseChar}
                            onChangeText={setNewJapaneseChar}
                            placeholder='Enter Japanese Character'
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
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.text}>Enter new content:</Text>
                            <TextInput
                                style={styles.input}
                                value={newWord}
                                onChangeText={setNewWord}
                                placeholder='Word'
                            />
                            <TextInput
                                style={styles.input}
                                value={newJapaneseChar}
                                onChangeText={setNewJapaneseChar}
                                placeholder='Japanese Character'
                            />
                            <CustomButton title="Add" onPress={handleAddWord} style={styles.button} textStyle={styles.buttonText} />
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
                            <Text style={styles.text}>Are you sure you want to remove this?</Text>
                            <CustomButton title="Remove" onPress={handleRemoveWord} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuackmanEdit;
