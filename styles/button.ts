import styled from 'styled-components/native';

export const BorderButtonStyle = styled.Text`
  margin-top: ${props => (props.marginTop ? `${props.marginTop}` : '10px')};
  ${props => props.marginRight && `margin-right : ${props.marginRight}px`}
  ${props => props.width && `width:${props.width}px`}
  ${props => props.height && `height:${props.height}px`}
  ${props => (props.height ? `line-height:${props.height}px` : 'padding: 15px;')}
  color: ${props => (props.backgroundColor ? '#fff' : '#5dd7b9')};
  background: ${props => (props.backgroundColor ? '#5dd7b9' : '#fff')};
  border: 1px solid #5dd7b9;
  border-radius: ${props => (props.radius ? `${props.radius}px` : `5px`)};
  text-align: center;
  overflow: hidden;
`;
