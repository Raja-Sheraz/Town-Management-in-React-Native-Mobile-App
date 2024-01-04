import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import db from './Database';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM announcements ORDER BY startDate DESC;',
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setAnnouncements(rows);
        },
        (error) => {
          console.error('Error fetching announcements:', error);
        }
      );
    });
  }, []);

  const renderAnnouncementItem = ({ item }) => (
    <LinearGradient
      colors={['#009387', '#009387']}
      style={styles.announcementItem}
    >
      <Text style={styles.announcementTitle}>{item.text}</Text>
      <Text style={styles.dateText}>Start Date: {item.startDate}</Text>
      <Text style={styles.dateText}>End Date: {item.endDate}</Text>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnnouncementItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  announcementItem: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    borderColor: '#009387', // Added border color
    borderWidth: 1, // Added border width
  },
  announcementTitle: {
    fontWeight: 'bold',
    fontSize: 20, // Increased font size
    marginBottom: 8,
    color: 'white',
  },
  dateText: {
    color: 'white',
    fontSize: 16, // Increased font size
  },
});

export default Announcements;
