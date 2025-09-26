import Ionicons from '@expo/vector-icons/Ionicons';
import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: ' ',
              data: [
                { name: 'Wish List', icon: 'heart' },
                { name: 'Store Followed', icon: 'home' },
                { name: 'Recently Viewed', icon: 'stopwatch' },
                { name: 'My Coupons', icon: 'barcode' },
              ],
            },
            {
              title: ' ',
              data: [
                { name: 'Address Management', icon: 'location' },
                { name: 'Service Center', icon: 'headset' },
                { name: 'Invite Friend', icon: 'people-circle' },
                { name: "Frind's Code", icon: 'mail-open' },
              ],
            },
          ]}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Ionicons name={item.icon as any} size={20} style={styles.icon} />
              <Text style={styles.item}>{item.name}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 10,
    color: '#333',
  },
  item: {
    fontSize: 18,
  },
});
