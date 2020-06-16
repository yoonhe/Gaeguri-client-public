import React, { useState, useCallback, useLayoutEffect } from 'react';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { HeaderRightOcticons } from '../../../styles/common';
import { Button, StyleSheet, Text, TextInput, ScrollView, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyData = [
  {
    id: 1,
    name: '조재익',
    message: '백엔드 구하시나요?',
  },
  {
    id: 2,
    name: '윤해은',
    message: '아뇨 프론트 구해요',
  },
  {
    id: 3,
    name: '서나연',
    message: '나가세요',
  },
];

const meId: number = 1;

function Room({ navigation, route }): React.ReactElement {
  const [routerTitle, setRouterTitle] = useState<string>(route.params.title);
  const [text, setText] = useState<string>('');

  const onOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: routerTitle === '' ? 'No title' : routerTitle,
      headerRight: () => (
        <HeaderRightOcticons name='three-bars' size={24} color='black' onPress={onOpenDrawer} />
      ),
    });
  }, [navigation, routerTitle]);

  const onChangeText = useCallback(
    e => {
      setText(e);
    },
    [text],
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.profileMedium}
          source={require('../../../assets/MyProfile/profile_medium.png')}
        />
        <TextInput
          style={styles.textInput}
          value={text}
          multiline={true}
          onChangeText={onChangeText}
        />
      </ScrollView>
      <KeyboardAccessoryView alwaysVisible={true}>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            value={text}
            multiline={true}
            onChangeText={onChangeText}
          />
          {text !== '' && (
            <>
              {/* <Button style={styles.textInputButton} title='Send' onPress={() => {}} /> */}
              <Ionicons
                name='ios-send'
                size={24}
                color='black'
                onPress={() => console.log('hihi')}
              />
            </>
          )}
        </View>
      </KeyboardAccessoryView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0B132B',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  textInputButton: {
    flexShrink: 1,
  },
  profileMedium: {
    width: 67,
    height: 67,
    marginRight: 12,
  },
});

export default Room;
