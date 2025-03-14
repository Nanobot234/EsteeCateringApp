import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../FirebaseManager';

const EnterVerificationCodeScreen = ({ route, navigation }) => {
    const { verificationId } = route.params;
    const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));

    const handleChange = (text, index) => {
        const newCode = [...verificationCode];
        newCode[index] = text;
        setVerificationCode(newCode);
    };

    const confirmCode = async () => {
        try {
            const code = verificationCode.join('');
            const credential = PhoneAuthProvider.credential(verificationId, code);
            await signInWithCredential(auth, credential);
            console.log('Phone authentication successful');
            // Navigate to the next screen or home screen after successful authentication
           // navigation.navigate('VendorItems'); //Continue hereeeeee
        } catch (error) {
            console.log('Error confirming code: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>Please enter the verification code sent to your phone</Text>
            <View style={styles.codeContainer}>
                {verificationCode.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.codeInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => handleChange(text, index)}
                        value={digit}
                    />
                ))}
            </View>
            <Button title="Confirm Code" onPress={confirmCode} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    codeInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default EnterVerificationCodeScreen;