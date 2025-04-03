import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InsightsScreen = ({ navigation }) => {
  const healthMetrics = [
    { icon: 'favorite', title: 'Heart Rate', value: '72 bpm', trend: 'up', change: '+3 from last week' },
    { icon: 'directions-walk', title: 'Daily Steps', value: '8,547', trend: 'down', change: '-1,203 from yesterday' },
    { icon: 'nightlight', title: 'Sleep', value: '7h 23m', trend: 'up', change: '+45m from average' },
    { icon: 'local-fire-department', title: 'Calories', value: '1,850', trend: 'neutral', change: 'On track' },
  ];

  const weeklyActivities = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 30 },
    { day: 'Sun', value: 60 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insights</Text>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Today's Summary</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map((metric, index) => (
              <View key={index} style={styles.metricItem}>
                <Icon name={metric.icon} size={24} color="#87CEEB" />
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <View style={styles.trendContainer}>
                  <Icon 
                    name={`trending-${metric.trend}`} 
                    size={16} 
                    color={metric.trend === 'up' ? '#4CAF50' : metric.trend === 'down' ? '#F44336' : '#666'} 
                  />
                  <Text style={styles.trendText}>{metric.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyActivities.map((day, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={[styles.bar, { height: day.value }]} />
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="assessment" size={24} color="#fff" />
            <Text style={styles.actionText}>Detailed Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={24} color="#fff" />
            <Text style={styles.actionText}>Share Insights</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingTop: 20,
  },
  chartColumn: {
    alignItems: 'center',
    width: '13%',
  },
  bar: {
    width: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default InsightsScreen; 