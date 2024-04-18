import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { stylesDashboard } from './stylesDashboard';
import EmptyClass from '../../assets/empty.svg'
import CustomButton from '../../components/CustomButton';
import Empty from '../../assets/empty.svg'

const TeacherDashboard = ({navigation}) => {
    const [classcode, setClasscode] = useState('');
    const [classes, setClasses] = useState([{ name: 'Class 1', code: '333555' }]);

    const joinClass = async () => {
    }
    const handleProfilePress = () => {
        navigation.navigate('Profile');
    }
    const handleAddPress = () => {
    }
    const handleRemovePress = () => {
    }
    const handleClassNavigate = () => {
        navigation.navigate('ClassDashboard');
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={stylesDashboard.header}>
                        <View style={stylesDashboard.leftContainer}>
                            <Text style={stylesDashboard.hText}>Welcome Back</Text>
                            <Text style={stylesDashboard.hText}>Teacher</Text>
                        </View>
                        <View style={stylesDashboard.rightContainer}>
                            <TouchableOpacity onPress={handleProfilePress}> 
                                <View style={stylesDashboard.pictureCircle} >
                                    
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={stylesDashboard.menuContainer}>
                        <View>
                            <Text style={stylesDashboard.titleText}>Classes</Text>
                        </View>
                        <View style={stylesDashboard.buttonContainer}>
                            <CustomButton title="Add" onPress={handleAddPress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                            <CustomButton title="Remove" onPress={handleRemovePress} style={stylesDashboard.button} textStyle={stylesDashboard.buttonText} />
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                        <View style={stylesDashboard.classContainer}>
                            {classes.length === 0 ? ( 
                                <View style={stylesDashboard.classContainer}>
                                    <Text style={stylesDashboard.titleText}>No Classes</Text>
                                    <Empty width={250} height={250} />
                                </View>
                            ) : (
                                classes.map((classItem, index) => (
                                    <View key={index}>
                                        <TouchableOpacity onPress={handleClassNavigate}>
                                            <View style={stylesDashboard.classContent}>
                                                <Text style={stylesDashboard.classContentText}>Classname: {classItem.name}</Text>
                                                <Text style={stylesDashboard.classContentText}>Code: {classItem.code}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )}
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default TeacherDashboard;
