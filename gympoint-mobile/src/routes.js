import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~./pages/SignIn';
import HelpOrder from '~/pages/HelpOrder';
import CheckIn from '~/pages/CheckIn';
import NewHelpOrder from '~/pages/HelpOrder/NewHelpOrder';
import DetailsHelpOrder from '~/pages/HelpOrder/DetailsHelpOrder';

export default (signedIn = false) =>
   createAppContainer(
      createSwitchNavigator(
         {
            Sign: createSwitchNavigator({
               SignIn,
            }),
            App: createBottomTabNavigator(
               {
                  CheckIn: {
                     screen: CheckIn,
                     navigationOptions: {
                        tabBarLabel: 'Check-ins',
                        tabBarIcon: ({ tintColor }) => (
                           <Icon name="room" size={30} color={tintColor} />
                        ),
                     },
                  },
                  HelpOrder: {
                     screen: createStackNavigator(
                        {
                           HelpOrder,
                           NewHelpOrder,
                           DetailsHelpOrder,
                        },
                        {
                           defaultNavigationOptions: {
                              headerTransparent: true,
                              headerTintColor: '#EE4E62',
                              headerLayoutPreset: 'center',
                              headerLeftContainerStyle: {
                                 marginLeft: 20,
                              },
                              headerRightContainerStyle: {
                                 flexDirection: 'row',
                                 backgroundColor: '#999',
                                 marginRight: 150,
                              },
                           },
                        }
                     ),
                     navigationOptions: {
                        tabBarLabel: 'Pedir ajuda',
                        tabBarIcon: ({ tintColor }) => (
                           <Icon name="help" size={30} color={tintColor} />
                        ),
                     },
                  },
               },
               {
                  resetOnBlur: true,
                  tabBarOptions: {
                     keyboardHidesTabBar: true,
                     activeTintColor: '#ee4e62',
                     inactiveTintColor: '#999',
                     style: {
                        backgroundColor: '#fff',
                     },
                  },
               }
            ),
         },
         {
            initialRouteName: signedIn ? 'App' : 'Sign',
         }
      )
   );
