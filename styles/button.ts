import styled from 'styled-components/native';
import { Color } from './common';

export const HeaderButtonStyle = styled.Text`
  width: 60px;
  height: 36px;
  padding: 8px;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 5px;
  text-align: center;
  color: ${Color.N0};
  background: ${Color.G300};
`;

export const ButtonWrap = styled.View`
  margin-top: -10px;
  margin-right: -10px;
  flex-direction: row;
`;

export const ButtonBox = styled.TouchableOpacity`
  ${props => props.row && 'flex:1; margin-right:10px'};
`;

export const BorderButtonStyle = styled.Text`
  width: 100%;
  margin-top: 10px;
  padding: ${props => (props.small ? '10px' : '15px')};
  color: ${props => (props.backgroundColor ? '#fff' : `${Color.G300}`)};
  background: ${props => {
    let color;
    switch (props.backgroundColor) {
      case true:
        color = `${Color.G300}`;
        break;
      case 'disabled':
        color = '#dcdcdc';
        break;
      default:
        color = '#fff';
        break;
    }
    return color;
  }};
  border: 1px solid ${props => (props.backgroundColor === 'disabled' ? '#dcdcdc' : '#5dd7b9')};
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
`;

export const BorderButtonSmallStyle = styled.Text`
  margin-top: 10px;
  padding: 8px;
  color: ${props => (props.backgroundColor ? '#fff' : '#5dd7b9')};
  background: ${props => (props.backgroundColor ? '#5dd7b9' : '#fff')};
  border: 1px solid #5dd7b9;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
`;

export const ButtonText = styled.Text`
  color: #5dd7b9;
`;

export const CircleButtonStyle = styled(BorderButtonStyle)`
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  margin-top: 0;
  margin-right: 10px;
`;

export const InputButtonStyle = styled.Text`
  flex-wrap: nowrap;
  padding: 15px;
  background: ${Color.N0};
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  overflow: hidden;
  color: ${props => (props.placeholder ? `#c7c7cd` : '#0b132b')};
`;

export const PickerButtonStyle = styled.Text`
  background: #fff;
  padding: 20px;
  text-align: center;
  border: solid #dcdcdc;
  border-width: 0;
  ${props => props.index !== 0 && 'border-top-width: 1px;'}
  ${props => props.disabled && 'opacity:0.3;'}
`;
