import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './MyProfile';
import EditMyProfile from './EditMyProfile';
import SelectPhoto from './SelectPhoto';
import { Button } from 'react-native';

const MyProfileStack = createStackNavigator();

function MyProfileScreen({ navigation, route }): React.ReactElement {
  if (route.state) {
    navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true });
  }
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="마이프로필"
        component={MyProfile}
        options={{
          headerRight: () => (
            <Button
              title="편집"
              onPress={() => {
                navigation.navigate('프로필 편집');
              }}
            />
          ),
        }}
      />
      <MyProfileStack.Screen
        name="프로필 편집"
        component={EditMyProfile}
        options={{
          headerRight: () => (
            <Button
              title="저장"
              onPress={() => {
                navigation.navigate('마이프로필');
              }}
            />
          ),
        }}
      />
      <MyProfileStack.Screen
        name="사진"
        component={SelectPhoto}
        options={{
          headerRight: () => (
            <Button
              title="취소"
              onPress={() => {
                navigation.navigate('프로필 편집');
              }}
            />
          ),
        }}
      />
    </MyProfileStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!
export default MyProfileScreen;
