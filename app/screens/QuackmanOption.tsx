import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { stylesOption } from './stylesOption'; 
import OptionButton from '../../components/OptionButton'; 
import BackIcon from '../../assets/back-icon.svg';
import Banner from '../../assets/qkmanBanner.svg';
import { stylesClass } from './stylesClass';
import { useClassCode } from '../../context/ClassCodeContext';

const QuackmanOption = ({ navigation }) => {
    const { classCode } = useClassCode();
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const fetchLevels = async () => {
            if (!classCode) return; // Exit if classCode is not available

            try {
                const response = await fetch(`http://localhost:8080/api/quackmanlevels/getLevels/${classCode}`);
                const data = await response.json();
                console.log(data);
                setLevels(data);
            } catch (error) {
                console.error('Error fetching levels:', error);
            }
        };

        fetchLevels();
    }, [classCode]);

    const handleBackPress = () => {
        navigation.navigate('Menu');
    };

    return (
        <View style={stylesClass.container}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesOption.bannerContainer}>
                <Banner width={300} height={150} />
            </View>
            <ScrollView contentContainerStyle={stylesOption.menuContainer}>
                {levels.map((level) => (
                    <OptionButton
                        key={level.levelId}
                        imageSource={require('../../assets/QuackmanButton.png')}
                        buttonText={level.title}
                        onPress={() => navigation.navigate('Quackman', { levelId: level.levelId })}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default QuackmanOption;
