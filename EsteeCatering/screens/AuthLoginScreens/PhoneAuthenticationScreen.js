import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, firebaseConfig } from '../../FirebaseManager';
import { PhoneAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { isFirstTimeUser, setFirstTimeUser } from '../../Utils/storage';

const PhoneAuthScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState(''); // the name of the person ordering
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();

    const sendVerification = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
            console.log('Verification code sent to phone number');
            // Navigate to the EnterVerificationCodeScreen with the verificationId
            navigation.navigate('EnterVerificationCode', { verificationId });
        } catch (error) {
            console.log('Error sending verification code: ', error);
        }
    };

    const [isFirstTime, setIsFirstTime] = useState(false);

    useEffect(() => {
        const checkFirstTimeUser = async () => {
            const firstTime = await isFirstTimeUser();
            setIsFirstTime(firstTime);
        };
        checkFirstTimeUser();
    }, []);

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            
            {isFirstTime ? (
                <>
                    <Text style={styles.label}>Please enter your name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={setName}
                    />
                </>
            ) : (
                <View>
                    <Text style={styles.welcomeText}>Welcome back!</Text>
                </View>
            )}

            <Text style={styles.label}>Please enter your phone number to receive a verification code</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={sendVerification}>
                <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default PhoneAuthScreen;