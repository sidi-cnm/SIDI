import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import Test from '../Screen/test';
import Cours from '../Screen/cour';
import Detaille from '../Screen/detaillpersone';
import NouveauFamille from '../Screen/nouveauFamille';
import Nv from '../Screen/formetest';
import ProfessorsList from '../Screen/ProfessorList';
import ProfessorDetails from '../Screen/ProfessorDetails'
import ConfirmProf from '../Screen/ConfirmProf'
import SelectedProfessorDetails from '../Screen/SelectedProfessorDetails'
import AddProfessor from '../Screen/AddProfessor'
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Login} />
      <Stack.Screen name="IN" component={Test} />
      <Stack.Screen name="cour" component={Cours} />
      <Stack.Screen name="detaille" component={Detaille} />
      <Stack.Screen name="Nouvell" component={NouveauFamille} />
      <Stack.Screen name="Forme" component={Nv} />
      <Stack.Screen name="ProfessorList" component={ProfessorsList} />
      <Stack.Screen name="ProfessorDetails" component={ProfessorDetails} />
      <Stack.Screen name="ConfirmProf" component={ConfirmProf} />
      <Stack.Screen name="SelectedProfessorDetails" component={SelectedProfessorDetails} />
      <Stack.Screen name="AddProfessor" component={AddProfessor} />

    </Stack.Navigator>
  );
}
