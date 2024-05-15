import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { stylesLevels } from './stylesLevels';
import { styles} from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import { stylesEdit } from './stylesEdit';



const QuackamoleLevels = ({navigation, route}) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const { classCode } = route.params;
    const [newLevelName, setNewLevelName] = useState('');
    
    const handleBackPress = () => {
        navigation.navigate('ClassDashboard', { classCode: classCode });
    }

    const handleOnPress = () => {

    }

    const handleLevelNavigatePress = () => {
        navigation.navigate('QuackamoleEdit')
    }

    const handleAddPress = () => {
        setAddModalVisible(true);
    }

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    }

    const handleAddLevel = async () => {
        const url = 'http://localhost:8080/api/quackamoleLevels/';
        const levelData = {
            levelName: newLevelName,
            classCode: classCode
        };
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(levelData)
            });
    
            const data = await response.json();  // Assuming the server sends back some data or error message
            if (response.ok) {
                console.log('Level added successfully:', data);
                setAddModalVisible(false);
                setNewLevelName('');
            } else {
                throw new Error(`Failed to add level: ${data.message} (Status code: ${response.status})`);
            }
        } catch (error) {
            console.error('Error adding level:', error);
        }
    };
    

    const handleRemoveLevel = () => {
        setRemoveModalVisible(false);
    }

    return(
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
            <ScrollView>
                
                    <View style={stylesLevels.levelContainer}>
                        <TouchableOpacity onPress={handleLevelNavigatePress}>
                            <View style={stylesLevels.level}>
                                <Text style={stylesLevels.levelText}>Level Name</Text>
                            </View>
                        </TouchableOpacity>
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