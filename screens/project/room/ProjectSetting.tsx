import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import FormBoxComponent from '../../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { PageWrapStyle } from '../../../styles/common';
import gql from 'graphql';

function ProjectSetting({ navigation }): React.ReactElement {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 설정하기',
      headerLeft: () => <Button title='닫기' onPress={closeSetting} />,
      headerRight: () => <Button title='완료' onPress={formik.handleSubmit} />,
    });
  }, [navigation]);

  const closeSetting = () => {
    navigation.goBack();
  };

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectProgress: '',
    },
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <PageWrapStyle>
      <FormBoxComponent
        title='프로젝트 이름'
        placeholder='React 프로젝트 하실 분!'
        values={formik.values.projectName}
        onChangeText={formik.handleChange('projectName')}
      />
      <Text>진행 상황</Text>
    </PageWrapStyle>
  );
}

export default ProjectSetting;
