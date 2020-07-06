import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
const profileImage = require('../assets/profile_medium.png') as string;
// import { Octicons } from '@expo/vector-icons';

// 컬러 팔레트 레퍼런스 : https://atlassian.design/guidelines/brand/color
// 숫자가 클수록 진한 색입니다.
export const Color = {
  // Blue
  B500: '#0747A6',
  B400: '#0052CC', // Primery
  B300: '#0065FF',
  B200: '#2684FF',
  B100: '#4C9AFF',
  B75: '#B3D4FF',
  B50: '#DEEBFF',
  // Green
  G500: '#339582',
  G400: '#35b19a',
  G300: '#5dd7b9', // Primery
  G200: '#67e2c3',
  G100: '#85f7dc',
  G75: '#b2f8e2',
  G50: '#e6fdf5',
  // Red
  R500: '#BF2600',
  R400: '#DE350B',
  R300: '#FF5630', // Primery
  R200: '#FF7452',
  R100: '#FF8F73',
  R75: '#FFBDAD',
  R50: '#FFEBE6',
  // Yellow
  Y500: '#FF8B00',
  Y400: '#FF991F',
  Y300: '#FFAB00', // Primery
  Y200: '#FFC400',
  Y100: '#FFE380',
  Y75: '#FFF0B3',
  Y50: '#FFFAE6',
  // Teals
  T500: '#008DA6',
  T400: '#00A3BF',
  T300: '#00B8D9', // Primery
  T200: '#00C7E6',
  T100: '#79E2F2',
  T75: '#B3F5FF',
  T50: '#E6FCFF',
  // Neutrals
  N900: '#091E42',
  N800: '#172B4D', // Primery
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
  N0: '#FFFFFF', // Primery
};

// 텍스트 : 프로필 유저네임, 큰제목용
export const TextTitleStyle = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin-top: 6px;
  color: ${Color.N800};
`;

// 텍스트 : 프로필 항목 타이틀
export const TextSubTitleStyle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  margin-top: 16px;
  color: ${Color.N500};
`;

// 텍스트 : 항목 내용 텍스트
export const TextContentStyle = styled.Text`
  font-size: 16px;
  font-weight: 300;
  line-height: 22px;
  margin-top: 8px;
  color: ${Color.N600};
`;

export const TextLinkStyle = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
  color: ${Color.B400};
`;

export const TextDateStyle = styled.Text`
  font-size: 13px;
  font-weight: 400;
  margin-top: 4px;
  color: ${Color.N300};
`;

export const TextCaptionStyle = styled.Text`
  font-size: 12px;
  font-weight: 300;
  padding: 4px 0;
  color: ${Color.N400};
`;

export const PageWrapStyle = styled.View`
  flex: 1;
  padding: 30px;
  background: #fff;
`;

export const PageWrapAlignCenterStyle = styled(PageWrapStyle)`
  justify-content: center;
`;

export const PageWrapWhiteStyle = styled.ScrollView`
  flex: 1;
  padding: 24px 20px;
  background-color: ${Color.N0};
`;

// 디바이더 : 항목 사이 가로 줄
export const DividerStyle = styled.View`
  height: 1px;
  background-color: ${Color.N30};
  margin-top: 12px;
  margin-bottom: 12px;
`;

// export const HeaderRightOcticons = styled(Octicons)`
//   marginHorizontal: 10px;
// `;
// @expo/vector-icons 때문에 에러나서 일단 View로 바꿔놓았어요 아래쪽 참고부탁드려요

export const HeaderRightOcticons = styled.View`
  marginhorizontal: 10px;
`;

// 프로필 이미지 : 마이페이지
export const ProfileMediumStyle = styled.Image.attrs(props =>
  props.image
    ? {
        source: 'https://placeimg.com/67/67/any',
      }
    : { source: profileImage },
)`
  width: 67px;
  height: 67px;
  border-radius: 34px;
  margin-right: 12px;
`;

// 프로필 이미지 : 유저 프로필 모달
export const ProfileSmallStyle = styled.Image.attrs(props =>
  props.image
    ? {
        source: 'https://placeimg.com/67/67/any',
      }
    : { source: profileImage },
)`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  margin-right: 12px;
`;
