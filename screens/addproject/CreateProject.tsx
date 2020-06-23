import React, { useState, useCallback } from 'react';
import produce from 'immer';
import InputAndCountInputComponent from '../../components/InputAndCountInputComponent';
import TagListComponent from '../../components/TagListComponent';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import { PageWrapStyle } from '../../styles/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';

function CreateProject({ route }): React.ReactElement {
  const [tagList, setTagList] = useState<object[]>([]);
  const [stackList, setStackList] = useState<object[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const { position } = route.params;
  const [positionList, setPositionList] = useState([{ position: position, count: 1 }]);

  const formatDate = useCallback(() => {
    if (!date) {
      return;
    }

    let year: string = date && `${date.getFullYear()}`;
    let month: string = date && `${date.getMonth()}`;
    let day: string = date && `${date.getDate()}`;

    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;

    return `${year}. ${month}. ${day}`;
  }, [date]);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
    },
    onSubmit(values) {
      console.log(formatDate(), values, positionList, tagList, stackList);
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
              position={positionItem.position}
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

        <DateTimePickerComponent formatDate={formatDate} date={date} setDate={setDate} />

        <BorderButton backgroundColor={true} onPress={formik.handleSubmit}>
          완료
        </BorderButton>
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
