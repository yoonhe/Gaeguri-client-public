import styled from 'styled-components/native';
import { Color } from './common';

export const ProjectHistoryStyle = styled.View`
  margin-top: 8px;
  padding: 0 8px;
  background: ${Color.G50};
  border: 1px solid ${Color.G300};
  border-radius: 5px;
`;

export const CardListStyle = styled.View`
  margin-bottom: 10px;
  padding: 20px 30px;
  border: 1px solid #dcdcdc;
  background: #fff;
  border-radius: 15px;
`;

export const CardListTitle = styled.Text`
  margin-bottom: 5px;
  font-size: 20px;
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

export const TextListItemStyle = styled.Text`
  margin-left: 3px;
`;

export const StateWrap = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

export const StateStyle = styled.Text`
  color: #50555c;
`;

export const StateShapeStyle = styled.View`
  margin-right: 7px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${Color.G75};
`;
