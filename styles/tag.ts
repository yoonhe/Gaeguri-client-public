import styled from 'styled-components/native';
import { Color } from './common';
export const TagListStyle = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: ${props => (props.type === 'text' ? '0' : '5px -5px -5px')};
`;

export const TagItemStyle = styled.View`
  position: relative;
  flex-direction: row;
  margin: ${props => (props.type === 'text' ? '0 10px 0 0' : '5px')};
  padding: ${props => (props.type === 'text' ? '0' : '10px 0 10px 10px')};
  border: ${props => (props.type === 'text' ? 'none' : '1px solid #5dd7b9')};
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

export const TagTextStyle = styled.Text`
  margin-right: ${props => (props.type === 'text' ? '0' : '30px')};
  align-items: flex-start;
  color: ${props => (props.type === 'text' ? '#8A929E' : '#5dd7b9')};
  font-size: ${props => props.type === 'text' && '16px'};
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
