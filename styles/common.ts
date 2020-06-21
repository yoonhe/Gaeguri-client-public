import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Octicons } from '@expo/vector-icons';

//컬러 팔레트 레퍼런스 : https://atlassian.design/guidelines/brand/color
//숫자가 클수록 진한 색입니다.
export const Color = {
  //Blue
  B500: '#0747A6',
  B400: '#0052CC', //Primery
  B300: '#0065FF',
  B200: '#2684FF',
  B100: '#4C9AFF',
  B75: '#B3D4FF',
  B50: '#DEEBFF',
  //Green
  G500: '#006644',
  G400: '#00875A',
  G300: '#36B37E', //Primery
  G200: '#57D9A3',
  G100: '#79F2C0',
  G75: '#ABF5D1',
  G50: '#E3FCEF',
  //Red
  R500: '#BF2600',
  R400: '#DE350B',
  R300: '#FF5630', //Primery
  R200: '#FF7452',
  R100: '#FF8F73',
  R75: '#FFBDAD',
  R50: '#FFEBE6',
  //Yellow
  Y500: '#FF8B00',
  Y400: '#FF991F',
  Y300: '#FFAB00', //Primery
  Y200: '#FFC400',
  Y100: '#FFE380',
  Y75: '#FFF0B3',
  Y50: '#FFFAE6',
  // Teals
  T500: '#008DA6',
  T400: '#00A3BF',
  T300: '#00B8D9', //Primery
  T200: '#00C7E6',
  T100: '#79E2F2',
  T75: '#B3F5FF',
  T50: '#E6FCFF',
  //Neutrals
  N900: '#091E42',
  N800: '#172B4D', //Primery
  N700: '#253858',
  N600: '#344563',
  N500: '#42526E',
  N400: '#505F79',
  N300: '#5E6C84',
  N200: '#6B778C',
  N100: '#7A869A',
  N90: '#8993A4',
  N80: '#97A0AF',
  N70: '#A5ADBA',
  N60: '#B3BAC5',
  N50: '#C1C7D0',
  N40: '#DFE1E6',
  N30: '#EBECF0',
  N20: '#F4F5F7',
  N10: '#FAFBFC',
  N0: '#FFFFFF', //Primery
};

// Layout Style
export const ScrollWrap = styled(ScrollView)``;

export const TextTitleStyle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 6px 0 8px 0px;
  color: ${Color.N800};
`;

export const TextSubTitleStyle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  margin: 8px 0 6px 0px;
  color: ${Color.N500};
`;

export const TextContentStyle = styled.Text`
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 0 2px 0px;
  color: ${Color.N600};
`;

export const TextLinkStyle = styled.Text`
  font-size: 15px;
  font-weight: 400;
  margin: 2px 0 2px 0px;
  color: ${Color.B400};
`;

export const TextDateStyle = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.N300};
`;

export const TextCaptionStyle = styled.Text`
  font-size: 12px;
  font-weight: 300;
  padding: 4px 0;
  color: ${Color.N400};
`;

export const PageWrap = styled.View`
  padding: 30px 30px 10px;
  flex: 1;
`;

export const PageWrapWhiteStyle = styled.ScrollView`
  flex: 1;
  padding: 24px 20px;
  background-color: ${Color.N0};
`;

export const DividerStyle = styled.View`
  height: 1px;
  background-color: ${Color.N30};
  margin-bottom: 12px;
`;

export const HeaderRightOcticons = styled(Octicons)`
  marginhorizontal: 10px;
`;
