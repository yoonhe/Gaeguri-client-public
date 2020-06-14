import React, { useState, createRef } from 'react';
import ReactNative, { View, Button, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PageWrap } from '../../styles/common';
import { InputTitle, FormBox, InputText } from '../../styles/form';
import { BorderButton } from '../../components/buttonComponent';

function CreateProject({ route }) {
  const [scroll, setScroll] = useState(0);

  const scrollToInput = reactNode => {
    console.log('scroll.props ? ', scroll.props);
    console.log('react Node ???', reactNode);
    scroll.props.scrollToFocusedInput(reactNode);
  };

  const focusInputEvent = e => {
    console.log('ReactNative.findNodeHandle(e.target) ? ', ReactNative.findNodeHandle(e.target));
    scrollToInput(ReactNative.findNodeHandle(e.target));
  };

  return (
    <PageWrap style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        innerRef={ref => {
          setScroll(ref);
        }}
      >
        {/* <Text>프로젝트 생성 페이지지</Text> */}
        <FormBox>
          <InputTitle>프로젝트명</InputTitle>
          <InputText placeholder="프로젝트명을 입력하세요" onFocus={focusInputEvent} />
        </FormBox>
        <FormBox>
          <InputTitle>포지션 및 멤버수</InputTitle>
          <InputText placeholder="포지션을 입력하세요" onFocus={focusInputEvent} />
          <BorderButton text="포지션 추가" onPress={() => console.log('포지션 추가 버튼 클릭')} />
        </FormBox>
        <FormBox>
          <InputTitle>기술스택</InputTitle>
          <InputText placeholder="기술스택 입력 후 엔터" onFocus={focusInputEvent} />
        </FormBox>
      </KeyboardAwareScrollView>

      <BorderButton text="완료" onPress={() => console.log('프로젝트 방 생성 완료버튼 클릭')} />
    </PageWrap>
  );
}

export default CreateProject;
