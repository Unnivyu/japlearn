    import React, { useState } from 'react';
    import { TouchableOpacity, View, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView, Modal, Text, Image } from 'react-native';
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth } from 'firebase/auth';
    import { styles } from './styles';
    import Logo from '../../assets/jpLogo.svg'
    import CustomButton from '../../components/CustomButton';
    import Signup from './Signup';
    
    const Login = ({navigation}) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);
        const [modalMessage, setModalMessage] = useState('');

        const Signup = () => {
        };

        const handleLogin = async () => {
        };
        
        

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View>

                    
                    <View style={styles.imageContainer}>
                        <Logo width={200} height={200} />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder='Email'
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        placeholder='Password'
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <>
                                <CustomButton title="Login" onPress={handleLogin} style={styles.button} textStyle={styles.buttonText}/>
                            </>
                        )}
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text>
                            <TouchableOpacity onPress={Signup}>
                                <Text style={styles.linkText}>Create account?</Text>
                            </TouchableOpacity>
                        </Text>
                
                        
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text>{modalMessage}</Text>
                        <Button

                            title="Close"
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        );

    };

    export default Login;

    

