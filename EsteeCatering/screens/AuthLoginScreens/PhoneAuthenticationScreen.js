import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, firebaseConfig} from '../firebaseConfig';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigation } from 'react-navigation/native';
import { FireBaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { isFirstTimeUser, setFirstTimeUser} from '../../Utils/storage';

const PhoneAuthScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [name, setName] = useState(''); //the name of the person ordering
    const recaptchaVerifier = useRef(null);

   //need to have some variable, that checks if this si the first login time 

    const sendVerification = async () => {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
        setVerificationId(verificationId);
    };

    const confirmCode = async () => {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        await signInWithCredential(auth, credential);
        console.log('Phone authentication successful');
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
        <View>
            <FireBaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            
            {isFirstTime ? (
                <>
                    <Text>Please enter your name</Text>
                    <TextInput
                        placeholder="Name"
                        onChangeText={setName}
                    />
                </>
            ) : (
                <View>
                    <Text>Welcome back!</Text>
                </View>
            )}

            <Text>Please enter your phone number to receive a verification code</Text>
            <TextInput
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <Button title="Send Verification" onPress={sendVerification} />
            <TextInput
                placeholder="Verification Code"
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
            />
            <Button title="Confirm Code" onPress={confirmCode} />

            ..
        </View>
    );
};

export default PhoneAuthScreen;