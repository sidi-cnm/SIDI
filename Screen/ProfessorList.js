import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import ProfessorDetails from './ProfessorDetails';
import ProfessorListComponent from '../component/ProfessorListComponent';

const { width, height } = Dimensions.get('window');

const ProfessorList = ({ navigation }) => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (professors.length === 0) {
      const initialProfessors = [
        { id: 1, title: 'Professor 1', Email: 'prof1@example.com', place: 'Place 1', Numero: '1234567890', dateofbirth: '12-02-2003', whatsapp: '31453435' },
        { id: 2, title: 'Professor 2', Email: 'prof2@example.com', place: 'Place 2', Numero: '9876543210', dateofbirth: '12-02-2003', whatsapp: '31453435' },
        
      ];

      setProfessors(initialProfessors);
      setLoading(false);
    }
  }, [professors]);

  const handleAccept = useCallback(async (professorId) => {
    try {
      const professorToAccept = professors.find((prof) => prof.id === professorId);
      console.log('Professor to accept:', professorToAccept);
      await axios.post('http://192.168.17.160:3001/professeurs', professorToAccept);
      console.log('Professors before update:', professors);
      setProfessors((prevProfessors) => {
        const updatedProfessors = prevProfessors.filter((prof) => prof.id !== professorId);
        console.log('Updated professors:', updatedProfessors);

        return updatedProfessors;
      });

      console.log(`Professor ${professorId} accepted`);
    } catch (error) {
      console.error('Error accepting professor:', error.message);
    }
  }, [professors]);

  const handleRefuse = useCallback((professorId) => {
    console.log(`Professor ${professorId} refused`);
    setProfessors((prevProfessors) => prevProfessors.filter((prof) => prof.id !== professorId));
  }, []);
  

  const renderItem = ({ item }) => (
    <ProfessorListComponent
      data={item}
      onPress={() => {
        navigation.navigate('ProfessorDetails', { professor: item, onAccept: () => handleAccept(item.id), onRefuse: () => handleRefuse(item.id) });
      }}
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
      <Text style={styles.title}>Nouveaux Professeurs</Text>
      <FlatList data={professors} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.1,
    marginTop: height * 0.1,
    marginRight: width * 0.15,
  },
});

export default ProfessorList;
