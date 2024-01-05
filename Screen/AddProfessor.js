import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const AddProfessor = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleAddProfessor = () => {
    if (!title || !place || !email || !numero || !dateOfBirth || !whatsapp) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newProfessor = {
      title,
      place,
      Email: email,
      Numero: numero,
      dateofbirth: dateOfBirth,
      whatsapp,
    };

    axios.post('http://192.168.17.160:3001/professeurs', newProfessor)
      .then(() => {
        Alert.alert("Success", "Professor added successfully!");
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding professor:', error);
        Alert.alert("Error", "Failed to add professor. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={place}
        onChangeText={(text) => setPlace(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={numero}
        onChangeText={(text) => setNumero(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="WhatsApp"
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(text)}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProfessor}>
        <Text style={styles.addButtonText}>Add Professor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.07,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
    borderRadius: 7,
    backgroundColor: "#F1F1F1",
  },
  addButton: {
    backgroundColor: '#0A1C7A',
    padding: width * 0.04,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default AddProfessor;
