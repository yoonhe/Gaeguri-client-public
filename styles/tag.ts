import styled from 'styled-components/native';
import { Color } from './common';

export const TagListStyle = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5px -5px -5px;
`;

export const TextTagListStyle = styled(TagListStyle)`
  margin: 0;
`;

export const TagItemStyle = styled.View`
  position: relative;
  flex-direction: row;
  margin: 5px;
  ${props => {
    console.log('props.closeButton ? ', props.closeButton);
    return props.closeButton ? 'padding: 20px 0 10px 10px;' : 'padding: 0;';
  }}
  border: 1px solid #5dd7b9;
  border-radius: 15px;
  background: ${Color.N0};
  overflow: hidden;
`;

export const TextTagItemStyle = styled(TagItemStyle)`
  margin: 0 10px 0 0;
  padding: 0;
  border: none;
  background: transparent;
`;

export const TagTextStyle = styled.Text`
  margin-right: 30px;
  align-items: flex-start;
  color: ${Color.G300};
`;

export const TextTagTextStyle = styled(TagTextStyle)`
  margin-right: 0;
  align-items: flex-start;
  color: ${Color.N100};
  font-size: 15px;
`;

export const TagTextButtonStyle = styled.TouchableOpacity`
  flex: 1;
  position: absolute;
  top: 7px;
  right: 0;
  width: 20px;
  line-height: 25px;
  color: ${Color.G300};
  text-align: center;
`;

export const StackStyle = styled.Text`
  padding: 4px 8px;
  color: ${Color.B400};
  border: 1px solid ${Color.B400};
  height: 32px;
  border-radius: 16px;
  text-align: center;
  margin: 0 6px 6px 0;
`;

export const TagSignupItemStyle = styled.View`
  position: relative;
  flex-direction: row;
  margin: 5px;
  padding: 10px 15px;
  border: 1px solid #5dd7b9;
  border-radius: 15px;
  background: ${props => (props.selected === false ? Color.N0 : Color.G300)};
  overflow: hidden;
`;

export const TagTextSignupStyle = styled.Text`
  color: ${props => (props.selected === false ? Color.G300 : Color.N0)};
`;
