import React from 'react';
import { TagItem } from '../styles/tag';

type Props = {
  tagName: string;
};

function TagListItemComponent({ tagName }: Props): React.Component {
  return <TagItem># {tagName}</TagItem>;
}

export default TagListItemComponent;
