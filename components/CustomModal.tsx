import React from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { styles } from './styles';

const CustomModal = ({ visible, message, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Text>{message}</Text>
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default CustomModal;