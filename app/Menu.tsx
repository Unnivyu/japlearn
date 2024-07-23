import { SafeAreaView, StyleSheet, Text, View, Pressable, FlatList, Modal, Image, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesMenu';
import Profile from '../assets/svg/user_pf.svg';
import Complete from '../assets/img/level_available.png';
import Locked from '../assets/img/level_locked.png';
import Background from '../assets/img/MenuBackground.png';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const levels = [
    { id: '1', title: 'Kana Intro', completed: true },
    { id: '2', title: 'Kana Basics I', completed: false },
    { id: '3', title: 'Kana Basics II', completed: false },
    { id: '4', title: 'Kana Basics III', completed: false },
    { id: '5', title: 'Kana Basics IV', completed: false },
    { id: '6', title: 'Kana Basics V', completed: false },
];

const LevelButton = ({ title, completed, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.levelButton}>
            <Image
                source={completed ? Complete : Locked}
                style={styles.imageIcon}
            />
            <Text style={styles.menuText}>{title}</Text>
        </Pressable>
    );
};


const Menu = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleLevelPress = (level) => {
        if (!level.completed) {
            setSelectedLevel(level);
            setModalVisible(true);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.levelContainer}>
            <LevelButton title={item.title} completed={item.completed} onPress={() => handleLevelPress(item)} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={[styles.header, { padding: 20 }]}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.hText}>Welcome Back</Text>
                            <Text style={styles.hText}>{user?.fname}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Pressable onPress={() => router.push('/Profile')}>
                                <Profile width={65} height={65} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={levels}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            contentContainerStyle={styles.flatListContainer}
                            columnWrapperStyle={styles.columnWrapper}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Level Locked</Text>
                            <Text style={styles.modalText}>You must complete previous level to unlock "{selectedLevel?.title}".</Text>
                            <CustomButton title="Close" onPress={() => setModalVisible(false)} buttonStyle={styles.modalButton} textStyle={styles.modalButtonText} />
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Menu;
