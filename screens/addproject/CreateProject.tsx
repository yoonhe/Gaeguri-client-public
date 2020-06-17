import React from 'react';
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
} from '../../styles/form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function CreateProject(): React.ReactElement {
  return (
    <PageWrapStyle>
      <KeyboardAwareScrollView>
        <FormBoxComponent title="프로젝트 이름" placeholder="프로젝트 이름" />

        <FormBoxComponent
          title="프로젝트 설명"
          placeholder="프로젝트 설명"
          blurOnSubmit={true}
          multiline={true}
        />

        <FormBoxStyle>
          <RowFormWrapStyle>
            <FormStyle>
              <InputTitleStyle>포지션 및 멤버수</InputTitleStyle>
              <InputTextStyle placeholder="포지션" />
            </FormStyle>
            <CountInputComponent />
          </RowFormWrapStyle>
          <BorderButton text="포지션 추가" onPress={() => console.log('포지션 추가 버튼 클릭')} />
        </FormBoxStyle>

        <FormBoxStyle>
          <InputTitleStyle>기술스택</InputTitleStyle>
          <TagListComponent />
        </FormBoxStyle>

        <BorderButton
          backgroundColor={true}
          text="완료"
          onPress={() => console.log('프로젝트 방 생성 완료버튼 클릭')}
        />
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default CreateProject;
