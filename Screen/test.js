import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import axios from 'axios';
import BottomSheet from '@gorhom/bottom-sheet';
import FmComponent from '../component/famille-component';
import { Button } from 'react-native-elements';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Test() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [change, setIschange] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [ajouter, setAjouter] = useState({
    title: '',
    place: '',
    Email: '',
    Numero: null,
    Id_infant: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const Navigation = useNavigation();

  useEffect(() => {
    axios
      .get('http://192.168.17.160:3001/users/')
      .then((res) => {
        console.log('Data from API:', res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [change]);

  const snapPoints = useMemo(() => ['1%', '22%'], []);
  const refBottomSheet = useRef(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    refBottomSheet.current?.expand();
  };

  const handleAdd = () => {
    if (ajouter.title === '') {
      console.log('Saisi des données ici');
    } else {
      axios.post('http://192.168.17.160:3001/users', ajouter);
      setIschange(!change);
      setShowForm(false);
      setAjouter({ title: '' });
    }
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      axios
        .delete(`http://192.168.17.160:3001/users/${selectedUserId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('User with ID', selectedUserId, 'has been deleted');
            const newData = data.filter((item) => item.ID !== selectedUserId);
            setIschange(!change);
          } else {
            console.error('Failed to delete user. API response:', response);
          }
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        })
        .finally(() => {
          refBottomSheet.current?.close();
        });
    } else {
      console.warn('No user selected for deletion');
      refBottomSheet.current?.close();
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseform = () => {
    setShowForm(false);
  };

  const handleInfo = () => {
    Navigation.navigate('detaille', { id: selectedUserId });
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = data.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));

    if (text.trim() === '') {
      setIschange(!change);
    } else {
      setData(filteredData);
    }
  };

  const renderItem = ({ item }) => (
    <FmComponent data={item} onPress={() => handleSelectUser(item.id)} />
  );

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handlecour = () => {
    Navigation.navigate('cour', { id: selectedUserId });
  };

  const handleNouvell = () => {
    Navigation.navigate('Nouvell');
  };

  const handleProfessorsList = () => {
    Navigation.navigate('ProfessorList');
  };
  const handleConfirmProf = () => {
    Navigation.navigate('ConfirmProf');
  };
  const handleConfirmProfdetails = () => {
    Navigation.navigate('Confirmprofdetails');
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.heading}>Liste des familles</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Nouveau"
            onPress={handleNouvell}
            buttonStyle={styles.buttonStyle}
          />
          <Button
            title="NouveauxProf"
            onPress={handleProfessorsList}
            buttonStyle={styles.buttonStyle}
          />
          <Button
            title="AncienProf"
            onPress={handleConfirmProf}
            buttonStyle={styles.buttonStyle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Button title="+" onPress={handleShowForm} buttonStyle={styles.addButton} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>

        {showForm && (
          <View style={styles.overlay}>
            <View style={styles.formulaire}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseform}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.formTitle}>Add users</Text>
              <TextInput
                value={ajouter.name}
                onChangeText={(text) => setAjouter({ ...ajouter, title: text })}
                placeholder="title"
                style={styles.inputadd}
              />

              <TextInput
                value={ajouter.place}
                onChangeText={(text) => setAjouter({ ...ajouter, place: text })}
                placeholder="place"
                style={styles.inputplace}
              />

              <TextInput
                value={ajouter.Email}
                onChangeText={(text) => setAjouter({ ...ajouter, Email: text })}
                placeholder="Email"
                style={styles.inputemail}
              />

              <TextInput
                value={ajouter.Numero}
                onChangeText={(text) => setAjouter({ ...ajouter, Numero: text })}
                placeholder="Numero"
                style={styles.inputNumero}
              />
              <View style={styles.btnsubmit}>
                <Button title="Submit" onPress={handleAdd} buttonStyle={styles.submitButton} />
              </View>
            </View>
          </View>
        )}

        <ScrollView>
          {data.map((item) => (
            <FmComponent key={item.id} data={item} onPress={() => handleSelectUser(item.id)} />
          ))}
        </ScrollView>

        <BottomSheet style={styles.bottoms} index={0} ref={refBottomSheet} snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Icon name="delete" style={styles.btndelete} size={35} type="material" color="#0A1C7A" />
              <Text style={styles.textdelete}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleInfo} style={styles.infoButton}>
              <Icon name="info" style={styles.btninfo} size={35} type="material" color="#0A1C7A" />
              <Text style={styles.textinfo}>Info pers</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlecour} style={styles.courButton}>
              <Icon name="info" style={styles.btncour} size={35} type="material" color="#0A1C7A" />
              <Text style={styles.textcour}>Info cour</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
  heading: {
    fontSize: 28,
    marginTop: 0.05 * windowHeight,
    marginRight: 0.1 * windowWidth,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0.014 * windowHeight,
    marginLeft: 0.001 * windowWidth,
    marginRight: 0.001 * windowWidth,
  },
  buttonStyle: {
    backgroundColor: '#0A1C7A',
    borderRadius: 9,
    paddingVertical: 0.01 * windowHeight,
    paddingHorizontal: 0.05 * windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0.002 * windowWidth,
    marginRight: 0.002 * windowWidth,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginRight:10,
    marginTop:20
  },
  addButton: {
    backgroundColor: '#0A1C7A',
    width: 0.13 * windowWidth,
    height: 0.05 * windowHeight,
    borderRadius: 10,
  },
  input: {
    backgroundColor:'#D7E4EF',
    flex: 1,
    height: windowHeight * 0.05,
    fontSize: windowWidth* 0.04,
    marginLeft : 4
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  formulaire: {
    position:"absolute",
    backgroundColor:"white",
    borderRadius:20,
    top:120,
    left: 40,
    height:450,
    width:300,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 250,
  },
  closeButtonText: {
    fontSize: 30,
    color: 'red',
  },
  formTitle: {
    color:"black" , position:"absolute", left:95, fontSize:29,fontWeight:"bold" , bottom:390
  },
  inputadd: {
    position:"absolute",
    top:80,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inputplace: {
    position:"absolute",
    top:140,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inputemail: {
    position:"absolute",
    top:200,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inputNumero: {
    position:"absolute",
    top:260,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  btnsubmit: {
    width:"auto",
    top:350
  },
  submitButton: {
    color:"black" , left:4, width:290 , height:45 , borderRadius:10 
  },
  bottoms: {
    position: 'absolute',
  },
  deleteButton: {
    padding: windowWidth * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btndelete: {
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.005,
  },
  textdelete: {
    fontSize: windowWidth * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  infoButton: {
    padding: windowWidth * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btninfo: {
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.005,
  },
  textinfo: {
    fontSize: windowWidth * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  courButton: {
    padding: windowWidth * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btncour: {
    marginLeft: windowWidth * 0.02,
    marginTop: windowHeight * 0.005,
  },
  textcour: {
    fontSize: windowWidth * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
