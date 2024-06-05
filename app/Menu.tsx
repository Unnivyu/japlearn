import { SafeAreaView, StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useContext }  from 'react';
import { useRouter } from 'expo-router';
import styles from '../styles/stylesMenu';
import Profile from '../assets/svg/user_pf.svg';
import Complete from '../assets/svg/completed_level.svg';
import Locked from '../assets/svg/locked_level.svg';
import { AuthContext } from '../context/AuthContext';

const levels = [
    { id: '1', title: 'Kana Intro', completed: true },
    { id: '2', title: 'Kana Basics I', completed: false },
    { id: '3', title: 'Kana Basics II', completed: false },
    { id: '4', title: 'Kana Basics II', completed: false },
    { id: '5', title: 'Kana Basics II', completed: false },
    { id: '6', title: 'Kana Basics II', completed: false },
];

const LevelButton = ({ title, completed }) => {
    return (
        <Pressable>
            {completed ? (
                <Complete height={100} />
            ) : (
                <Locked height={100} />
            )}
            <Text style={styles.menuText}>{title}</Text>
        </Pressable>
    );
};

const Menu = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const renderItem = ({ item }) => (
        <View style={styles.levelContainer}>
            <LevelButton title={item.title} completed={item.completed} />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.header, { padding: 20 }]}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.hText}>Welcome Back</Text>
                        <Text style={styles.hText}>{user?.fname}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Pressable onPress={() => router.push('/Profile')}>
                            <Profile width={65} height={65} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Section 1</Text>
                    <FlatList
                        data={levels}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContainer}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Menu;