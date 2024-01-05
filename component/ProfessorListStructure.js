import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ProfessorListStructure = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.profIcon}>
            <Icon name="user" size={20} type="font-awesome" color="#0A1C7A" />
          </View>
          <Text style={styles.name}>{data.title}</Text>
        </View>
      
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};

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
  profIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    marginLeft: 5,
    color: '#7f8c8d',
  },
  infoButton: {
    marginLeft: 10,
  },
  separator: {
    height: 2,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});

export default ProfessorListStructure;
