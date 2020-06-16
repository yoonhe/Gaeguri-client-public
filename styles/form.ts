import styled from 'styled-components/native';

export const FormBox = styled.View`
  margin-bottom: 15px;
`;
export const RowFormWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
export const Form = styled.View`
  flex: 1.6;
`;

export const InputTitle = styled.Text`
  margin-bottom: 10px;
  color: #666;
`;

export const InputText = styled.TextInput`
  padding: 15px;
  background: #fff;
  color: #0b132b;
`;

export const InputCountWrap = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 10px 0 0 0;
  width: 100%;
`;

export const InputCount = styled.TextInput`
  flex: 1;
  text-align: center;
  background: #fff;
  color: #0b132b;
`;

export const InputCountButton = styled.Text`
  background: #5dd7b9;
  height: 47px;
  line-height: 47px;
  width: 40px;
  text-align: center;
  color: #fff;
  overflow: hidden;
`;
