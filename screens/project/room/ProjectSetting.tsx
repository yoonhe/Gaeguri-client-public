import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { Text, Button, Alert, ActivityIndicator, View } from 'react-native';
import FormBoxComponent from '../../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { PageWrapStyle } from '../../../styles/common';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BorderButton } from '../../../components/ButtonComponent';
import { ButtonWrap } from '../../../styles/button';
import { UPDATE_PROJECT, GET_PROJECT } from './RoomQuries';

function ProjectSetting({ navigation, route }): React.ReactElement {
  const [buttonState, setButtonState] = useState<string>('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    update(cache, { data }) {
      const { getProjectDetail } = cache.readQuery({
        query: GET_PROJECT,
        variables: {
          Project_id: route.params.projectId,
        },
      });

      cache.writeQuery({
        query: GET_PROJECT,
        variables: {
          Project_id: route.params.projectId,
        },
        data: {
          getProjectDetail: {
            ...data.updateProjectInfo[0].project,
          },
          __typename: 'Project',
        },
      });
    },
  });

  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
    variables: { Project_id: route.params.projectId },
  });

  if (error) {
    console.log(error);
  }

  console.log('buttonState', buttonState);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 설정하기',
      headerLeft: () => <Button title='닫기' onPress={closeSetting} />,
      headerRight: () => <Button title='완료' onPress={formik.handleSubmit} />,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (data) {
      console.log(data.getProjectDetail.status);
      setButtonState(data.getProjectDetail.status);
    }
  }, [data]);

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
            Status: buttonState,
          },
        },
      });
    },
  });

  const stateArr: string[] = ['모집중', '시작', '종료'];
  const stateValueArr: string[] = ['await', 'Start', 'End'];

  const onClick = useCallback(
    e => {
      if (data.getProjectDetail.status === 'Start' && e === 'await') {
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

      if (data.getProjectDetail.status === 'await' && e === 'End') {
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

      if (data.getProjectDetail.status === 'End') {
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
    },
    [buttonState],
  );

  // 모집중: ‘await’ 시작: ‘Start’ 종료: ‘End’
  if (loading) {
    return (
      <View>
        <ActivityIndicator size='small' color='#00ff00' />
      </View>
    );
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
