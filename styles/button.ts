import styled from 'styled-components/native';

export const BorderButtonStyle = styled.Text`
  margin-top: 10px;
  padding:15px;
  color: ${props => (props.backgroundColor ? '#fff' : '#5dd7b9')};
  background: ${props => (props.backgroundColor ? '#5dd7b9' : '#fff')};
  border: 1px solid #5dd7b9;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
`;

export const CircleButtonStyle = styled(BorderButtonStyle)`
  padding:0;
  width:30px;
  height:30px;
  line-height:30px;
  border-radius:15px;
  margin-top:0;
  margin-right:10px;
`

export const InputButtonStyle = styled.Text`
  flex-wrap: nowrap;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  overflow:hidden;
  color: ${props => (props.placeholder ? `#c7c7cd` : '#0b132b')};
`;
