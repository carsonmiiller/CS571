import { Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
    return <>
        <Tab.Navigator>
            <Tab.Screen name="News" component={BadgerNewsScreen} />
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Tab.Navigator>
    </>
}

export default BadgerTabs;