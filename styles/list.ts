import styled from 'styled-components/native';
import { Color } from './common';

export const ProjectHistoryStyle = styled.View`
  margin-top: 8px;
  padding: 0 8px 8px;
  background: ${Color.G50};
  border: 1px solid ${Color.G300};
  border-radius: 5px;
`;

export const CardListStyle = styled.View`
  flex: 1;
  position: relative;
  margin-bottom: 10px;
  padding: 20px 30px;
  border: 1px solid ${props => (props.status === 'End' ? '#dcdcdc' : `${Color.G300}`)};
  background: ${props => (props.status === 'End' ? 'rgba(242, 242, 242, 0.5)' : '#fff')};
  border-radius: 15px;
  overflow: hidden;
`;

export const CardListTitle = styled.Text`
  margin-right: 50px;
  margin-bottom: 5px;
  font-size: 18px;
  color: ${props => (props.status === 'End' ? `${Color.N70}` : `${Color.N800}`)};
`;

export const ButtonAndTextStyle = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 15px;
`;

export const TextWrapStyle = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: auto;
  height: 100%;
`;

export const TextListStyle = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 150px;
  margin-top: 5px;
`;

export const TextListItemWrapStyle = styled.View`
  flex-direction: row;
  margin-top: 2px;

  ${props => props.index !== 0 && 'margin-left:5px;'}
`;

export const TextListItemStyle = styled.Text`
  color: ${Color.N800};
`;

export const StateWrap = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

export const StateStyle = styled.Text`
  color: ${props => {
    let color;
    switch (props.status) {
      case 'await':
        color = Color.N100;
        break;

      case 'Start':
        color = Color.G300;
        break;

      case 'End':
        color = Color.N50;
        break;
    }
    return color;
  }};
`;

export const StateShapeStyle = styled.View`
  margin-right: 7px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${props => {
    let color;
    switch (props.status) {
      case 'await':
        color = Color.G75;
        break;

      case 'Start':
        color = Color.G300;
        break;

      case 'End':
        color = Color.N50;
        break;
    }
    return color;
  }};
`;

export const NewIcon = styled.Text`
  position: absolute;
  top: -32px;
  right: -60px;
  padding: 50px 45px 3px;
  background: ${Color.G300};
  color: #fff;
  font-size: 10px;
  transform: rotate(50deg);
`;
