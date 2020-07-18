import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { PageWrapStyle } from '../../styles/common';
import CardListComponent from '../../components/CardListComponent';
// import ProjectStatusPickerComponent from '../../components/ProjectStatusPickerComponent';
import { GET_PROJECT } from './ProjectQuries';

function Main({ navigation }): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState('onGoing');
  // const statusPickerOnChange = useCallback((itemValue, itemIndex) => {
  //   console.log('itemValue', itemValue);
  //   console.log('itemIndex', itemIndex);
  //   setSelectedValue(itemValue);
  // }, []);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    pollInterval: 200,
  });

  if (error) {
    console.log('[CardListComponents] error ? ', error);
  }

  return (
    <PageWrapStyle>
      <ScrollView style={{ flex: 1 }}>
        {/* <ProjectStatusPickerComponent
          selectedValue={selectedValue}
          onValueChange={statusPickerOnChange}
        /> */}
        {loading && (
          <View>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}
        {data &&
          data.getAvailableProjectList.map((project, i) => (
            <CardListComponent key={i} project={project} navigation={navigation} />
          ))}
      </ScrollView>
    </PageWrapStyle>
  );
}

export default Main;
