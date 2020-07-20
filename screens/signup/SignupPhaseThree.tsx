import React, { useState, useCallback, useEffect, Component } from 'react';
import { Alert, View, Text, NativeModules } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  PageWrapAlignCenterStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
} from '../../styles/common';
import {
  TagListStyle,
  TagItemStyle,
  TagTextStyle,
  TagSignupItemStyle,
  TagTextSignupStyle,
} from '../../styles/tag';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CommonActions } from '@react-navigation/native';
import { BorderButtonSignupStyle } from '../../styles/button';

//email, password, username, position, stack, about me
//<Text title="About me" name="aboutme" placeholder="About me" />

const server = 'http://35.193.13.247:4000';

const GET_STACK = gql`
  query {
    stackAll {
      Stack_id
      Stack_name
    }
  }
`;

const GET_POSITION = gql`
  query {
    positionUser {
      Position_id
      Position_name
    }
  }
`;

const SIGNUP = gql`
  mutation EmailSignUp(
    $Username: String!
    $Email: String!
    $Password: String!
    $Position_id: Int
    $stack: [String]
    $AboutMe: String
  ) {
    EmailSignUp(
      Username: $Username
      Email: $Email
      Password: $Password
      Position_id: $Position_id
      stack: $stack
      AboutMe: $AboutMe
    ) {
      ok
      error
      user {
        User_id
      }
    }
  }
`;

function SignupPhaseThree({ navigation, route }): React.ReactElement {
  const client = useApolloClient();
  const [stackList, setStackList] = useState<object[]>([]);
  const [position, setPosition] = useState(null);
  const [createUser] = useMutation(SIGNUP);
  const [positions, setPositions] = useState<object[]>([]);
  const [stacks, setStacks] = useState<object[]>([]);
  const profile = route.params.imgFile || null;
  //console.log('-----phase three route', route.params);

  useEffect(() => {
    getStacks();
    getPositions();
  }, []);
  const getStacks = async () => {
    const {
      data: { stackAll },
    } = await client.query({
      query: GET_STACK,
    });
    setStacks(stackAll.slice(0, 30));
  };
  const getPositions = async () => {
    const {
      data: { positionUser },
    } = await client.query({
      query: GET_POSITION,
    });
    setPositions(positionUser);
  };

  const stackHandler = useCallback(
    newStack => {
      //console.log('selected newStack-------?', newStack);
      //console.log('stackList--------?', stackList);
      //console.log('------------stack value', e._dispatchInstances.memoizedProps.children);
      if (stackList.indexOf(newStack) === -1) {
        setStackList([...stackList, newStack]);
        //console.log('newstacklist==============', stackList);
      } else {
        let rmIndex = stackList.indexOf(newStack);
        //console.log(rmIndex, newStack);
        let rmStacks = stackList.slice();
        rmStacks.splice(rmIndex, 1);
        //console.log(rmStacks);

        setStackList([...rmStacks]);
        //console.log('rmStacks==============', stackList);
      }
    },
    [stacks, stackList, position, positions],
  );

  const nextPageButtonHandler = useCallback(async () => {
    const createUserInfo = {
      ...route.params.data,
      stack: stackList,
      Position_id: position,
    };
    //console.log('-------------phasw three data?', route.params.data);
    //console.log('-------------phasw three data?', createUserInfo);

    const response = await createUser({
      variables: { ...createUserInfo },
    });
    //console.log('-----grapnql res', response);

    const fdFile = {
      name: profile.fileName, // require, file name
      uri: 'file://' + profile.path, // require, file absoluete path
      type: profile.type, // options, if none, will get mimetype from `filepath` extension
    };
    const fd = new FormData();
    // await fd.append('name', 'imgProfile');
    fd.append('User_id', response.data.EmailSignUp.user.User_id);
    fd.append('imgProfile', fdFile);

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const url = server + '/upload/profile/' + createUserInfo.Email;
    console.log('-------fd', fd);
    console.log('------url', url);
    //<---------for axios or fetch ---------->
    fetch(url, {
      body: fd,
      method: 'POST',
      headers: config.headers,
    })
      .then(res => {
        //console.log('-----------??????', res);
        Alert.alert('회원가입 완료!', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: '로그인' }],
          }),
        );
      })
      .catch(error => {
        console.log('------phase three error', error);
        Alert.alert('이미지 업로드에 실패했어요. 로그인 후 프로필사진을 다시 수정해주세요!', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: '로그인' }],
          }),
        );
      });
  }, [stackList, position, stacks, positions]);

  return (
    <PageWrapWhiteStyle>
      <TextSubTitleStyle>포지션을 선택해주세요. </TextSubTitleStyle>
      <Picker mode="dropdown" selectedValue={position} onValueChange={value => setPosition(value)}>
        {positions &&
          ['포지션을 입력하세요'].concat(positions).map((s, i) => {
            if (i === 0) {
              return <Picker.Item key={i} value={s} label={s} />;
            } else {
              return <Picker.Item key={i} value={s.Position_id} label={s.Position_name} />;
            }
          })}
      </Picker>

      <TextSubTitleStyle>기술스택을 선택해주세요.</TextSubTitleStyle>
      <TagListStyle>
        {stacks &&
          stacks.map((stack, index) => (
            <TagSignupItemStyle
              key={index}
              selected={stackList.indexOf(stack.Stack_name) === -1 ? false : true}
            >
              <TagTextSignupStyle
                selected={stackList.indexOf(stack.Stack_name) === -1 ? false : true}
              >
                <Text onPress={e => stackHandler(stack.Stack_name)}>{stack.Stack_name}</Text>
              </TagTextSignupStyle>
            </TagSignupItemStyle>
          ))}
      </TagListStyle>
      <BorderButtonSignupStyle onPress={nextPageButtonHandler}>Done</BorderButtonSignupStyle>
    </PageWrapWhiteStyle>
  );
}

export default SignupPhaseThree;
