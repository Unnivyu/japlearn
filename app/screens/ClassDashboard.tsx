
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { stylesClass } from './stylesClass';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import { ImageBackground } from 'react-native';
import Icon1 from '../../assets/gameIcon1.svg';
import Icon2 from '../../assets/gameIcon2.svg';
import Icon3 from '../../assets/gameIcon3.svg';


const ClassDashboard = ({ navigation, route }) => {
    const [activeCategory, setActiveCategory] = useState('MEMBERS');
    const { classCode } = route.params;  // Extract classCode from route params
    const [userData, setUserData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/students/getByClassCode?classCode=${classCode}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [classCode]);

    const handleDeleteModalConfirm = () => {
        setShowDeleteModal(false);
    }

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
    }

    const handleBackPress = () => {
        navigation.navigate('TeacherDashboard');
    }

    const handleOnPress = () => {

    }

    return (
        <View style={stylesClass.container}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesClass.menuContainer}>
                <Text style={stylesClass.titleText}>Class: {classCode}</Text>
                <View style={stylesClass.categoryContainer}>
                    <CustomButton title="MEMBERS" onPress={() => handleCategoryPress('MEMBERS')} style={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                    <CustomButton title="SCORES" onPress={() => handleCategoryPress('SCORES')} style={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                    <CustomButton title="GAMES" onPress={() => handleCategoryPress('GAMES')} style={stylesClass.categoryButton} textStyle={stylesClass.categoryButtonText} />
                </View>
            </View>

            <View>
                {activeCategory !== 'GAMES' && (
                    <View style={stylesClass.buttonContainer}>
                        {activeCategory === 'SCORES' ? (
                            <>
                                <CustomButton title="Filter" onPress={handleOnPress} style={stylesClass.button} textStyle={stylesClass.buttonText} />
                                <CustomButton title="Export" onPress={handleOnPress} style={stylesClass.button} textStyle={stylesClass.buttonText} />
                            </>
                        ) : (
                            <>
                                <View></View>
                                <CustomButton title="Remove" onPress={() => setShowDeleteModal(true)} style={stylesClass.button} textStyle={stylesClass.buttonText} />
                            </>
                        )}
                    </View>
                )}
            </View>
            <ScrollView contentContainerStyle={stylesClass.contentScrollContainer}>
                <View style={stylesClass.contentContainer}>
                    {activeCategory === 'MEMBERS' && (
                        <View style={stylesClass.membersContentContainer}>
                            {userData.map((user, index) => (
                                <TouchableOpacity key={index}>
                                    <View style={stylesClass.content}>
                                        <Text style={stylesClass.classContentText}>
                                            {user.fname} {user.lname}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {activeCategory === 'SCORES' && (
                        <View style={stylesClass.membersContentContainer}>
                            <TouchableOpacity>
                                <View style={stylesClass.scoreContent}>
                                    <Text style={stylesClass.classContentText}>Game name:</Text>
                                    <View style={stylesClass.gameDescription}>
                                        <View>
                                            <Text style={stylesClass.classContentText}>Game Part 1</Text>
                                        </View>
                                        <View>
                                            <Text style={stylesClass.classContentText}>Date</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    {activeCategory === 'GAMES' && (
                        <View style={stylesClass.membersContentContainer}>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => navigation.navigate('QuackamoleLevels', { classCode: classCode })} style={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackamole</Text>
                                </View>
                                <Icon1 style={stylesClass.floatingIcon} width={150} height={150} fill={'#fff'} />
                            </View>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => navigation.navigate('QuackslateLevels')} style={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackslate</Text>
                                </View>
                                <Icon2 style={stylesClass.floatingIcon} width={130} height={130} fill={'#fff'} />
                            </View>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => navigation.navigate('QuackmanLevels')} style={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackman</Text>
                                </View>
                                <Icon3 style={stylesClass.floatingIcon} width={175} height={175} fill={'#fff'} />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>Are you sure you want to delete this?</Text>
                        <View style={styles.modalContent}>
                            <CustomButton title="Delete" onPress={handleDeleteModalConfirm} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ClassDashboard;