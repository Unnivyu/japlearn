import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import OptionButton2 from '../../components/OptionButton2';
import Banner from '../../assets/moleBanner.svg';
import BackIcon from '../../assets/back-icon.svg';
import { stylesOption } from './stylesOption';
import { stylesClass } from './stylesClass';
import { useClassCode } from '../../context/ClassCodeContext';
import expoconfig from '../../expoconfig';

const QuackamoleOption = ({ navigation }) => {
    const { classCode } = useClassCode();
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const fetchLevels = async () => {
            if (!classCode) return; // Exit if classCode is not available

            try {
                const response = await fetch(`${expoconfig.API_URL}/api/quackamolelevels/getLevels/${classCode}`);
                const levelsData = await response.json();
                
                // Fetch titles for each level
                const levelsWithTitles = await Promise.all(levelsData.map(async (level) => {
                    const titleResponse = await fetch(`${expoconfig.API_URL}/api/quackamolelevels/getTitle/${level.levelId}`);
                    const title = await titleResponse.text();
                    return { ...level, title };
                }));

                setLevels(levelsWithTitles);
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
                    <OptionButton2
                        key={level.levelId}
                        imageSource={require('../../assets/QuackamoleButton.png')}
                        buttonText={level.title}
                        onPress={() => navigation.navigate('Quackamole', { levelId: level.levelId, title: level.title })}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default QuackamoleOption;
