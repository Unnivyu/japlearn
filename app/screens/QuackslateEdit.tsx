import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { stylesEdit } from './stylesEdit';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';



const QuackslateEdit = ({navigation}) => {
    
    const handleBackPress = () => {
        navigation.navigate('QuackslateLevels');
    }
    const handleOnPress = () => {

    }
    

    return(
        <View>
            <View style={stylesEdit.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesEdit.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={stylesEdit.titleTextContainer}>
                <Text style={stylesEdit.titleText}>Classname: Quackslate</Text>
            </View>
            <View style={stylesEdit.buttonContainer}>
            <   CustomButton title="Add" onPress={handleOnPress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
                <CustomButton title="Remove" onPress={handleOnPress} style={stylesEdit.button} textStyle={stylesEdit.buttonText} />
            </View>
            <ScrollView>
                <View style={stylesEdit.editContainer}>
                    <View style={stylesEdit.quackmaneditContent}>
                        <TextInput 
                            style = {stylesEdit.input}
                            placeholder='Enter word to be translated'
                        />
                        <TextInput 
                            style = {stylesEdit.input}
                            placeholder='Enter Japanese character'
                        />

                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

export default QuackslateEdit;