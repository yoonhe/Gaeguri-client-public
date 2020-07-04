import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import FormBoxComponent from '../../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { PageWrapStyle } from '../../../styles/common';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BorderButton } from '../../../components/ButtonComponent';

const UPDATE_PROJECT = gql`
  mutation UpdateProjectInfo($input: upProject!) {
    updateProjectInfo(input: $input) {
      message
      path
    }
  }
`;

const GET_PROJECT = gql`
  query GetProjectDetail($Project_id: Int!) {
    getProjectDetail(Project_id: $Project_id) {
      Project_name
      status
    }
  }
`;

// 모집중: ‘await’ 시작: ‘Start’ 종료: ‘End’
function ProjectSetting({ navigation }): React.ReactElement {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { Project_id: 2 } }],
    awaitRefetchQueries: true,
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { Project_id: 2 },
  });

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
      updateProject({
        variables: {
          input: {
            Project_id: 2,
            Project_name: values.projectName,
          },
        },
      });
    },
  });

  const onClick = useCallback(() => {
    console.log('click');
  }, []);

  console.log(data?.getProjectDetail?.status);

  return (
    <PageWrapStyle>
      <FormBoxComponent
        title='프로젝트 이름'
        placeholder={data?.getProjectDetail?.Project_name}
        values={formik.values.projectName}
        onChangeText={formik.handleChange('projectName')}
      />
      <Text>진행 상황</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
        <BorderButton children='모집중' onPress={onClick} />
        <BorderButton children='진행중' onPress={onClick} />
        <BorderButton children='종료' onPress={onClick} />
      </View>
    </PageWrapStyle>
  );
}

export default ProjectSetting;
