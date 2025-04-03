import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={80} color="#666" />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Icon name="person-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="notifications-none" size={24} color="#666" />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="security" size={24} color="#666" />
            <Text style={styles.optionText}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="help-outline" size={24} color="#666" />
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    marginTop: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
});

export default ProfileScreen; 