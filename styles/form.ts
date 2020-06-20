import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const FormBoxStyle = styled.View`
  flex: 1;
  margin-bottom: 15px;
`;
export const RowFormWrapStyle = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  align-items: flex-end;
`;
export const FormStyle = styled.View`
  flex: 1.2;
`;

export const InputTitleStyle = styled.Text`
  margin-bottom: 10px;
  color: #666;
`;

export const InputBoxStyle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InputTextStyle = styled(TextInput)`
  flex-wrap: nowrap;
  flex: 1;
  padding: 15px;
  min-height: 50px;
  background: #fff;
  color: #0b132b;
  border-radius: 10px;
`;

export const InputCountWrapStyle = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin: 10px 0 0 10px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #5dd7b9;
`;

export const InputCountStyle = styled.TextInput`
  flex: 1;
  height: 47px;
  text-align: center;
  background: #fff;
  color: #0b132b;
  border: 1px solid #5dd7b9;
  border-top-color: transparent;
  border-bottom-color: transparent;
`;

export const InputCountButtonStyle = styled.Text`
  width: 47px;
  height: 47px;
  line-height: 47px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #60d1b7;
`;
