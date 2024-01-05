import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Detaille() {
  const [data, setData] = useState([]);
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    axios.get(`http://192.168.17.160:3001/users/?id=${id}`).then((res) => {
      setData(res.data);
      console.log(id);
    });
  }, []);

  const nav = useNavigation();
  const back = () => {
    nav.navigate('IN');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Button
          buttonStyle={styles.backButton}
          titleStyle={styles.backButtonTitle}
          onPress={back}
          title="Back"
        />
      </View>
      <Text style={styles.title}>Détails de Famille</Text>
      {data.map((item) => (
        <View style={styles.detailsContainer} key={item.id}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={width * 0.1} type="font-awesome" color="#0A1C7A" />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={width * 0.05} type="font-awesome" color="#0A1C7A" />
            <Text style={styles.place}>{item.place}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Icon name="envelope" size={width * 0.05} type="font-awesome" color="#0A1C7A" />
            <Text style={styles.email}>{item.Email}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Icon name="phone" size={width * 0.05} type="font-awesome" color="#0A1C7A" />
            <Text style={styles.numero}>{item.Numero}</Text>
          </View>
          <View style={styles.line} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: height * 0.02,
  },
  backButton: {
    backgroundColor: '#0A1C7A',
    borderRadius: 10,
    height: height * 0.04,
    width: width * 0.2,
  },
  backButtonTitle: {
    left: width * 0.01,
    height: height * 0.02,
    top: -3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
    marginLeft: width * 0.1,
  },
  detailsContainer: {},
  iconContainer: {
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  itemTitle: {
    fontSize: width * 0.04,
    marginTop: height * 0.01,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DAD8D8',
    marginBottom: height * 0.03,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  place: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
  },
  email: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
  },
  numero: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
  },
});
