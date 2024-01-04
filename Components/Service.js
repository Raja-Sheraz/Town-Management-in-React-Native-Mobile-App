import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const services = ['Electrician', 'Plumber', 'Carpenter'];

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleDateConfirm = (date) => {
    setDatePickerVisible(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleRequestService = () => {
    try {
      if (selectedService && houseNumber && phoneNumber && selectedDate) {
        // Add logic to send service request to backend or perform necessary actions
        Alert.alert(
          'Service Requested',
          `Your ${selectedService} service request has been submitted. Our team will contact you on ${selectedDate}.`
        );
        // Reset state after a successful request
        setSelectedService(null);
        setHouseNumber('');
        setPhoneNumber('');
        setSelectedDate(new Date());
      } else {
        Alert.alert('Incomplete Information', 'Please fill in all the details before submitting.');
      }
    } catch (error) {
      console.error('Error handling service request:', error);
      Alert.alert('Error', 'An error occurred while processing your request. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Select a Service</Text>
      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service}
            style={[
              styles.serviceButton,
              selectedService === service && styles.selectedServiceButton,
            ]}
            onPress={() => handleServiceSelection(service)}>
            <Text
              style={[
                styles.serviceButtonText,
                selectedService === service && styles.selectedServiceButtonText,
              ]}>
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedService && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeading}>Service Details</Text>
          <Text style={styles.detailsText}>{`Selected Service: ${selectedService}`}</Text>

          <Text style={styles.detailsHeading}>Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="House Number"
            value={houseNumber}
            onChangeText={setHouseNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.detailsHeading}>Select Date and Time</Text>
          <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
            <Ionicons name="calendar-outline" size={24} color="#fff" />
            <Text style={styles.dateTimeButtonText}>Select Date and Time</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity style={styles.requestButton} onPress={handleRequestService}>
            <Text style={styles.requestButtonText}>Request Service</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceButton: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    flexBasis: '48%',
  },
  selectedServiceButton: {
    backgroundColor: '#009387',
  },
  serviceButtonText: {
    textAlign: 'center',
    color: '#000',
  },
  selectedServiceButtonText: {
    color: '#fff',
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#009387',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
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
  },
  dateTimeButton: {
    backgroundColor: '#009387',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateTimeButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: '#009387',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Service;
