import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert as RNAlert } from 'react-native';

const Complaints = () => {
  const [complaintText, setComplaintText] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [showComplaints, setShowComplaints] = useState(false);

  const handleComplaintSubmission = () => {
    try {
      if (complaintText) {
        setComplaints([...complaints, complaintText]);
        setComplaintText('');

        // Show an alert for successful complaint submission
        RNAlert.alert('Complaint Submitted', 'Your complaint has been submitted successfully.');
      } else {
        RNAlert.alert('Incomplete Information', 'Please enter your complaint before submitting.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      RNAlert.alert('Error', 'An error occurred while submitting your complaint. Please try again.');
    }
  };

  const renderComplaints = ({ item, index }) => (
    <View style={[styles.complaintItem, index % 2 === 0 ? styles.evenItem : styles.oddItem]}>
      <Text style={styles.complaintText}>{item}</Text>
    </View>
  );

  const handleViewComplaints = () => {
    setShowComplaints(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submit a Complaint</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your complaint here"
        multiline
        numberOfLines={5}
        value={complaintText}
        onChangeText={setComplaintText}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleComplaintSubmission}>
        <Text style={styles.submitButtonText}>Submit Complaint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewButton} onPress={handleViewComplaints}>
        <Text style={styles.viewButtonText}>View Complaints</Text>
      </TouchableOpacity>

      {showComplaints && (
        <View style={styles.complaintsContainer}>
          <Text style={styles.complaintsHeading}>Your Complaints</Text>
          <FlatList
            data={complaints}
            renderItem={renderComplaints}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#009387',
  },
  input: {
    borderWidth: 1,
    borderColor: '#009387',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#009387',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#009387',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  viewButton: {
    backgroundColor: '#004080',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  complaintsContainer: {
    marginTop: 16,
  },
  complaintsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#009387',
  },
  complaintItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  evenItem: {
    backgroundColor: '#e0e0e0',
  },
  oddItem: {
    backgroundColor: '#e0e0e0',
  },
  complaintText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Complaints;