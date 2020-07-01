import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import produce from 'immer';
import InputAndCountInputComponent from '../../components/InputAndCountInputComponent';
import TagListComponent from '../../components/TagListComponent';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import { PageWrapStyle } from '../../styles/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import moment from 'moment';

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
      path
      message
    }
  }
`;

function CreateProject({ route, navigation }): React.ReactElement {
  const [tagList, setTagList] = useState<object[]>([]);
  const [stackList, setStackList] = useState<object[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const { position } = route.params;
  const [positionList, setPositionList] = useState([{ name: position, count: 1 }]);

  const [createNewProject] = useMutation(CREATE_PROJECT);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
    },
    onSubmit(values) {
      const { projectName, projectDescription } = values;

      if (!projectName) {
        return Alert.alert('프로젝트 이름을 입력하세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      for (let position of positionList) {
        if (!position.name) {
          return Alert.alert('포지션 이름이 비어있습니다. 삭제 또는 입력해주세요', '', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }

      if (!date) {
        return Alert.alert('완료일정을 입력하세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      let dateFormat = moment(date).format('YYYY-MM-DD');
      console.log(date, projectName, projectDescription, positionList, tagList, stackList);

      createNewProject({
        variables: {
          Project_name: projectName,
          User_id: 2,
          EndAt: dateFormat,
          Desc: projectDescription,
          NoOfPosition: positionList,
          Stacks: stackList,
        },
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: '프로젝트' }],
        }),
      );
    },
  });

  const positionChangeHandler = useCallback(
    (index, text) => {
      // const {text} = e.nativeEvent;
      console.log('[positionChangeHandler]index ? ', index);
      console.log('[positionChangeHandler]text ? ', text);
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
          title="프로젝트 이름"
          placeholder="프로젝트 이름"
          values={formik.values.projectName}
          onChangeText={formik.handleChange('projectName')}
        />

        <FormBoxComponent title="포지션 및 멤버수">
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
          <BorderButton onPress={addPositionItemButtonHandler}>포지션 추가</BorderButton>
        </FormBoxComponent>

        <FormBoxComponent
          title="프로젝트 소개"
          placeholder="프로젝트 소개"
          blurOnSubmit={true}
          multiline={true}
          values={formik.values.projectDescription}
          onChangeText={formik.handleChange('projectDescription')}
        />

        <FormBoxComponent title="주요스택">
          <TagListComponent tagList={tagList} setTagList={setTagList} produce={produce} />
        </FormBoxComponent>

        <FormBoxComponent title="태그">
          <TagListComponent tagList={stackList} setTagList={setStackList} produce={produce} />
        </FormBoxComponent>

        <DateTimePickerComponent date={date} setDate={setDate} />

        <BorderButton backgroundColor={true} onPress={formik.handleSubmit}>
          완료
        </BorderButton>
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
