import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { stylesProfile } from './stylesProfile';
import { SvgXml } from 'react-native-svg'; 
import BackIcon from '../../assets/back-icon.svg';
import { AuthContext } from '../../context/AuthContext';

const Profile = ({ navigation }) => {
    const { logout } = useContext(AuthContext);

    const handleBackPress = () => {
        navigation.navigate('Menu');
    }

    const handleScoresPress = () => {
        navigation.navigate('Score');
    }

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    }
    
    return (
        <View>
            <View style={stylesProfile.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={30} height={30}/>
                </TouchableOpacity>
            </View>
            
            <View>
                
                <View style={stylesProfile.cover}>
                <ImageBackground
                    source={require('../../assets/cover.png')} 
                    style={{ flex: 1, width: '100%', height: '100%',}}
                    resizeMode="repeat" 
                />
                </View>
                <View style={stylesProfile.profileContainer}>
                </View>
                <View style={stylesProfile.whiteSpace}>
                    <TouchableOpacity onPress={handleLogout} style={stylesProfile.buttonContainer}>
                        <Text style={stylesProfile.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={stylesProfile.description}>
                
                <View style={stylesProfile.descTextContainer}>
                    <Text style={stylesProfile.descText}>Username: Jan Shaono</Text>
                    <Text style={stylesProfile.descText}>Class Code:</Text>
                </View>
            </View>
            <View style={stylesProfile.scoreArea}>
                <TouchableOpacity onPress={handleScoresPress} style={stylesProfile.scoreButton}>
                    <Text style={stylesProfile.scoreButtonText}>Score</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Profile;
