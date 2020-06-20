import React from 'react';
import { TagItem } from '../styles/tag';

interface TagListItemComponentProps {
  tagName: string;
}

function TagListItemComponent({ tagName }: TagListItemComponentProps): React.Component {
  return <TagItem># {tagName}</TagItem>;
}

export default TagListItemComponent;
