import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import CountInput from '../../components/CountInput';
import { BorderButton } from '../../components/buttonComponent';
import { PageWrap } from '../../styles/common';
import { InputTitle, FormBox, InputText, Form, RowFormWrap } from '../../styles/form';
import { TagList, TagItem } from '../../styles/tag';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function CreateProject({ route }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <PageWrap>
        <FormBox>
          <InputTitle>프로젝트 이름</InputTitle>
          <InputText placeholder="프로젝트 이름" />
        </FormBox>
        <FormBox inline={true}>
          <RowFormWrap>
            <Form>
              <InputTitle>포지션 및 멤버수</InputTitle>
              <InputText placeholder="포지션" />
            </Form>
            <CountInput />
          </RowFormWrap>
          <BorderButton text="포지션 추가" onPress={() => console.log('포지션 추가 버튼 클릭')} />
        </FormBox>
        <FormBox>
          <InputTitle>기술스택</InputTitle>
          <InputText placeholder="기술스택 입력 후 엔터" />
          <TagList>
            <TagItem>#Java</TagItem>
            <TagItem>#C</TagItem>
          </TagList>
        </FormBox>
        <BorderButton text="완료" onPress={() => console.log('프로젝트 방 생성 완료버튼 클릭')} />
      </PageWrap>
    </KeyboardAvoidingView>
  );
}

export default CreateProject;
