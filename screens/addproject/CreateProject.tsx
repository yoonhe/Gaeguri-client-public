import React, { useState, useCallback, useEffect } from 'react';
import CountInputComponent from '../../components/CountInputComponent';
import TagListComponent from '../../components/TagListComponent';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { PageWrapStyle } from '../../styles/common';
import {
  FormBoxStyle,
  InputTitleStyle,
  FormStyle,
  InputTextStyle,
  RowFormWrapStyle,
  InputBoxStyle,
} from '../../styles/form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';

function CreateProject({ route }): React.ReactElement {
  const [count, setCount] = useState('1');
  const [tagList, setTagList] = useState<object[]>([]);
  const [stackList, setStackList] = useState<object[]>([]);

  console.log('pass position ? ', route.params.position);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
      projectPosition: `${route.params.position}`,
    },
    onSubmit(values) {
      console.log(values, count, tagList, stackList);
    },
  });

  let NumCount: number = Number(count);
  const countPlusMinusButtonHandler = useCallback(
    (mode: string): void => {
      mode === 'plus' ? setCount(String((NumCount += 1))) : setCount(String((NumCount -= 1)));
    },
    [count],
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

        <FormBoxComponent
          title="프로젝트 설명"
          placeholder="프로젝트 설명"
          blurOnSubmit={true}
          multiline={true}
          values={formik.values.projectDescription}
          onChangeText={formik.handleChange('projectDescription')}
        />

        <FormBoxStyle>
          <RowFormWrapStyle>
            <FormStyle>
              <InputTitleStyle>포지션 및 멤버수</InputTitleStyle>
              <InputBoxStyle>
                <BorderButton
                  text="X"
                  width="30"
                  height="30"
                  radius="15"
                  marginTop="0"
                  marginRight="10"
                  onPress={() => console.log('해당 포지션 로우 삭제')}
                />
                <InputTextStyle
                  placeholder="포지션"
                  value={formik.values.projectPosition}
                  onChangeText={formik.handleChange('projectPosition')}
                />
              </InputBoxStyle>
            </FormStyle>
            <CountInputComponent
              count={count}
              NumCount={NumCount}
              setCount={setCount}
              countPlusMinusButtonHandler={countPlusMinusButtonHandler}
            />
          </RowFormWrapStyle>
          <BorderButton text="포지션 추가" onPress={() => console.log('포지션 추가 버튼 클릭')} />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>기술스택</InputTitleStyle>
          <TagListComponent tagList={tagList} setTagList={setTagList} />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>태그</InputTitleStyle>
          <TagListComponent tagList={stackList} setTagList={setStackList} />
        </FormBoxStyle>

        <BorderButton backgroundColor={true} text="완료" onPress={formik.handleSubmit} />
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
