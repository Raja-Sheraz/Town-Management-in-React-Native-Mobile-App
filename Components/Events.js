// Events.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import db from './Database';

const Events = () => {
  const [eventsData, setEventsData] = useState([
    {
      id: '1',
      title: 'Community Gathering',
      description: 'Join us for a community gathering at the town square.',
      date: '2023-03-15',
      time: '18:00',
    },
    {
      id: '2',
      title: 'Town Cleanup Day',
      description: 'Help keep our town clean! Join the cleanup event.',
      date: '2023-03-22',
      time: '09:00',
    },
    // Add more events as needed
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationModalVisible, setRegistrationModalVisible] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleEventRegistration = (event) => {
    setSelectedEvent(event);
    setRegistrationModalVisible(true);
  };

  const handleRegistrationSubmit = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO registrations (event_id, name, email, phone) VALUES (?, ?, ?, ?);',
        [selectedEvent.id, registrationData.name, registrationData.email, registrationData.phone],
        (_, results) => {
          if (results.rowsAffected > 0) {
            alert('Registration submitted successfully');
            setRegistrationData({ name: '', email: '', phone: '' });
            setRegistrationModalVisible(false);
          } else {
            alert('Failed to submit registration');
          }
        },
        (error) => {
          console.error('Error submitting registration:', error);
        }
      );
    });
  };

  const renderEventItem = ({ item }) => (
    <View style={[styles.eventItem, { backgroundColor: '#e0e0e0' }]}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDateTime}>{`${item.date} at ${item.time}`}</Text>
      <TouchableOpacity
        style={[styles.registerButton, { backgroundColor: '#009387' }]}
        onPress={() => handleEventRegistration(item)}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={registrationModalVisible}
        onRequestClose={() => setRegistrationModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Event Registration</Text>
            <Text style={styles.modalEventTitle}>{selectedEvent?.title}</Text>

            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={registrationData.name}
              onChangeText={(text) => setRegistrationData({ ...registrationData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={registrationData.email}
              onChangeText={(text) => setRegistrationData({ ...registrationData, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Your Phone Number"
              value={registrationData.phone}
              onChangeText={(text) => setRegistrationData({ ...registrationData, phone: text })}
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit Registration" onPress={handleRegistrationSubmit} color="#009387" />
              <Button
                title="Close"
                onPress={() => {
                  setRegistrationModalVisible(false);
                  setSelectedEvent(null);
                }}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    width: 250,
    height: 40,
    margin: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#009387',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009387',
  },
  eventItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  eventDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#009387',
  },
  modalEventTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default Events;
