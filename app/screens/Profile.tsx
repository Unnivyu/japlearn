import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { stylesProfile } from './stylesProfile';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/back-icon.svg';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import expoconfig from '../../expoconfig';
import studentProfile from '../../assets/studentProfile.png'; // Ensure this path is correct

const Profile = () => {
    const { user, role, logout } = useContext(AuthContext);
    const navigation = useNavigation();
    const [scoresData, setScoresData] = useState([]); // Initialize as an empty array
    const [activeGame, setActiveGame] = useState(null);
    const [noScores, setNoScores] = useState(false);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    const handleGamePress = async (gameType) => {
        setActiveGame(gameType);
        setNoScores(false);
        let endpoint;
        switch (gameType) {
            case 'Quackman':
                endpoint = `/api/quackmanScores/getquackmanScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            case 'Quackamole':
                endpoint = `/api/quackamoleScores/getquackamoleScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            case 'Quackslate':
                endpoint = `/api/quackslateScores/getScoreByFnameAndLname/${user.fname}/${user.lname}`;
                break;
            default:
                return;
        }

        try {
            const response = await fetch(`${expoconfig.API_URL}${endpoint}`);
            if (response.ok) {
                const data = await response.json();
                if (!Array.isArray(data)) {
                    setNoScores(true);
                    setScoresData([]);
                } else {
                    if (data.length === 0) {
                        setNoScores(true);
                    }
                    setScoresData(data);
                }
            } else {
                console.error(`Failed to fetch ${gameType} scores`);
                setNoScores(true);
                setScoresData([]);
            }
        } catch (error) {
            console.error(`Error fetching ${gameType} scores:`, error);
            setNoScores(true);
            setScoresData([]);
        }
    };

    return (
        <View>
            <View style={stylesProfile.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={stylesProfile.cover} />
                <View style={stylesProfile.profileContainer}>
                    <Image source={studentProfile} style={stylesProfile.profilePicture} />
                </View>
                <View style={stylesProfile.whiteSpace}>
                    <TouchableOpacity onPress={handleLogout} style={stylesProfile.buttonContainer}>
                        <Text style={stylesProfile.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={stylesProfile.description}>
                <View style={stylesProfile.descTextContainer}>
                    <Text style={stylesProfile.descText}>Username: {user ? `${user.fname} ${user.lname}` : ''}</Text>
                </View>
            </View>
            <View style={stylesProfile.categoryContainer}>
                <CustomButton title="QUACKMAN" onPress={() => handleGamePress('Quackman')} style={stylesProfile.categoryButton} textStyle={stylesProfile.categoryButtonText} />
                <CustomButton title="QUACKAMOLE" onPress={() => handleGamePress('Quackamole')} style={stylesProfile.categoryButton} textStyle={stylesProfile.categoryButtonText} />
                <CustomButton title="QUACKSLATE" onPress={() => handleGamePress('Quackslate')} style={stylesProfile.categoryButton} textStyle={stylesProfile.categoryButtonText} />
            </View>
            <ScrollView contentContainerStyle={stylesProfile.contentScrollContainer}>
                <View style={stylesProfile.contentContainer}>
                    {activeGame && (
                        <View style={stylesProfile.scoresContainer}>
                            <Text style={stylesProfile.gameTitle}>{activeGame} Scores</Text>
                            {noScores ? (
                                <Text style={stylesProfile.noScoresText}>No scores found</Text>
                            ) : (
                                scoresData.map((score, index) => (
                                    <View key={index} style={stylesProfile.scoreCard}>
                                        <Text style={stylesProfile.scoreText}>Name: {score.fname} {score.lname}</Text>
                                        <Text style={stylesProfile.scoreText}>Score: {score.score}</Text>
                                        <Text style={stylesProfile.scoreText}>Level: {score.level}</Text>
                                    </View>
                                ))
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
