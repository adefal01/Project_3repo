import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';

const API_KEY = 'GjEyGoppMBHIK3djpaWpkWCxb2pISygE';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  function fetchEvents() {
    let classificationName = '';
    if (filter === 'concert') classificationName = '&classificationName=music';
    if (filter === 'sports') classificationName = '&classificationName=sports';

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?latlong=40.0,-75.1&radius=50&unit=miles${classificationName}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        if (json._embedded && json._embedded.events) {
          setEvents(json._embedded.events);
        } else {
          setEvents([]);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterBtn, filter === 'all' && styles.activeBtn]} onPress={() => setFilter('all')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'concert' && styles.activeBtn]} onPress={() => setFilter('concert')}>
          <Text>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'sports' && styles.activeBtn]} onPress={() => setFilter('sports')}>
          <Text>Sports</Text>
        </TouchableOpacity>
      </View>

      <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetail', {
            id: item.id, // Added ID
            title: item.name,
            date: item.dates.start.localDate,
            venue: item._embedded.venues[0].name,
            address: item._embedded.venues[0].address.line1,
          })}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventInfo}>{item._embedded.venues[0].name}</Text>
            <Text style={styles.eventInfo}>{item.dates.start.localDate}</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  filterBtn: { padding: 8, margin: 5, borderWidth: 1, borderColor: 'gray', borderRadius: 8 },
  activeBtn: { backgroundColor: '#cce5ff' },
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventInfo: { fontSize: 13, color: 'gray' },
});