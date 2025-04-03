import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = (props) => {
  const chatItems = [
    { title: 'How deep was my sleep', category: 'chats' },
    { title: 'React Native GitHub Integration', category: 'chats' },
    { title: 'Spacing Adjustment Request', category: 'chats' },
    { title: 'HealthConnect React Native Integration', category: 'chats' },
    { title: 'High Blood Pressure Workouts', category: 'chats' },
    { title: 'Ugandan Visa- Free Destinations', category: 'chats' },
    { title: 'Crop photo on Mac', category: 'chats' },
    { title: 'UI Cards Alternatives', category: 'chats' },
  ];

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
        <Icon name="edit" size={20} color="#666" />
      </View>

      {/* Categories */}
      <ScrollView style={styles.content}>
        {/* Chats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="chat-bubble-outline" size={24} color="#666" />
            <Text style={styles.sectionTitle}>Chats</Text>
          </View>
        </View>

        {/* Today Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="today" size={24} color="#666" />
            <Text style={styles.sectionTitle}>Today</Text>
          </View>
        </View>

        {/* Last Week Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Last week</Text>
            <Icon name="add" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Google Health API Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="health-and-safety" size={24} color="#666" />
            <Text style={styles.sectionTitle}>Google Health Api</Text>
          </View>
        </View>

        {/* Chats List */}
        <View style={styles.chatsList}>
          <Text style={styles.subsectionTitle}>Chats</Text>
          {chatItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chatItem}
              onPress={() => props.navigation.navigate('Chat', { title: item.title })}
            >
              <Text style={styles.chatItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 16,
    alignSelf: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 16,
    padding: 8,
    borderRadius: 24,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#000',
  },
  chatsList: {
    paddingHorizontal: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  chatItem: {
    paddingVertical: 12,
  },
  chatItemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomDrawer; 