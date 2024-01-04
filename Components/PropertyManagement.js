import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PropertyManagement = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [rent, setRent] = useState('');
  const [description, setDescription] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isRentingModalVisible, setRentingModalVisible] = useState(false);
  const [renterName, setRenterName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const addProperty = () => {
    if (location.trim() !== '' && numRooms.trim() !== '' && rent.trim() !== '' && description.trim() !== '') {
      setProperties((prevProperties) => [
        {
          id: Date.now().toString(),
          location,
          numRooms,
          rent,
          description,
        },
        ...prevProperties,
      ]);
      setLocation('');
      setNumRooms('');
      setRent('');
      setDescription('');
    }
  };

  const renderPropertyItem = ({ item }) => (
    <View style={styles.propertyContainer}>
      <Text style={styles.propertyDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => showPropertyDetails(item)}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProperty(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const showPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const showRentModal = () => {
    setRentingModalVisible(true);
  };

  const rentProperty = () => {
    setRentingModalVisible(false);
    setRenterName('');
    setContactEmail('');
    Alert.alert('Success', 'Property rented successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('WelcomeScreen') },
    ]);
  };

  const deleteProperty = (propertyId) => {
    setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
  };

  return (
    <LinearGradient colors={['#f2f2f2', '#e6e6e6']} style={styles.container}>
      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Property Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Rooms"
          value={numRooms}
          onChangeText={(text) => setNumRooms(text)}
          keyboardType="numeric"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Rent"
          value={rent}
          onChangeText={(text) => setRent(text)}
          keyboardType="numeric"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.addButton} onPress={addProperty}>
          <Text style={styles.addButtonText}>Add Property</Text>
        </TouchableOpacity>
      </View>

      {/* Display Section */}
      <View style={styles.displaySection}>
        <FlatList data={properties} keyExtractor={(item) => item.id} renderItem={renderPropertyItem} />
      </View>

      {/* Property Details Modal */}
      <Modal animationType="slide" transparent={false} visible={selectedProperty !== null} onRequestClose={closePropertyDetails}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Property Details</Text>
            <Text style={styles.detailText}>Location: {selectedProperty?.location}</Text>
            <Text style={styles.detailText}>Number of Rooms: {selectedProperty?.numRooms}</Text>
            <Text style={styles.detailText}>Rent: {selectedProperty?.rent}</Text>
            <Text style={styles.detailText}>Description: {selectedProperty?.description}</Text>
            <TouchableOpacity style={styles.rentButton} onPress={showRentModal}>
              <Text style={styles.rentButtonText}>Rent Property</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closePropertyDetails}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Renting Modal */}
      <Modal animationType="slide" transparent={true} visible={isRentingModalVisible} onRequestClose={() => setRentingModalVisible(false)}>
        <View style={styles.fullScreenContainer}>
          <View style={styles.fullScreenModalContent}>
            <Text style={styles.modalTitle}>Rent Property</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Your Name"
              value={renterName}
              onChangeText={(text) => setRenterName(text)}
              placeholderTextColor="#555"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Contact Email"
              value={contactEmail}
              onChangeText={(text) => setContactEmail(text)}
              keyboardType="email-address"
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.rentButton} onPress={rentProperty}>
              <Text style={styles.rentButtonText}>Rent Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputSection: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#009387',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  displaySection: {
    flex: 1,
  },
  propertyContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  propertyDescription: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 17,
  },
  detailsButton: {
    backgroundColor: '#009387',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#009387',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#009387',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    paddingBottom: 8,
  },
  rentButton: {
    backgroundColor: '#009387',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  rentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#95a5a6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenModalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: 'black',
  },
});

export default PropertyManagement;
