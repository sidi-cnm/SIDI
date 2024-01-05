import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const SelectedProfessorDetails = ({ route }) => {
  const { professorId } = route.params;
  const [professorDetails, setProfessorDetails] = useState(null);

  useEffect(() => {
    if (professorId) {
      axios.get(`http://192.168.17.160:3001/professeurs/${professorId}`)
        .then((res) => {
          console.log("Professor Details:", res.data);
          setProfessorDetails(res.data);
        })
        .catch((error) => {
          console.error('Error fetching professor details:', error);
        });
    }
  }, [professorId]);

  if (!professorDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Icon name="user" size={width * 0.2} type="font-awesome" color="#0A1C7A" />
        <Text style={styles.title}>{professorDetails.title}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.infoRow}>
          <Icon name="envelope" size={width * 0.08} type="font-awesome" color="#0A1C7A" />
          <Text style={styles.text}>{professorDetails.Email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="map-marker" size={width * 0.08} type="font-awesome" color="#0A1C7A" />
          <Text style={styles.text}>{professorDetails.place}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={width * 0.08} type="font-awesome" color="#0A1C7A" />
          <Text style={styles.text}>{professorDetails.Numero}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="birthday-cake" size={width * 0.08} type="font-awesome" color="#0A1C7A" />
          <Text style={styles.text}>{professorDetails.dateofbirth}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="whatsapp" size={width * 0.08} type="font-awesome" color="#0A1C7A" />
          <Text style={styles.text}>{professorDetails.whatsapp}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
  },
  centered: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  title: {
    fontSize: width * 0.08,
    marginTop: height * 0.01,
  },
  detailsContainer: {
    marginTop: height * 0.03,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  text: {
    marginLeft: width * 0.05,
    fontSize: width * 0.05,
  },
});

export default SelectedProfessorDetails;
