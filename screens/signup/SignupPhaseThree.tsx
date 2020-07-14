import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View, Text, NativeModules } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  PageWrapAlignCenterStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
} from '../../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../../styles/tag';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import FileUpload from 'react-native-file-upload';
//email, password, username, position, stack, about me
//<Text title="About me" name="aboutme" placeholder="About me" />
var RNUploader = NativeModules.RNUploader;

const server = 'http://10.0.2.2:4000';

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
  console.log('-----phase three route', route.params);

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
    setStacks(stackAll);
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
      //console.log('------------stack value', e._dispatchInstances.memoizedProps.children);
      if (stackList.indexOf(newStack) === -1) {
        let newStacks = stackList.slice();
        newStacks.push(newStack);
        setStackList(newStacks);
        //console.log('newstacklist==============', stackList);
      } else {
        let rmIndex = stackList.indexOf(newStack);
        //console.log(rmIndex, newStack);
        let rmStacks = stackList.slice();
        rmStacks.splice(rmIndex, 1);

        setStackList(rmStacks);
        //console.log('rmStacks==============', stackList);
      }
    },
    [stacks],
  );

  const nextPageButtonHandler = useCallback(() => {
    const createUserInfo = {
      ...route.params.data,
      stack: stackList,
      Position_id: position,
    };
    console.log('-------------phasw three data?', route.params.data);
    console.log('-------------phasw three data?', createUserInfo);

    createUser({
      variables: { ...createUserInfo },
    })
      .then(async res => {
        console.log('-----------??????', res.data.EmailSignUp, createUserInfo.Email);
        console.log('----------- res file', profile);
        console.log('-----------user_id', res.data.EmailSignUp.user.User_id);
        if (profile) {
          const file = {
            name: 'imgProfile',
            filename: profile.fileName, // require, file name
            filepath: 'file://' + profile.path, // require, file absoluete path
            filetype: profile.type, // options, if none, will get mimetype from `filepath` extension
          };
          const fd = new FormData();
          // await fd.append('name', 'imgProfile');
          fd.append('User_id', res.data.EmailSignUp.user.User_id);
          fd.append('files[]', file);

          console.log('------------file??', file);
          // ]);
          var obj = {
            uploadUrl: server,
            method: 'POST', // default 'POST',support 'POST' and 'PUT'
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            fields: {
              User_id: res.data.EmailSignUp.user.User_id,
            },
            files: [file],
          };

          console.log('-----------------fd?', obj.files);
          const config = {
            headers: {
              accept: '*/*',
              'content-type': 'multipart/form-data;',
            },
          };

          await axios
            .post(`${server}/upload/profile/${createUserInfo.Email}`, fd, { headers: obj.headers })
            .then(res => {
              Alert.alert('회원가입 완료!', '', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
              // navigation.dispatch(
              //   CommonActions.reset({
              //     routes: [{ name: '로그인' }],
              //   }),
              // );
            })
            .catch(error => {
              console.log('------phase three error', error);
              Alert.alert(
                '회원가입은 완료 됐지만 이미지 업로드에 실패했어요. 로그인 후 프로필사진을 다시 수정해주세요!',
                '',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              );
              // navigation.dispatch(
              //   CommonActions.reset({
              //     routes: [{ name: '로그인' }],
              //   }),
              // );
            });
          // fetch(`${server}/upload/profile/${createUserInfo.Email}`, {
          //   method: 'POST',
          //   body: fd,
          //   headers: {
          //     'content-type': 'multipart/form-data;',
          //   },
          // })
          //   .then(res => {
          //     console.log('success!!!!!!!!!!');
          //     console.log(res);
          //   })
          //   .catch(error => {
          //     console.log('eror!!!!!!', error);
          //   });
          // axios
        } else {
          Alert.alert('회원가입 완료!', '', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: '로그인' }],
            }),
          );
        }
      })
      .catch(error => {
        console.log('----------?????error', error);
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
            <TagItemStyle key={index}>
              <TagTextStyle>
                <Text onPress={e => stackHandler(e._dispatchInstances.memoizedProps.children)}>
                  {stack.Stack_name}
                </Text>
              </TagTextStyle>
            </TagItemStyle>
          ))}
      </TagListStyle>
      <BorderButton onPress={nextPageButtonHandler}>Done</BorderButton>
    </PageWrapWhiteStyle>
  );
}

export default SignupPhaseThree;
