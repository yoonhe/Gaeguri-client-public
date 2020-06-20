import React, { useState, useCallback } from 'react';
import produce from 'immer';
import InputAndCountInputComponent from '../../components/InputAndCountInputComponent';
import TagListComponent from '../../components/TagListComponent';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { PageWrapStyle } from '../../styles/common';
import { FormBoxStyle, InputTitleStyle } from '../../styles/form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';

function CreateProject({ route }): React.ReactElement {
  const [tagList, setTagList] = useState<object[]>([]);
  const [stackList, setStackList] = useState<object[]>([]);
  const { position } = route.params;
  const [positionList, setPositionList] = useState([{ position: position, count: 1 }]);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
    },
    onSubmit(values) {
      console.log(values, positionList, tagList, stackList);
    },
  });

  const positionChangeHandler = useCallback(
    (index, e) => {
      const { text } = e.nativeEvent;
      setPositionList(
        produce(draft => {
          draft[index].position = text;
        }),
      );
    },
    [positionList],
  );

  const addPositionItemButtonHandler = useCallback(() => {
    const projectItem = { position: '', count: 1 };
    console.log('addPositionItemButtonHandler ? ', addPositionItemButtonHandler);
    if (positionList[positionList.length - 1].position !== '') {
      setPositionList(
        produce(draft => {
          draft.push(projectItem);
        }),
      );
    }
  }, [positionList]);

  const deletePositionItemButtonHandler = useCallback(
    index => {
      console.log('positionList length? ', positionList.length);
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

        <FormBoxStyle>
          {positionList.map((positionItem, index) => (
            <InputAndCountInputComponent
              position={positionItem.position}
              index={index}
              count={positionItem.count}
              positionChangeHandler={positionChangeHandler}
              countPlusMinusButtonHandler={countPlusMinusButtonHandler}
              deletePositionItemButtonHandler={deletePositionItemButtonHandler}
            />
          ))}
          <BorderButton text="포지션 추가" onPress={addPositionItemButtonHandler} />
        </FormBoxStyle>

        <FormBoxComponent
          title="프로젝트 소개"
          placeholder="프로젝트 소개"
          blurOnSubmit={true}
          multiline={true}
          values={formik.values.projectDescription}
          onChangeText={formik.handleChange('projectDescription')}
        />

        <FormBoxStyle>
          <InputTitleStyle>주요스택</InputTitleStyle>
          <TagListComponent tagList={tagList} setTagList={setTagList} produce={produce} />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>태그</InputTitleStyle>
          <TagListComponent tagList={stackList} setTagList={setStackList} produce={produce} />
        </FormBoxStyle>

        <FormBoxComponent title="완료일정" placeholder="완료일정" />

        <BorderButton backgroundColor={true} text="완료" onPress={formik.handleSubmit} />
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
