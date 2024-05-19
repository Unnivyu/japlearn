import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Text } from 'react-native';
import OptionButton2 from '../../components/OptionButton2';
import Banner from '../../assets/moleBanner.svg';
import BackIcon from '../../assets/back-icon.svg';
import { stylesOption } from './stylesOption';
import { stylesClass } from './stylesClass';
import { useClassCode } from '../../context/ClassCodeContext';

const QuackamoleOption = ({ navigation }) => {
    const { classCode } = useClassCode();
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const fetchLevels = async () => {
            if (!classCode) return; // Exit if classCode is not available

            try {
                const response = await fetch(`http://localhost:8080/api/quackamolelevels/getLevels/${classCode}`);
                const data = await response.json();
                console.log(data);
                setLevels(data);
            } catch (error) {
                console.error('Error fetching levels:', error);
            }
        };

        fetchLevels();
    }, [classCode]); // Add classCode as a dependency

    const handleBackPress = () => {
        console.log('Back button pressed');
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
                    <OptionButton2
                        key={level.levelId}
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText={level.title}
                        onPress={() => navigation.navigate('Quackamole', { levelId: level.levelId })}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default QuackamoleOption;
