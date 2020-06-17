import styled from 'styled-components/native';

export const BorderButtonStyle = styled.Text`
  margin-top: 10px;
  padding: 15px;
  color: ${props => (props.backgroundColor ? '#fff' : '#5dd7b9')};
  background: ${props => (props.backgroundColor ? '#5dd7b9' : '#fff')};
  border: 1px solid #5dd7b9;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
`;
