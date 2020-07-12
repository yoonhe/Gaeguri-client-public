import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import FormBoxComponent from '../../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { PageWrapStyle } from '../../../styles/common';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BorderButton } from '../../../components/ButtonComponent';
import { ButtonWrap } from '../../../styles/button';

const UPDATE_PROJECT = gql`
  mutation UpdateProjectInfo($input: upProject!) {
    updateProjectInfo(input: $input) {
      ok
      error
      project {
        Project_id
        Project_name
        status
      }
    }
  }
`;

const GET_PROJECT = gql`
  query GetProjectDetail($Project_id: Int!) {
    getProjectDetail(Project_id: $Project_id) {
      Project_id
      Project_name
      status
    }
  }
`;

function ProjectSetting({ navigation, route }): React.ReactElement {
  // const [updateProject] = useMutation(UPDATE_PROJECT, {
  //   refetchQueries: [{ query: GET_PROJECT, variables: { Project_id: route.params.projectId } }],
  //   // awaitRefetchQueries: true,
  // });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    update(cache, { data }) {
      const { getProjectDetail } = cache.readQuery({
        query: GET_PROJECT,
        variables: {
          Project_id: route.params.projectId,
        },
      });

      console.log('getProjectDetail', getProjectDetail);

      console.log('data', data);

      // cache.writeQuery({
      //   query: GET_PROJECT,
      //   variables: {
      //     Project_id: route.params.projectId,
      //   },
      //   data: {},
      // });
    },
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { Project_id: route.params.projectId },
  });

  const [buttonState, setButtonState] = useState<string>(data?.getProjectDetail.status);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 설정하기',
      headerLeft: () => <Button title='닫기' onPress={closeSetting} />,
      headerRight: () => <Button title='완료' onPress={formik.handleSubmit} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (data) {
      setButtonState(data.getProjectDetail.status);
    }
  }, [!loading]);

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
            Project_id: route.params.projectId,
            Project_name: values.projectName,
            // Status: buttonState,
          },
        },
      });
    },
  });

  const stateArr: string[] = ['모집중', '시작', '종료'];
  const stateValueArr: string[] = ['await', 'Start', 'End'];

  const onClick = useCallback(e => {
    if (buttonState === 'Start' && e === 'await') {
      return Alert.alert(
        '',
        '프로젝트가 이미 시작되었습니다',
        [
          {
            text: 'OK',
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
    }

    if (buttonState === 'await' && e === 'End') {
      return Alert.alert(
        '',
        '프로젝트가 시작되지 않았습니다',
        [
          {
            text: 'OK',
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
    }

    if (buttonState === 'End') {
      return Alert.alert(
        '',
        '프로젝트가 종료되었습니다',
        [
          {
            text: 'OK',
            style: 'destructive',
          },
        ],
        { cancelable: true },
      );
    }
    setButtonState(e);
  }, []);

  // 모집중: ‘await’ 시작: ‘Start’ 종료: ‘End’
  if (loading) {
    return <Text>loading...</Text>;
  }

  return (
    <PageWrapStyle>
      <FormBoxComponent
        title='프로젝트 이름'
        placeholder={data?.getProjectDetail?.Project_name}
        values={formik.values.projectName}
        onChangeText={formik.handleChange('projectName')}
      />
      <FormBoxComponent title='주요스택'>
        <ButtonWrap>
          {stateValueArr.map((state, i) => {
            return (
              <BorderButton
                key={i}
                row={true}
                backgroundColor={buttonState === state}
                onPress={() => onClick(state)}
              >
                {stateArr[i]}
              </BorderButton>
            );
          })}
        </ButtonWrap>
      </FormBoxComponent>
    </PageWrapStyle>
  );
}

export default ProjectSetting;
