import React, { useState, useCallback } from 'react';
import { TagList } from '../styles/tag';
import TagListItemComponent from './TagListItemComponent';
import { InputTextStyle } from '../styles/form';

function TagListComponent(): React.ReactElement {
  const [tagList, setTagList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const tagInputEnterEventHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const { text } = e.nativeEvent;
    console.log('text ? ', text);
    setInputValue('');
    setTagList(prev => [...prev, text]);
  }, []);

  return (
    <>
      <InputTextStyle
        onSubmitEditing={tagInputEnterEventHandler}
        placeholder="기술스택 입력 후 엔터"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <TagList>
        {tagList &&
          tagList.map((tagName, index) => <TagListItemComponent key={index} tagName={tagName} />)}
      </TagList>
    </>
  );
}

export default TagListComponent;
