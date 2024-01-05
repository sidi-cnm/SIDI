import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function ProfessorListComponent({ data, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.proficon}>
            <Icon name="user" size={20} type="font-awesome" color="#0A1C7A" />
          </View>
          <Text style={styles.nom}>{data.title}</Text>
        </View>
        <TouchableOpacity style={styles.info} onPress={onPress}>
          <Icon name="info" size={20} type="material" color="#0A1C7A" />
        </TouchableOpacity>
      </View>
      {/* Separator */}
      <View style={styles.separator} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderColor: 'none',
    borderWidth: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  proficon: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  nom: {
    fontSize: 16,
    marginLeft: 5,
    color: '#7f8c8d',
  },
  info: {
    marginLeft: 10,
  },
  separator: {
    height: 2,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});
