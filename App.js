import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';

// Écran d'accueil
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil</Text>
      <Button
        title="Aller à l'écran de détails"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// Écran de détails
function DetailsScreen() {
  const [cocktail, setCocktail] = useState(null);
  const [cocktailName, setCocktailName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      if (data.drinks) {
        setCocktail(data.drinks[0]);
        console.log(data);
      } else {
        setCocktail(null);
        console.log(data);
        alert(data);
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching cocktail data');
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Détails</Text>
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
