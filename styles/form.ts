import styled, { css } from 'styled-components/native';

export const FormBox = styled.View`
  margin-bottom: 15px;
`;
export const RowFormWrap = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
export const Form = styled.View`
  flex: 1.3;
`;

export const InputTitle = styled.Text`
  margin-bottom: 10px;
  color: #666;
`;

export const InputText = styled.TextInput`
  padding: 15px;
  background: #fff;
`;

export const InputCountWrap = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
`;

export const InputCount = styled.TextInput`
  flex: 1;
  text-align: center;
  background: #fff;
  height: 47px;
`;

export const InputCountButton = styled.Text`
  background: #dcdcdc;
  height: 47px;
  line-height: 47px;
  width: 47px;
  text-align: center;
  border-radius: 15px;
`;
