import styled from 'styled-components/native';
export const TagListStyle = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5px -5px -5px;
`;

export const TagItemStyle = styled.View`
  position: relative;
  flex-direction: row;
  margin: 5px;
  padding: 10px 0 10px 10px;
  color: #5dd7b9;
  border: 1px solid #5dd7b9;
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
`;

export const TagTextStyle = styled.Text`
  margin-right: 30px;
  align-items: flex-start;
  color: #5dd7b9;
`;

export const TagTextButtonStyle = styled.Text`
  position: absolute;
  top: -5px;
  right: 5px;
  width: 20px;
  height: 30px;
  line-height: 25px;
  color: #5dd7b9;
  text-align: center;
`;
