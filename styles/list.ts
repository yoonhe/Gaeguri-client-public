import styled from 'styled-components';
import { Color } from './common';

export const CardListStyle = styled.View`
  position: relative;
  margin-bottom: 10px;
  padding: 20px 30px;
  border: 1px solid #dcdcdc;
  background: #fff;
  border-radius: 15px;
  min-height: 140px;
  overflow: hidden;
`;

export const CardListTitle = styled.Text`
  margin-right: 50px;
  margin-bottom: 5px;
  font-size: 18px;
  color: ${Color.N800};
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
`;

export const TextListItemWrapStyle = styled.View`
  flex-direction: row;

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
  color: ${Color.N100};
`;

export const StateShapeStyle = styled.View`
  margin-right: 7px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${Color.G75};
`;

export const NewIcon = styled.Text`
  position: absolute;
  top: -32px;
  right: -60px;
  padding: 50px 45px 3px;
  background: #5dd7b9;
  color: #fff;
  transform: rotate(50deg);
`;
