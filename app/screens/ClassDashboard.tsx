import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { stylesClass } from './stylesClass';
import { styles } from './stylesModal';
import BackIcon from '../../assets/back-icon.svg';
import Icon1 from '../../assets/gameIcon1.svg';
import Icon2 from '../../assets/gameIcon2.svg';
import Icon3 from '../../assets/gameIcon3.svg';
import expoconfig from '../../expoconfig';

const ClassDashboard = ({ navigation, route }) => {
    const [activeCategory, setActiveCategory] = useState('MEMBERS');
    const { classCode } = route.params;  // Extract classCode from route params
    const [userData, setUserData] = useState([]);
    const [scoresData, setScoresData] = useState([]);
    const [filteredScoresData, setFilteredScoresData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [studentToRemove, setStudentToRemove] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${expoconfig.API_URL}/api/students/getByClassCode?classCode=${classCode}`);
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

    const fetchScoresData = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateScores/getScoresByClasscode/${classCode}`);
            if (response.ok) {
                const data = await response.json();
                setScoresData(data);
                setFilteredScoresData(data);
            } else {
                console.error('Failed to fetch scores data');
            }
        } catch (error) {
            console.error('Error fetching scores data:', error);
        }
    };

    useEffect(() => {
        if (activeCategory === 'SCORES' || activeCategory === 'GAMES') {
            fetchScoresData();
        }
    }, [activeCategory]);

    const handleDeleteModalConfirm = async () => {
        setShowDeleteModal(false);
        console.log('Removing student:', studentToRemove);
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/students/removeStudent`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ classCode, name: studentToRemove })
            });
            console.log('Response:', response);
            if (response.ok) {
                const updatedUserData = userData.filter(user => `${user.fname} ${user.lname}`.toLowerCase() !== studentToRemove.toLowerCase());
                setUserData(updatedUserData);
                console.log('Student removed successfully');
            } else {
                const errorData = await response.json();
                console.error('Failed to remove student:', errorData);
            }
        } catch (error) {
            console.error('Error removing student:', error);
        }
    }

    

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
    }

    const handleBackPress = () => {
        navigation.navigate('TeacherDashboard');
    }

    const getGameName = (level) => {
        return level.startsWith('Intro') || level.startsWith('Basics') ? `Quackslate ${level}` : level;
    }

    const handleFilterPress = (game) => {
        setSelectedGame(game);
        if (game) {
            const filteredData = scoresData.filter(score => getGameName(score.level).includes(game));
            setFilteredScoresData(filteredData);
        } else {
            setFilteredScoresData(scoresData);
        }
        setShowFilterModal(false);
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
                                <CustomButton title="Filter" onPress={() => setShowFilterModal(true)} style={stylesClass.button} textStyle={stylesClass.buttonText} />
                                <CustomButton title="Export" onPress={() => {}} style={stylesClass.button} textStyle={stylesClass.buttonText} />
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
                            {filteredScoresData.map((score, index) => (
                                <TouchableOpacity key={index}>
                                    <View style={stylesClass.scoreContent}>
                                        <Text style={stylesClass.classContentText}>Name: {score.fname} {score.lname}</Text>
                                        <Text style={stylesClass.classContentText}>Score: {score.score}</Text>
                                        <Text style={stylesClass.classContentText}>Game: {getGameName(score.level)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
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
                                <CustomButton title="Edit" onPress={() => navigation.navigate('QuackslateLevels', { classCode })} style={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
                                <View style={stylesClass.gameTextContainer}>
                                    <Text style={stylesClass.gameContentText}>Quackslate</Text>
                                </View>
                                <Icon2 style={stylesClass.floatingIcon} width={130} height={130} fill={'#fff'} />

                            </View>
                            <View style={stylesClass.gameContent}>
                                <CustomButton title="Edit" onPress={() => navigation.navigate('QuackmanLevels', { classCode })} style={stylesClass.gameButton} textStyle={stylesClass.buttonText} />
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
                visible={showFilterModal}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Filter by Game</Text>
                        <CustomButton title="All" onPress={() => handleFilterPress(null)} style={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackslate" onPress={() => handleFilterPress('Quackslate')} style={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackamole" onPress={() => handleFilterPress('Quackamole')} style={styles.button} textStyle={styles.buttonText} />
                        <CustomButton title="Quackman" onPress={() => handleFilterPress('Quackman')} style={styles.button} textStyle={styles.buttonText} />
                    </View>
                </View>
            </Modal>
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
                        <Text style={styles.text}>Are you sure you want to remove this student?</Text>
                        <TextInput
                            placeholder="Enter student's full name"
                            value={studentToRemove}
                            onChangeText={setStudentToRemove}
                        />
                        <View style={styles.modalContent}>
                            <CustomButton title="Remove" onPress={handleDeleteModalConfirm} style={styles.button} textStyle={styles.buttonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ClassDashboard;
