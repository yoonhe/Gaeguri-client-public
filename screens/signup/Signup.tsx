import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupPhaseOne from './SignupPhaseOne';
import SignupPhaseTwo from './SignupPhaseTwo';
import SignupPhaseThree from './SignupPhaseThree';
const Signup = createStackNavigator();

function SignupStack(): React.ReactElement {
  return (
    <Signup.Navigator>
      <Signup.Screen
        name="SignupPhaseOne"
        component={SignupPhaseOne}
        options={{ title: 'Signup' }}
      />
      <Signup.Screen
        name="SignupPhaseTwo"
        component={SignupPhaseTwo}
        options={{ title: 'Signup' }}
      />
      <Signup.Screen
        name="SignupPhaseThree"
        component={SignupPhaseThree}
        options={{ title: 'Signup' }}
      />
    </Signup.Navigator>
  );
}

export default SignupStack;
