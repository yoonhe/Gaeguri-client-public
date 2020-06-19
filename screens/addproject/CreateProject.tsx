import React, { useState, useCallback } from 'react';
import { TextInput } from 'react-native';
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

function CreateProject(): React.ReactElement {
  const formik = useFormik({
    initialValues: {
      projectName: '',
      projectDescription: '',
      projectPosition: '',
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  console.log('formik.handleChange(`projectPosition`) ? ', formik.handleChange('projectPosition'));

  return (
    <PageWrapStyle>
      <KeyboardAwareScrollView>
        <FormBoxComponent
          title="프로젝트 이름"
          placeholder="프로젝트 이름"
          values={formik.values.projectName}
          handleChange={formik.handleChange('projectName')}
        />

        <FormBoxComponent
          title="프로젝트 설명"
          placeholder="프로젝트 설명"
          blurOnSubmit={true}
          multiline={true}
          values={formik.values.projectDescription}
          handleChange={formik.handleChange('projectDescription')}
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
            <CountInputComponent />
          </RowFormWrapStyle>
          <BorderButton text="포지션 추가" onPress={() => console.log('포지션 추가 버튼 클릭')} />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>기술스택</InputTitleStyle>
          <TagListComponent />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>태그</InputTitleStyle>
          <TagListComponent />
        </FormBoxStyle>

        <BorderButton backgroundColor={true} text="완료" onPress={formik.handleSubmit} />
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
