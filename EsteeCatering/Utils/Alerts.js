import React from "react";
import { Alert } from "react-native";


// Function to show an alert with a title and message

const confirmDelete = (title, message, onConfirm) => {
    Alert.alert(
        title,
        message,
        [
        {
            text: "Cancel",
            style: "cancel",
        },
        {
            text: "Confirm",
            onPress: onConfirm,
            style: "destructive",
        },
        ],
        { cancelable: true }
    );
    };

export default confirmDelete;