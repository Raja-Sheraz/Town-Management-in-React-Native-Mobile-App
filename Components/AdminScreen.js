// AdminScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import db from './Database';

const AdminScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState('');
  const [registrations, setRegistrations] = useState([]);

  const loadAnnouncements = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS announcements (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL);'
      );
      tx.executeSql('SELECT * FROM announcements;', [], (_, results) => {
        setAnnouncements(results.rows.raw());
      });
    });
  };

  const handleAddAnnouncement = () => {
    if (announcementText.trim() !== '') {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO announcements (text) VALUES (?);',
          [announcementText],
          (_, results) => {
            if (results.rowsAffected > 0) {
              alert('Announcement added successfully');
              setAnnouncementText('');
              loadAnnouncements();
            } else {
              alert('Failed to add announcement');
            }
          },
          (error) => {
            console.error('Error adding announcement:', error);
          }
        );
      });
    } else {
      alert('Please enter announcement text');
    }
  };

  const loadRegistrations = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS registrations (id INTEGER PRIMARY KEY AUTOINCREMENT, event_id INTEGER NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL);'
      );
      tx.executeSql('SELECT * FROM registrations;', [], (_, results) => {
        setRegistrations(results.rows.raw());
      });
    });
  };

  useEffect(() => {
    loadAnnouncements();
    loadRegistrations();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#009387', '#004d91']} style={styles.headerContainer}>
        <Text style={styles.header}>Town Management Admin</Text>
      </LinearGradient>
      <View style={styles.contentContainer}>
        {/* Announcements Section */}
        {/* Display of announcements removed */}
        {/* <Text style={styles.heading}>Announcements</Text>
        <FlatList
          data={announcements}
          keyExtractor={(item) => `announcement-${item.id}`} // Use a unique key for announcements
          renderItem={({ item }) => (
            <View style={styles.announcementItem}>
              <Text>{item.text}</Text>
            </View>
          )}
        /> */}
        {/* Add Announcement Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Announcement"
          value={announcementText}
          onChangeText={(text) => setAnnouncementText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddAnnouncement}>
          <Text style={styles.addButtonText}>Add Announcement</Text>
        </TouchableOpacity>

        {/* Registrations Section */}
        <Text style={styles.heading}>Registrations</Text>
        <FlatList
          data={registrations}
          keyExtractor={(item) => `registration-${item.id}`} // Use a unique key for registrations
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.registrationItem,
                { backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' },
              ]}
            >
              <Text style={styles.registrationText}>{`Event ID: ${item.event_id}`}</Text>
              <Text style={styles.registrationText}>{`Name: ${item.name}`}</Text>
              <Text style={styles.registrationText}>{`Email: ${item.email}`}</Text>
              <Text style={styles.registrationText}>{`Phone: ${item.phone}`}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#009387',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    width: '100%',
    minHeight: 100,
  },
  addButton: {
    backgroundColor: '#08d4c4',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  announcementItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  registrationItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
  },
  registrationText: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default AdminScreen;
