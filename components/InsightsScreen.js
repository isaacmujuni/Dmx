import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HealthConnect from 'react-native-health-connect';

const InsightsScreen = ({ navigation }) => {
  const [isHealthConnectAvailable, setIsHealthConnectAvailable] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [healthData, setHealthData] = useState({
    heartRate: { value: '--', trend: 'neutral', change: 'No data' },
    steps: { value: '--', trend: 'neutral', change: 'No data' },
    sleep: { value: '--', trend: 'neutral', change: 'No data' },
    calories: { value: '--', trend: 'neutral', change: 'No data' },
  });
  
  const healthMetrics = [
    { icon: 'favorite', title: 'Heart Rate', ...healthData.heartRate },
    { icon: 'directions-walk', title: 'Daily Steps', ...healthData.steps },
    { icon: 'nightlight', title: 'Sleep', ...healthData.sleep },
    { icon: 'local-fire-department', title: 'Calories', ...healthData.calories },
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

  // Health Connect permissions
  const PERMISSIONS = [
    { accessType: 'read', recordType: 'Steps' },
    { accessType: 'read', recordType: 'HeartRate' },
    { accessType: 'read', recordType: 'SleepSession' },
    { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
  ];

  // Check if Health Connect is available
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        setIsLoading(true);
        const isAvailable = await HealthConnect.isAvailable();
        setIsHealthConnectAvailable(isAvailable);
        
        if (isAvailable) {
          checkPermissions();
        } else {
          setIsLoading(false);
          Alert.alert(
            'Health Connect Not Available',
            'Health Connect is not available on this device. Some features may be limited.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error checking Health Connect availability:', error);
        setIsLoading(false);
      }
    };
    
    checkAvailability();
  }, []);

  // Check permissions
  const checkPermissions = async () => {
    try {
      const granted = await HealthConnect.hasPermissions(PERMISSIONS);
      setHasPermissions(granted);
      
      if (granted) {
        fetchHealthData();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
      setIsLoading(false);
    }
  };

  // Request permissions
  const requestPermissions = async () => {
    try {
      setIsLoading(true);
      await HealthConnect.requestPermissions(PERMISSIONS);
      checkPermissions();
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setIsLoading(false);
      Alert.alert('Permission Error', 'Failed to request Health Connect permissions.');
    }
  };

  // Fetch health data from Health Connect
  const fetchHealthData = async () => {
    try {
      setIsLoading(true);
      
      // Get current date range (today)
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      
      // Previous day for comparison
      const startOfYesterday = new Date(startOfDay);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      const endOfYesterday = new Date(startOfDay);
      endOfYesterday.setMilliseconds(-1);

      // Fetch steps data
      const stepsResponse = await HealthConnect.readRecords('Steps', {
        timeRangeFilter: {
          startTime: startOfDay.toISOString(),
          endTime: endOfDay.toISOString(),
        },
      });
      
      // Fetch yesterday's steps for comparison
      const yesterdayStepsResponse = await HealthConnect.readRecords('Steps', {
        timeRangeFilter: {
          startTime: startOfYesterday.toISOString(),
          endTime: endOfYesterday.toISOString(),
        },
      });
      
      // Calculate total steps
      const totalSteps = stepsResponse.reduce((sum, record) => sum + record.count, 0);
      const yesterdayTotalSteps = yesterdayStepsResponse.reduce((sum, record) => sum + record.count, 0);
      const stepsDiff = totalSteps - yesterdayTotalSteps;
      
      // Heart rate data (most recent)
      const heartRateResponse = await HealthConnect.readRecords('HeartRate', {
        timeRangeFilter: {
          startTime: startOfDay.toISOString(),
          endTime: endOfDay.toISOString(),
        },
        ascendingOrder: false,
        limit: 1,
      });
      
      // Sleep data (most recent)
      const sleepResponse = await HealthConnect.readRecords('SleepSession', {
        timeRangeFilter: {
          startTime: startOfDay.toISOString(),
          endTime: endOfDay.toISOString(),
        },
        limit: 1,
      });
      
      // Calories data
      const caloriesResponse = await HealthConnect.readRecords('ActiveCaloriesBurned', {
        timeRangeFilter: {
          startTime: startOfDay.toISOString(),
          endTime: endOfDay.toISOString(),
        },
      });
      
      const totalCalories = caloriesResponse.reduce((sum, record) => sum + record.energy.inKilocalories, 0);
      
      // Update health data state
      setHealthData({
        steps: {
          value: totalSteps > 0 ? totalSteps.toLocaleString() : '--',
          trend: stepsDiff > 0 ? 'up' : stepsDiff < 0 ? 'down' : 'neutral',
          change: stepsDiff !== 0 ? `${stepsDiff > 0 ? '+' : ''}${stepsDiff.toLocaleString()} from yesterday` : 'Same as yesterday',
        },
        heartRate: {
          value: heartRateResponse.length > 0 ? `${Math.round(heartRateResponse[0].samples[0].beatsPerMinute)} bpm` : '--',
          trend: 'neutral',
          change: heartRateResponse.length > 0 ? 'Latest reading' : 'No data',
        },
        sleep: {
          value: sleepResponse.length > 0 ? formatDuration(sleepResponse[0].endTime - sleepResponse[0].startTime) : '--',
          trend: 'neutral',
          change: sleepResponse.length > 0 ? 'Last night' : 'No data',
        },
        calories: {
          value: totalCalories > 0 ? Math.round(totalCalories).toLocaleString() : '--',
          trend: 'neutral',
          change: totalCalories > 0 ? 'Today' : 'No data',
        },
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching health data:', error);
      setIsLoading(false);
      Alert.alert('Data Error', 'Failed to fetch health data from Health Connect.');
    }
  };
  
  // Helper function to format duration
  const formatDuration = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#87CEEB" />
            <Text style={styles.loadingText}>Loading health data...</Text>
          </View>
        ) : (
          <>
            {/* Health Connect Status */}
            {!hasPermissions && (
              <View style={styles.permissionCard}>
                <Icon name="health-and-safety" size={24} color="#87CEEB" />
                <Text style={styles.permissionTitle}>
                  {isHealthConnectAvailable ? 'Health Connect Permissions Required' : 'Health Connect Not Available'}
                </Text>
                <Text style={styles.permissionDesc}>
                  {isHealthConnectAvailable
                    ? 'Connect to Health Connect to see your health metrics and insights.'
                    : 'This device does not support Health Connect. Some features may be limited.'}
                </Text>
                {isHealthConnectAvailable && (
                  <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermissions}
                  >
                    <Text style={styles.permissionButtonText}>Grant Permissions</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

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
              <TouchableOpacity style={styles.actionButton} onPress={fetchHealthData}>
                <Icon name="refresh" size={24} color="#fff" />
                <Text style={styles.actionText}>Refresh Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share" size={24} color="#fff" />
                <Text style={styles.actionText}>Share Insights</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  permissionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '500',
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
    marginBottom: 20,
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