import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { stylesLevels } from './stylesLevels';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';



const QuackmamoleLevels = ({navigation}) => {
    
    const handleBackPress = () => {
        navigation.navigate('ClassDashboard');
    }
    const handleOnPress = () => {

    }
    const handleLevelNavigatePress = () => {
        navigation.navigate('QuackamoleEdit')
    }

    return(
        <View>
            <View style={stylesLevels.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesLevels.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesLevels.titleTextContainer}>
                <Text style={stylesLevels.titleText}>Classname: Quackamole</Text>
            </View>
            <View style={stylesLevels.buttonContainer}>
                <CustomButton title="Add" onPress={handleOnPress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
                <CustomButton title="Remove" onPress={handleOnPress} style={stylesLevels.button} textStyle={stylesLevels.buttonText} />
            </View>
            <ScrollView>
                
                    <View style={stylesLevels.levelContainer}>
                        <TouchableOpacity onPress={handleLevelNavigatePress}>
                            <View style={stylesLevels.level}>
                                <Text style={stylesLevels.levelText}>Level Name</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                
            </ScrollView>

        </View>
    );
}

export default QuackmamoleLevels;