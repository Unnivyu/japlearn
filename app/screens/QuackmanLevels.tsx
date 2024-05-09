import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { stylesLevels } from './stylesLevels';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';

const QuackmanLevels = ({ navigation }) => {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [newLevelName, setNewLevelName] = useState('');

    const handleBackPress = () => {
        navigation.navigate('ClassDashboard');
    }

    const handleAddPress = () => {
        setAddModalVisible(true);
    }

    const handleRemovePress = () => {
        setRemoveModalVisible(true);
    }

    const handleAddLevel = () => {
        setAddModalVisible(false);
        setNewLevelName('');
    }

    const handleRemoveLevel = () => {
        setRemoveModalVisible(false);
    }

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
                <Text style={stylesLevels.titleText}>Classname: Quackman</Text>
            </View>
            <View style={stylesLevels.buttonContainer}>
                <CustomButton title="Add" onPress={handleAddPress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
                <CustomButton title="Remove" onPress={handleRemovePress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
            </View>
            <ScrollView>
                <View style={stylesLevels.levelContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('QuackmanEdit')}>
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
                        <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => setRemoveModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
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

export default QuackmanLevels;
