import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <View style={styles.card}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventInfo}>{item.venue}</Text>
              <Text style={styles.eventInfo}>{item.date}</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventInfo: { fontSize: 13, color: 'gray' },
});