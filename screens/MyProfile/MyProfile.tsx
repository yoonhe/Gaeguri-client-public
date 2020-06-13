import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Button,
	Alert
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import Constants from 'expo-constants';

// interface UserData {
// 	title: string;
// 	data: string;
// }
const Header = createStackNavigator();

const userData = [
	{
		title: '짧은 소개',
		data: `안녕하세요, 김코딩 입니다. 백엔드 개발을 좋아하는 프런트엔드 개발자입니다. 요즘은 장고와 리액트로 PROGRESSIVE WEB APP을 빠르게 제작하는 것에 빠져있습니다. 효율적 시간관리에 관한 서비스에 관심이 많습니다. 만나서 반갑습니다.`
	},
	{
		title: '기술 스택',
		data: '리액트, 노드, 자바'
	}
];

const Item = ({ title, data }) => (
	<View style={styles.item}>
		<Text style={styles.subTitle}>{title}</Text>
		<Text style={styles.text}>{data}</Text>
	</View>
);

function MyProfileScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.profile}>
				<Image
					style={styles.profileMedium}
					source={require('../../assets/MyProfile/profile_medium.png')}
				/>
				<Text style={styles.username}>김코딩</Text>
				<Button
					title='편집'
					onPress={() => navigation.navigate('Edit')}
				></Button>
			</View>
			<FlatList
				data={userData}
				renderItem={({ item }) => (
					<Item title={item.title} data={item.data} />
				)}
				keyExtractor={item => item.data}
			/>
		</SafeAreaView>
	);
}

function EditScreen() {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>프로필 편집</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: Constants.statusBarHeight,
		marginHorizontal: 16,
		padding: 16,
		marginTop: 114
	},
	profile: {
		// flex: 1,
		flexDirection: 'row'
	},
	profileMedium: {
		width: 67,
		height: 67,
		marginRight: 12
	},
	username: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 16,
		marginTop: 8
	},
	item: {
		backgroundColor: '#fff',
		padding: 4,
		marginVertical: 8
	},
	subTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: '#fff'
	}
});

export default MyProfileScreen;
