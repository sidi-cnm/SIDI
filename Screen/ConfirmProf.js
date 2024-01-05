import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import ProfessorListStructure from '../component/ProfessorListStructure';
import BottomSheet from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';  

const { width, height } = Dimensions.get('window');

const ConfirmProf = ({ navigation }) => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProfessorId, setSelectedProfessorId] = useState(null);

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    fetchProfessors();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProfessors();
    }, [])
  );

  const fetchProfessors = () => {
    axios.get("http://192.168.17.160:3001/professeurs")
      .then((res) => {
        console.log("Data from JSON Server:", res.data);
        setProfessors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleSelectProfessor = (profId) => {
    setSelectedProfessorId(profId);
    bottomSheetRef.current?.expand();
  };

  const handleDeleteProfessor = () => {
    if (selectedProfessorId) {
      axios.delete(`http://192.168.17.160:3001/professeurs/${selectedProfessorId}`)
        .then(() => {
          console.log(`Professor with ID ${selectedProfessorId} deleted successfully`);
          setProfessors(professors.filter(professor => professor.id !== selectedProfessorId));
        })
        .catch((error) => {
          console.error('Error deleting professor:', error);
        })
        .finally(() => {
          bottomSheetRef.current?.close();
        });
    } else {
      Alert.alert("Error", "No professor selected for deletion.");
      bottomSheetRef.current?.close();
    }
  };

  const handleViewInfo = () => {
    if (selectedProfessorId) {
      navigation.navigate('SelectedProfessorDetails', { professorId: selectedProfessorId });
    } else {
      Alert.alert("Error", "No professor selected to view info.");
    }
    bottomSheetRef.current?.close();
  };

  const handleViewRelatedCourses = () => {
    if (selectedProfessorId) {
      navigation.navigate('cour', { id_professeurs: selectedProfessorId });
    } else {
      Alert.alert("Error", "No professor selected to view related courses.");
    }
    bottomSheetRef.current?.close();
  };

  const handleAddProfessor = () => {
    navigation.navigate('AddProfessor');
    bottomSheetRef.current?.close();
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === '') {
      fetchProfessors();
    } else {
      axios.get(`http://192.168.17.160:3001/professeurs?title_like=${text}`)
        .then((res) => {
          console.log("Search results:", res.data);
          setProfessors(res.data);
        })
        .catch((error) => {
          console.error('Error searching professors:', error);
        });
    }
  };

  const renderItem = ({ item }) => (
    <ProfessorListStructure
      data={item}
      onPress={() => handleSelectProfessor(item.id)}
    />
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: width * 0.07, marginTop: height * 0.05, marginRight: width * 0.05 }}>
        Liste des professeurs
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={professors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <BottomSheet style={styles.bottoms} index={0} ref={bottomSheetRef} snapPoints={['1%', '22%']}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.delete} onPress={handleDeleteProfessor}>
            <Icon name="delete" style={styles.btndelete} size={width * 0.1} type="material" color="#0A1C7A" />
            <Text style={styles.textdelete}>Supprimer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleViewInfo} style={styles.info}>
            <Icon name="info" style={styles.btninfo} size={width * 0.1} type="material" color="#0A1C7A" />
            <Text style={styles.textinfo}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleViewRelatedCourses} style={styles.cour}>
            <Icon name="book" style={styles.btncour} size={width * 0.1} type="material" color="#0A1C7A" />
            <Text style={styles.textcour}>Info cour</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <TouchableOpacity onPress={handleAddProfessor} style={styles.addButton}>
        <AntDesign name="pluscircle" size={width * 0.12} color="#0A1C7A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    backgroundColor:'#D7E4EF',
    flex: 1,
    height: height * 0.05,
    fontSize: width * 0.04,
  },
  bottoms: {
    position: 'absolute',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.04,
    backgroundColor: 'white',
  },
  delete: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btndelete: {
    marginLeft: width * 0.02,
    marginTop: height * 0.005,
  },
  textdelete: {
    fontSize: width * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  info: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btninfo: {
    marginLeft: width * 0.03,
    marginTop: height * 0.005,
  },
  textinfo: {
    marginLeft: width * 0.007,
    fontSize: width * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  cour: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btncour: {
    marginLeft: width * 0.03,
    marginTop: height * 0.005,
  },
  textcour: {
    marginLeft: width * 0.007,
    fontSize: width * 0.04,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  addButton: {
    position: 'absolute',
    bottom: height * 0.02,
    right: width * 0.02,
  },
});

export default ConfirmProf;
