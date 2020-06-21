import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function Drawer({ navigation, router }): React.ReactElement {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 서랍',
      headerLeft: () => <Button title='닫기' onPress={closeDrawer} />,
    });
  }, [navigation]);

  const closeDrawer = useCallback(() => {
    navigation.goBack();
  }, []);

  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
});

export default Drawer;
