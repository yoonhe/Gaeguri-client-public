import styled from 'styled-components/native';
import { View, Text, ScrollView } from 'react-native';
import { Octicons } from '@expo/vector-icons';

// export const AppWrap = `
//   * {
//     padding:0,
//     margin:0,
//     background:red;
//   }
// `;

// Layout Style
export const ScrollWrap = styled(ScrollView)``;

export const PageWrap = styled.View`
  padding: 30px 30px 10px;
  flex: 1;
`;

export const HeaderRightOcticons = styled(Octicons)`
  marginHorizontal: 10px;
`;
