import styled from 'styled-components/native';

export const FormBox = styled.View`
  margin-bottom: 15px;
`;
export const RowFormWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
export const Form = styled.View`
  flex: 1.2;
`;

export const InputTitle = styled.Text`
  margin-bottom: 10px;
  color: #666;
`;

export const InputTextStyle = styled.TextInput`
  padding: 15px;
  background: #fff;
  color: #0b132b;
  border-radius: 10px;
`;

export const InputCountWrap = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin: 10px 0 0 10px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #5dd7b9;
`;

export const InputCount = styled.TextInput`
  flex: 1;
  height: 47px;
  text-align: center;
  background: #fff;
  color: #0b132b;
  border: 1px solid #5dd7b9;
  border-top-color: transparent;
  border-bottom-color: transparent;
`;

export const InputCountButton = styled.Text`
  width: 47px;
  height: 47px;
  line-height: 47px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #60d1b7;
`;
