import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import FormBoxComponent from '../../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { PageWrapStyle } from '../../../styles/common';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

const UPDATE_PROJECT = gql`
  mutation UpdateProjectInfo($input: upProject) {
    updateProjectInfo(input: $input) {
      message
      path
    }
  }
`;

const GET_PROJECT = gql`
  {
    getProjectDetail(Project_id: 2) {
      Project_name
    }
  }
`;

function ProjectSetting({ navigation }): React.ReactElement {
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const { loading, error, data } = useQuery(GET_PROJECT);

  console.log();

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
      updateProject({
        variables: {
          input: {
            Project_id: 2,
            Project_name: 'Vue 플젝 구함',
          },
        },
      });
    },
  });

  return (
    <PageWrapStyle>
      <FormBoxComponent
        title='프로젝트 이름'
        placeholder={data.getProjectDetail.Project_name}
        values={formik.values.projectName}
        onChangeText={formik.handleChange('projectName')}
      />
      <Text>진행 상황</Text>
    </PageWrapStyle>
  );
}

export default ProjectSetting;
