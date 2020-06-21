import styled from 'styled-components/native';
export const TagListStyle = styled.View`
import { Color } from './common';
export const TagList = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5px -5px -5px;
`;

export const TagItemStyle = styled.View`
  position: relative;
  flex-direction: row;
  margin: 5px;
  padding: 10px 0 10px 10px;
  color: #5dd7b9;
  border: 1px solid #5dd7b9;
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

export const TagTextStyle = styled.Text`
  margin-right: 30px;
  align-items: flex-start;
  color: #5dd7b9;
`;

export const TagTextButtonStyle = styled.Text`
  position: absolute;
  top: -5px;
  right: 5px;
  width: 20px;
  height: 30px;
  line-height: 25px;
  color: #5dd7b9;
  text-align: center;
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
