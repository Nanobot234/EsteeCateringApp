import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 1, // Adds a subtle shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  largeInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top'
  },
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center',
  },
  gridText: {
    fontSize: 14,
  },
  closeButton: {
    //backgroundColor: '#007bff',
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    color: 'red',
    fontSize: 16,
  },
  name: {
    fontSize: 18, // Increase font size
    fontWeight: 'bold',
    marginBottom: 8, // Increase spacing between text elements
  },
  price: {
    fontSize: 16, // Increase font size
    color: '#888',
    marginBottom: 8, // Increase spacing between text elements
  },
  quantity: {
    fontSize: 16, // Increase font size
    color: '#333',
    marginBottom: 8, // Increase spacing between text elements
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
     // This ensures the modal covers the entire screen
    justifyContent: 'flex-end', // Align the modal at the bottom
  },

});

export default styles;

  // <KeyboardAvoidingView
  //       style={styles.modalContainer}
  //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //     ></KeyboardAvoidingView>