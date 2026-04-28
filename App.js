import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesProvider } from './FavoritesContext'; 
import HomeScreen from './HomeScreen';
import EventDetailScreen from './EventDetailScreen';
import FavoritesScreen from './FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EventPulse' }} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event Details' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'My Favorites' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}