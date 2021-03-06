import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { gql } from 'apollo-boost';
import produce from 'immer';
import InputAndCountInputComponent from '../../components/InputAndCountInputComponent';
import TagListComponent from '../../components/TagListComponent';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import { PageWrapStyle } from '../../styles/common';
import { GET_MYINFO } from '../project/room/RoomQuries';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import moment from 'moment';
import { GET_PROJECT_STATUS_FILTER } from '../project/ProjectQuries';

const GET_PROJECT = gql`
  query GettMyProjectList {
    getAvailableProjectList {
      Project_id
      Project_name
      StartAt
      EndAt
      Desc
      status
      Owner_id
      projectstack {
        stack {
          Stack_name
        }
      }
      projectpositionno {
        NoOfPosition
        position {
          Position_name
        }
      }
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CreateNewProject(
    $Project_name: String!
    $User_id: Int!
    $StartAt: Date
    $EndAt: Date
    $Desc: String
    $NoOfPosition: [NoOfPosition!]
    $Stacks: [String]
  ) {
    createNewProject(
      Project_name: $Project_name
      User_id: $User_id
      StartAt: $StartAt
      EndAt: $EndAt
      Desc: $Desc
      NoOfPosition: $NoOfPosition
      Stacks: $Stacks
    ) {
      ok
      error
      newProject {
        Project_id
        Project_name
        StartAt
        EndAt
        Desc
        status
        Owner_id
        projectstack {
          stack {
            Stack_name
          }
        }
        projectpositionno {
          NoOfPosition
          position {
            Position_name
          }
        }
      }
    }
  }
`;

function CreateProject({ route, navigation }): React.ReactElement {
  const [tagList, setTagList] = useState<object[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const { position } = route.params;
  const [positionList, setPositionList] = useState([{ name: position, count: 1 }]);
  const myInfo = useQuery(GET_MYINFO);

  const [createNewProject] = useMutation(CREATE_PROJECT, {
    update(cache, { data }) {
      /* test 1 */
      const newProject = data?.createNewProject?.newProject;
      let existingProejects = cache.readQuery({
        query: GET_PROJECT_STATUS_FILTER,
      });
      let project = existingProejects.getMyProjectListwithStatus.statusProject;

      console.log('===========================');
      console.log('[???] existingProejects ? ', existingProejects);
      console.log('newProject ? ', newProject);
      console.log('[???] project.onGoing ? ', project.onGoing);
      project.onGoing = [newProject, ...project.onGoing];
      console.log('[???] project.onGoing ? ', project.onGoing);

      cache.writeQuery({
        query: GET_PROJECT_STATUS_FILTER,
        data: {
          getMyProjectListwithStatus: existingProejects?.getMyProjectListwithStatus,
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
    },
    onSubmit(values) {
      const { projectName, projectDescription } = values;

      if (!projectName) {
        return Alert.alert('???????????? ????????? ???????????????', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      for (let position of positionList) {
        if (!position.name) {
          return Alert.alert('????????? ????????? ??????????????????. ?????? ?????? ??????????????????', '', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      if (!date) {
        return Alert.alert('??????????????? ???????????????', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      let dateFormat = moment(date).format('YYYY-MM-DD');

      createNewProject({
        variables: {
          Project_name: projectName,
          User_id: myInfo?.data?.GetMyProfile?.user?.User_id,
          EndAt: dateFormat,
          Desc: projectDescription,
          NoOfPosition: positionList,
          Stacks: tagList,
        },
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: '???' }],
        }),
      );

      navigation.navigate('???');
    },
  });

  const positionChangeHandler = useCallback(
    (index, text) => {
      setPositionList(
        produce(draft => {
          draft[index].name = text;
        }),
      );
    },
    [positionList],
  );

  const addPositionItemButtonHandler = useCallback(() => {
    const projectItem = { name: '', count: 1 };
    if (positionList[positionList.length - 1].name !== '') {
      setPositionList(
        produce(draft => {
          draft.push(projectItem);
        }),
      );
    }
  }, [positionList]);

  const deletePositionItemButtonHandler = useCallback(
    index => {
      if (positionList.length !== 1) {
        setPositionList(
          produce(draft => {
            draft.splice(index, 1);
          }),
        );
      }
    },
    [positionList],
  );

  const countPlusMinusButtonHandler = useCallback(
    (mode: string, index: number): void => {
      mode === 'plus'
        ? setPositionList(
            produce(draft => {
              draft[index].count = draft[index].count += 1;
            }),
          )
        : setPositionList(
            produce(draft => {
              draft[index].count = draft[index].count -= 1;
            }),
          );
    },
    [positionList],
  );

  return (
    <PageWrapStyle>
      <KeyboardAwareScrollView>
        <FormBoxComponent
          title="???????????? ??????"
          placeholder="???????????? ??????"
          values={formik.values.projectName}
          onChangeText={formik.handleChange('projectName')}
        />

        <FormBoxComponent title="????????? ??? ?????????">
          {positionList.map((positionItem, index) => (
            <InputAndCountInputComponent
              key={`${Date()}${-index}`}
              position={positionItem.name}
              index={index}
              count={positionItem.count}
              positionChangeHandler={positionChangeHandler}
              countPlusMinusButtonHandler={countPlusMinusButtonHandler}
              deletePositionItemButtonHandler={deletePositionItemButtonHandler}
            />
          ))}
          <BorderButton onPress={addPositionItemButtonHandler}>????????? ??????</BorderButton>
        </FormBoxComponent>

        <FormBoxComponent
          title="???????????? ??????"
          placeholder="???????????? ??????"
          blurOnSubmit={true}
          multiline={true}
          values={formik.values.projectDescription}
          onChangeText={formik.handleChange('projectDescription')}
        />

        <FormBoxComponent title="????????????">
          <TagListComponent tagList={tagList} setTagList={setTagList} produce={produce} />
        </FormBoxComponent>

        <DateTimePickerComponent date={date} setDate={setDate} />

        <BorderButton backgroundColor={true} onPress={formik.handleSubmit}>
          ??????
        </BorderButton>
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
