import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueralix</Text>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Chat Type Buttons */}
      <View style={styles.chatTypeContainer}>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>Previous Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatTypeButton}>
          <Text style={styles.chatTypeText}>New Chat</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>Ask something about your health</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="analytics" size={24} color="#87CEEB" />
          <Text style={styles.actionButtonText}>Analyze data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="auto-awesome" size={24} color="#87CEEB" />
          <Text style={styles.actionButtonText}>Surprise me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask something"
          placeholderTextColor="#666"
        />
        <TouchableOpacity>
          <Icon name="mic" size={24} color="#000" />
        </TouchableOpacity>
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
  chatTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  chatTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chatTypeText: {
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

export default ChatScreen; 