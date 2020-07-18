import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { BorderButton } from '../../components/ButtonComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components/context';
import { PageWrapStyle } from '../../styles/common';
import ProjectStatusPickerComponent from '../../components/ProjectStatusPickerComponent';
import CardListComponent from '../../components/CardListComponent';
import { GET_PROJECT_STATUS_FILTER } from '../project/ProjectQuries';
import { HeaderButtonBox, HeaderButtonStyle } from '../../styles/button';

function HomeScreen({ navigation, route }) {
  const { signOut } = React.useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState('onGoing');
  const statusPickerOnChange = useCallback((itemValue, itemIndex) => {
    console.log('itemValue', itemValue);
    console.log('itemIndex', itemIndex);
    setSelectedValue(itemValue);
  }, []);

  const logoutButtonHandler = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    signOut();
  }, []);

  const alramdrawer = useCallback(() => {
    //console.log('navigation. navigate', navigation.navigate());
    navigation.navigate('MyAlramList');
  }, []);
  //console.log(navigation);

  const { loading, error, data } = useQuery(GET_PROJECT_STATUS_FILTER, {
    pollInterval: 200,
  });

  if (error) {
    console.log('[CardListComponents] error ? ', error);
  }

  // console.log('selectedValue ? ', selectedValue);
  // if (data) {
  //   console.log('data ? ', data);
  // }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonBox>
          <HeaderButtonStyle type="circle" onPress={alramdrawer}>
            알람
          </HeaderButtonStyle>
          <HeaderButtonStyle onPress={logoutButtonHandler}>로그아웃</HeaderButtonStyle>
        </HeaderButtonBox>
      ),
    });
  }, []);

  return (
    <PageWrapStyle>
      <ProjectStatusPickerComponent
        selectedValue={selectedValue}
        onValueChange={statusPickerOnChange}
      />
      <ScrollView style={{ flex: 1 }}>
        {loading && (
          <View>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}
        {data?.getMyProjectListwithStatus?.statusProject[selectedValue]?.length !== 0 ? (
          data?.getMyProjectListwithStatus?.statusProject[selectedValue]?.map((project, i) => (
            <CardListComponent
              key={i}
              project={project}
              navigation={navigation}
              isMyProject={true}
            />
          ))
        ) : (
          <Text>데이터가 존재하지 않습니다.</Text>
        )}
      </ScrollView>
    </PageWrapStyle>
  );
}

export default HomeScreen;
