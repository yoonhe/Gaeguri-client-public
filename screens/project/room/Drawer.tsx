import React, { useLayoutEffect, useCallback, useRef } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DividerStyle } from '../../../styles/common';
import DrawerFooter from './DrawerFooter';
import { GET_PROJECT_USERS } from './RoomQuries';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Drawer({ navigation, route }): React.ReactElement {
  const { data, loading, error } = useQuery(GET_PROJECT_USERS, {
    variables: { Project_id: route.params.projectId },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 서랍',
      headerLeft: () => <Button title='닫기' onPress={closeDrawer} />,
    });
  }, [navigation]);

  const closeDrawer = () => {
    navigation.goBack();
  };

  // const onRetreat = useCallback(id => {
  //   console.log(id);
  // }, []);

  // if (loading) {
  //   return <Text>...loading</Text>;
  // }

  if (error) {
    console.log(error);
  }

  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator size='small' color='#00ff00' />
        </View>
      ) : (
        data.getProjectUserDetail.map((item, i) => {
          return (
            <View style={styles.item} key={i}>
              <Image
                style={styles.profileMedium}
                // source={
                //   item.profile !== ''
                //     ? { uri: item.profile }
                //     : require('../../../assets/MyProfile/profile_medium.png')
                source={require('../../../assets/MyProfile/profile_medium.png')}
              />
              {route.params.OwnerId === item.user.User_id && (
                <Image style={styles.crown} source={require('../../../assets/Room/crown.png')} />
              )}
              <Text
                style={{
                  fontSize: 12,
                  color: '#2F80ED',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 60,
                }}
              >
                {item.position.Position_name}
              </Text>
              <Text style={{ fontSize: 16, left: 130, position: 'absolute' }}>
                {item.user.Username}
              </Text>
              {/* {owner.id === me.id && me.id !== item.id && (
          <TouchableOpacity
            style={{ position: 'absolute', right: 5 }}
            onPress={() => onRetreat(item.id)}
          >
            <Image
              style={styles.retreatButton}
              source={require('../../../assets/Room/retreat.png')}
            />
          </TouchableOpacity>
        )} */}
            </View>
          );
        })
      )}
      <DividerStyle />
      <DrawerFooter navigation={navigation} projectId={route.params.projectId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#FFFF',
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
  },
  profileMedium: {
    width: 40,
    height: 40,
    borderRadius: 34,
    marginRight: 12,
  },
  retreatButton: {
    width: 40,
    height: 40,
    marginLeft: 12,
  },
  crown: {
    width: 20,
    height: 20,
    right: 30,
    top: 20,
  },
});

export default Drawer;
