import styled from 'styled-components/native';
import { Color } from './common';
export const TagList = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const TagItem = styled.Text`
  margin: 0 5px;
`;

export const StackStyle = styled.Text`
  padding: 4px 8px;
  color: ${Color.B400};
  border: 1px solid ${Color.B400};
  height: 32px;
  border-radius: 16px;
  text-align: center;
  margin: 0 6px 6px 0;
`;
