import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import BottomSheet from '@gorhom/bottom-sheet';

const { width, height } = Dimensions.get('window');

const ProfessorDetails = ({ route }) => {
  const { professor, onAccept, onRefuse } = route.params;
  const bottomSheetRef = useRef(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleAccept = () => {
    onAccept && onAccept();
    bottomSheetRef.current?.close();
  };

  const handleRefuse = () => {
    onRefuse && onRefuse();
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Icon name="user" size={width * 0.1} type="font-awesome" color="#0A1C7A" />
        <Text style={{ fontSize: width * 0.05, marginTop: height * 0.02 }}>{professor.title}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="envelope" size={20} type="font-awesome" color="#0A1C7A" />
          <Text style={{ marginLeft: 10 }}>{professor.Email}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="map-marker" size={20} type="font-awesome" color="#0A1C7A" />
          <Text style={{ marginLeft: 10 }}>{professor.place}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="phone" size={20} type="font-awesome" color="#0A1C7A" />
          <Text style={{ marginLeft: 10 }}>{professor.Numero}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="birthday-cake" size={20} type="font-awesome" color="#0A1C7A" />
          <Text style={{ marginLeft: 10 }}>{professor.dateofbirth}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="whatsapp" size={20} type="font-awesome" color="#0A1C7A" />
          <Text style={{ marginLeft: 10 }}>{professor.whatsapp}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.responseButton} onPress={showBottomSheet}>
        <Text style={styles.responseButtonText}>Response</Text>
      </TouchableOpacity>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['1%', '20%', '40%']} style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={handleAccept} style={styles.actionButton}>
            <Icon name="check" size={width * 0.07} type="font-awesome" color="green" />
            <Text style={styles.actionText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefuse} style={styles.actionButton}>
            <Icon name="times" size={width * 0.07} type="font-awesome" color="red" />
            <Text style={styles.actionText}>Refuse</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
  },
  centeredContent: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  detailsContainer: {
    marginTop: height * 0.02,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  textInfo: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  responseButton: {
    padding: width * 0.02,
    backgroundColor: '#0A1C7A',
    borderRadius: 5,
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  responseButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  bottomSheet: {
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.03,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: width * 0.04,
    marginTop: height * 0.01,
  },
});

export default ProfessorDetails;
