import React from 'react';
import { TagItemStyle, TagTextStyle } from '../styles/tag';
import { TextButton } from './ButtonComponent';

interface TagListItemComponentProps {
  tagName: string;
  index: number;
  deleteTagButtonHandler: () => void;
}

function TagListItemComponent({
  tagName,
  index,
  deleteTagButtonHandler,
}: TagListItemComponentProps) {
  return (
    <TagItemStyle>
      <TagTextStyle># {tagName}</TagTextStyle>
      <TextButton onPress={deleteTagButtonHandler.bind(null, index)}>x</TextButton>
    </TagItemStyle>
  );
}

export default TagListItemComponent;
