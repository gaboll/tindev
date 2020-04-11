import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from '../src/pages/Login';
import Main from '../src/pages/Main';

const switchNavigator = createSwitchNavigator({
  Login,
  Main,
})

export default AppContainer = createAppContainer(switchNavigator);