import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('https://sidi-cnm.github.io/FrontApi/utilisateur.json')
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const Navigation = useNavigation();
  const naviger = () => {
    Navigation.navigate('IN');
  };

  const showErrorAlert = () => {
    setIsErrorModalVisible(true);
  };

  const closeErrorAlert = () => {
    setIsErrorModalVisible(false);
  };

  const Log = () => {
    const connecter = data.find((item) => item.Numero_de_telephone == name && item.Psswd === email);

    if (connecter) {
      if (connecter.etudiant) {
        console.log('etudiant');
      } else if (connecter.prof) {
        Navigation.navigate('IN');
      } else if (connecter.famille) {
        console.log('famille');
      }
    } else {
      showErrorAlert();
      setEmail('');
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={windowWidth * 0.2} color="blue" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(parseInt(text, 10))}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={email}
        onChangeText={(text) => setEmail(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={Log} style={styles.button}>
        <Text style={styles.buttonText}>Soumettre</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <Text onPress={naviger} style={styles.link}>
          S'inscrire
        </Text>
        <Text style={styles.link}>Mot de passe oublié</Text>
      </View>

      <TouchableOpacity
        style={styles.contactsButton}
      >
        <Icon name="phone" size={windowWidth * 0.1} color="blue" style={styles.contactsIcon} />
        <Text style={styles.contactsText}>Contacts</Text>
      </TouchableOpacity>

      <Modal isVisible={isErrorModalVisible}>
        <View style={styles.errorModalContainer}>
          <Text style={styles.errorModalText}>Erreur : Vos informations incorrectes.</Text>
          <TouchableOpacity onPress={closeErrorAlert}>
            <Text style={styles.closeButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '5%',
    paddingTop: '20%',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 0,
    marginBottom: -6,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
  },
  input: {
    height: windowHeight * 0.07,
    margin: 0,
    borderColor: '#c5c5c5',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: windowHeight * 0.06 * 0.5,
    marginVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.03,
    paddingRight: windowWidth * 0.15,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: windowWidth * 0.01, height: windowHeight * 0.005 },
    shadowOpacity: 0.9,
    shadowRadius: windowWidth * 0.05,
    elevation: 5,
    paddingHorizontal:10
  },
  button: {
    backgroundColor: 'blue',
    margin: windowHeight * 0.005,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowHeight * 0.04,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.015,
    padding: '5%',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    paddingTop: windowHeight * 0.02,
  },
  contactsButton: {
    backgroundColor: 'white',
    borderRadius: windowHeight * 0.02,
    height: windowHeight * 0.09,
    borderColor: '#c5c5c5',
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.25,
    marginTop: windowHeight * 0.07,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactsIcon: {
    marginTop: windowHeight * 0.005,
  
  },
  contactsText: {
    padding: windowHeight * 0.02,
    fontSize: windowHeight * 0.02,
    color: 'black',
    
  },
  errorModalContainer: {
    backgroundColor: 'white',
    padding: windowHeight * 0.03,
    borderRadius: windowHeight * 0.02,
  },
  errorModalText: {
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    color: 'red',
  },
  closeButton: {
    color: 'blue',
    marginTop: windowHeight * 0.02,
    textAlign: 'center',
  },
});
