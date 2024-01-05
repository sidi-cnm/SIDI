import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import CrComponent from '../component/cours-component';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Cours() {
  const route = useRoute();
  const { id_professeurs, id } = route.params;

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    heur: '',
    dater: '',
    Nbrseance: null,
    Status: '',
  });

  useEffect(() => {
    if (id_professeurs) {
      axios
        .get(`http://192.168.17.160:3001/cours/?id_professeur=${id_professeurs}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error('Erreur de requête:', error);
        });
    } else if (id) {
      axios
        .get(`http://192.168.17.160:3001/cours/?id_prenant=${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error('Erreur de requête:', error);
        });
    }
  }, [id_professeurs, id]);

  const handleEdit = (item) => {
    console.log(item.name);
    setFormData({
      ...formData,
      heur: item.heur,
      dater: item.dater,
      Nbrseance: item.Nbrseance.toString(),
      Status: item.Status,
    });
    setShowForm(true);
  };

  const renderItem = ({ item }) => {
    return <CrComponent data={item} handleDelete={() => handleEdit(item)} />;
  };

  const nav = useNavigation();
  const back = () => {
    nav.navigate('IN');
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={{
          backgroundColor: '#0A1C7A',
          borderRadius: 10,
          left:296,
          height:windowHeight*0.05,
          width:windowWidth*0.2}} 
          titleStyle={{
             left:3,
             height:20,
             top:-3
        }}
        onPress={back}
        title="back"
      />
      <Text style={{ top: -windowHeight * 0.038, left: -windowWidth * 0.4, fontSize: windowHeight * 0.029, fontWeight: 'bold' }}>
        Cours
      </Text>
      <TextInput placeholder="name" style={styles.inpt} />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} style={styles.flat} />

      {showForm && (
        <View style={styles.formulaire}>
          <TextInput
            placeholder="name"
            value={formData.heur}
            onChangeText={(text) => setFormData({ ...formData, heur: text })}
            style={styles.inp1}
          />

          <TextInput
            placeholder="name"
            value={formData.dater}
            onChangeText={(text) => setFormData({ ...formData, dater: text })}
            style={styles.inp2}
          />

          <TextInput
            placeholder="name"
            value={formData.Nbrseance}
            onChangeText={(text) => setFormData({ ...formData, Nbrseance: text })}
            style={styles.inp3}
          />

          <TextInput
            placeholder="name"
            value={formData.Status}
            onChangeText={(text) => setFormData({ ...formData, Status: text })}
            style={styles.inp4}
          />

          <View style={styles.btnsubmit}>
            <Button
              title="Submit"
              buttonStyle={{ color: 'black', left: 4, top: -1, width: windowWidth * 0.8, height: windowHeight * 0.05, borderRadius: 10 }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginTop: windowHeight * 0.1,
  },

  flat: {
    display: 'flex',
    height: '100%',
  },

  inpt: {
    backgroundColor: 'grey',
    width: windowWidth * 0.9,
    left: windowWidth * 0.06,
    height: windowHeight * 0.06,
    borderRadius:15,
    paddingRight: windowWidth * 0.15,
    paddingTop: -windowHeight * 0.015,
    top: -windowHeight * 0.015,
    paddingHorizontal:6
  },
  formulaire: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: windowHeight * 0.05,
    top: windowHeight * 0.12,
    left: windowWidth * 0.1,
    height: windowHeight * 0.45,
    width: windowWidth * 0.8,
    zIndex: 1,
  },
  inp1: {
    top: windowHeight * 0.07,
    left: windowWidth * 0.05,
    paddingRight: windowWidth * 0.09,
    backgroundColor: '#F1F1F1',
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: windowHeight * 0.1,
  },

  inp2: {
    position: 'absolute',
    top: windowHeight * 0.14,
    left: windowWidth * 0.05,
    paddingRight: windowWidth * 0.09,
    backgroundColor: '#F1F1F1',
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: windowHeight * 0.1,
    
    
  },
  inp3: {
    position: 'absolute',
    top: windowHeight * 0.21,
    left: windowWidth * 0.05,
    paddingRight: windowWidth * 0.09,
    backgroundColor: '#F1F1F1',
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: windowHeight * 0.1,
  },
  inp4: {
    position: 'absolute',
    top: windowHeight * 0.28,
    left: windowWidth * 0.05,
    paddingRight: windowWidth * 0.09,
    backgroundColor: '#F1F1F1',
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: windowHeight * 0.1,
  },
  btnsubmit: {
    width: 'auto',
    height: 'auto',
    top: windowHeight * 0.3,
  },
});
