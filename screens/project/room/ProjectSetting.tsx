import React, { useLayoutEffect, useCallback, useState } from 'react';
import { View, Text, Button } from 'react-native';
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

function ProjectSetting({ navigation }): React.ReactElement {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { Project_id: 2 } }],
    // awaitRefetchQueries: true,
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { Project_id: 2 },
  });

  console.log('render', data?.getProjectDetail);

  const stateChangeToText = (status: number) => {
    let statusString: string = '';
    switch (status) {
      case 0:
        statusString = 'await';
        break;
      case 1:
        statusString = 'Start';
        break;
      case 2:
        statusString = 'End';
        break;
    }
    return statusString;
  };

  const [buttonState, setButtonState] = useState<number>(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 설정하기',
      headerLeft: () => <Button title="닫기" onPress={closeSetting} />,
      headerRight: () => <Button title="완료" onPress={formik.handleSubmit} />,
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
            // Status: stateChangeToText(buttonState),
          },
        },
      });
    },
  });

  const stateArr: string[] = ['모집중', '시작', '종료'];

  const onClick = useCallback(e => {
    setButtonState(e);
  }, []);

  // 모집중: ‘await’ 시작: ‘Start’ 종료: ‘End’
  return (
    <PageWrapStyle>
      <FormBoxComponent
        title="프로젝트 이름"
        placeholder={data?.getProjectDetail?.Project_name}
        values={formik.values.projectName}
        onChangeText={formik.handleChange('projectName')}
      />
      <FormBoxComponent title="주요스택">
        <ButtonWrap>
          {stateArr.map((state, i) => {
            return (
              <BorderButton
                key={i}
                row={true}
                backgroundColor={buttonState === i}
                onPress={() => onClick(i)}
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
