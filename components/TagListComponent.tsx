import React, { useState, useCallback } from 'react';
import { TagListStyle } from '../styles/tag';
import TagListItemComponent from './TagListItemComponent';
import { InputTextStyle } from '../styles/form';
import produce from 'immer';

function TagListComponent({ tagList, setTagList }): React.ReactElement {
  const [inputValue, setInputValue] = useState('');

  const tagInputEnterEventHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const { text } = e.nativeEvent;
      if (text !== '') {
        setInputValue('');
        setTagList(
          produce(draft => {
            draft.push(text);
          }),
        );
      }
    },
    [tagList],
  );

  const deleteTagButtonHandler = useCallback(
    index => {
      setTagList(
        produce(draft => {
          draft.splice(index, 1);
        }),
      );
    },
    [tagList],
  );

  return (
    <>
      <InputTextStyle
        onSubmitEditing={tagInputEnterEventHandler}
        placeholder="기술스택 입력 후 엔터"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <TagListStyle>
        {tagList &&
          tagList.map((tagName, index) => (
            <TagListItemComponent
              deleteTagButtonHandler={deleteTagButtonHandler}
              key={index}
              index={index}
              tagName={tagName}
            />
          ))}
      </TagListStyle>
    </>
  );
}

export default TagListComponent;
