import { View, Text, Button, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';

export default function EventDetailScreen({route}) {
  const {id, title, date, venue, address} = route.params;
  const {addFavorite, favorites} = useFavorites();

  const isSaved = favorites.some(fav => fav.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>Date: {date}</Text>
      <Text style={styles.info}>Venue: {venue}</Text>
      <Text style={styles.info}>Address: {address}</Text>
      <Text style={styles.saved}>{isSaved ? 'Saved to Favorites!' : ''}</Text>
      <Button 
        title={isSaved ? 'Saved' : 'Save to Favorites'} 
        onPress={() => addFavorite({id, title, date, venue, address})} 
        disabled={isSaved} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  info: { fontSize: 16, marginBottom: 8, color: '#333' },
  saved: { color: 'green', marginBottom: 10 },
});