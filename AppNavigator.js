import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import * as GlobalVariables from './config/GlobalVariableContext';
import isLoggedIn from './global-functions/isLoggedIn';
import AllSetUp9Screen from './screens/AllSetUp9Screen';
import CoachesCornerScreen from './screens/CoachesCornerScreen';
import CommunityChatScreen from './screens/CommunityChatScreen';
import CreateGoals8Screen from './screens/CreateGoals8Screen';
import EatWhatWeTellYouScreen from './screens/EatWhatWeTellYouScreen';
import EatWhatYouWantInfoScreen from './screens/EatWhatYouWantInfoScreen';
import EnableNotificationScreen from './screens/EnableNotificationScreen';
import Home10ModuleTestScreen from './screens/Home10ModuleTestScreen';
import HowWeTrainScreen from './screens/HowWeTrainScreen';
import IntroImagesScreen from './screens/IntroImagesScreen';
import LiveStreamingScreen from './screens/LiveStreamingScreen';
import LogInScreen from './screens/LogInScreen';
import NutritionForPerformanceInfoScreen from './screens/NutritionForPerformanceInfoScreen';
import NutritionIndexScreen from './screens/NutritionIndexScreen';
import NutritionScreen from './screens/NutritionScreen';
import Onboarding1Screen from './screens/Onboarding1Screen';
import Onboarding2Screen from './screens/Onboarding2Screen';
import Onboarding3Screen from './screens/Onboarding3Screen';
import Onboarding4Screen from './screens/Onboarding4Screen';
import Onboarding5NotificationScreen from './screens/Onboarding5NotificationScreen';
import OnboardingEnterApp6Screen from './screens/OnboardingEnterApp6Screen';
import Option1FoundationCourseInsoScreen from './screens/Option1FoundationCourseInsoScreen';
import Option2MenusScreen from './screens/Option2MenusScreen';
import P1BodyweightWorkoutWeek1Layout2Screen from './screens/P1BodyweightWorkoutWeek1Layout2Screen';
import P1BodyweightWorkoutWeek2Layout2Screen from './screens/P1BodyweightWorkoutWeek2Layout2Screen';
import P1BodyweightWorkoutWeek3Layout2Screen from './screens/P1BodyweightWorkoutWeek3Layout2Screen';
import P1BodyweightWorkoutWeek4Layout2Screen from './screens/P1BodyweightWorkoutWeek4Layout2Screen';
import P1BodyweightWorkoutWeek5Layout2Screen from './screens/P1BodyweightWorkoutWeek5Layout2Screen';
import P1BodyweightWorkoutWeek6Layout2Screen from './screens/P1BodyweightWorkoutWeek6Layout2Screen';
import P1BodyweightWorkoutWeek7Layout2Screen from './screens/P1BodyweightWorkoutWeek7Layout2Screen';
import P1BodyweightWorkoutWeek8Layout2Screen from './screens/P1BodyweightWorkoutWeek8Layout2Screen';
import P1CourseIndexModuleTestScreen from './screens/P1CourseIndexModuleTestScreen';
import P1Week1CoachesCornerScreen from './screens/P1Week1CoachesCornerScreen';
import P1Week2CoachesCornerScreen from './screens/P1Week2CoachesCornerScreen';
import P1Week3CoachesCornerScreen from './screens/P1Week3CoachesCornerScreen';
import P1Week4CoachesCornerScreen from './screens/P1Week4CoachesCornerScreen';
import P1Week5CoachesCornerScreen from './screens/P1Week5CoachesCornerScreen';
import P1Week6CoachesCornerScreen from './screens/P1Week6CoachesCornerScreen';
import P1Week7CoachesCornerScreen from './screens/P1Week7CoachesCornerScreen';
import P1Week8CoachesCornerScreen from './screens/P1Week8CoachesCornerScreen';
import P1WeightedWorkoutWeek1Layout2Screen from './screens/P1WeightedWorkoutWeek1Layout2Screen';
import P1WeightedWorkoutWeek2Layout2Screen from './screens/P1WeightedWorkoutWeek2Layout2Screen';
import P1WeightedWorkoutWeek3Layout2Screen from './screens/P1WeightedWorkoutWeek3Layout2Screen';
import P1WeightedWorkoutWeek4Layout2Screen from './screens/P1WeightedWorkoutWeek4Layout2Screen';
import P1WeightedWorkoutWeek5Layout2Screen from './screens/P1WeightedWorkoutWeek5Layout2Screen';
import P1WeightedWorkoutWeek6Layout2Screen from './screens/P1WeightedWorkoutWeek6Layout2Screen';
import P1WeightedWorkoutWeek7Layout2Screen from './screens/P1WeightedWorkoutWeek7Layout2Screen';
import P1WeightedWorkoutWeek8Layout2Screen from './screens/P1WeightedWorkoutWeek8Layout2Screen';
import PdfDietPlannerWeek1Screen from './screens/PdfDietPlannerWeek1Screen';
import PdfDietPlannerWeek2Screen from './screens/PdfDietPlannerWeek2Screen';
import PdfDietPlannerWeek3Screen from './screens/PdfDietPlannerWeek3Screen';
import PdfDietPlannerWeek4Screen from './screens/PdfDietPlannerWeek4Screen';
import PdfDietPlannerWeek5Screen from './screens/PdfDietPlannerWeek5Screen';
import PdfDietPlannerWeek6Screen from './screens/PdfDietPlannerWeek6Screen';
import PdfDietPlannerWeek7Screen from './screens/PdfDietPlannerWeek7Screen';
import PdfDietPlannerWeek8Screen from './screens/PdfDietPlannerWeek8Screen';
import PdfEatWhatWeTellYouScreen from './screens/PdfEatWhatWeTellYouScreen';
import PdfEatWhatYouWantScreen from './screens/PdfEatWhatYouWantScreen';
import PdfMenuWeek1Screen from './screens/PdfMenuWeek1Screen';
import PdfMenuWeek2Screen from './screens/PdfMenuWeek2Screen';
import PdfMenuWeek3Screen from './screens/PdfMenuWeek3Screen';
import PdfMenuWeek4Screen from './screens/PdfMenuWeek4Screen';
import PdfMenuWeek5Screen from './screens/PdfMenuWeek5Screen';
import PdfMenuWeek6Screen from './screens/PdfMenuWeek6Screen';
import PdfMenuWeek7Screen from './screens/PdfMenuWeek7Screen';
import PdfMenuWeek8Screen from './screens/PdfMenuWeek8Screen';
import PdfTheCommunityScreen from './screens/PdfTheCommunityScreen';
import PdfTheNutritionOption1Screen from './screens/PdfTheNutritionOption1Screen';
import PdfTheNutritionScreen from './screens/PdfTheNutritionScreen';
import PdfTheTrainingScreen from './screens/PdfTheTrainingScreen';
import PdfTrackYourProgressScreen from './screens/PdfTrackYourProgressScreen';
import PrimalOnDemandScreen from './screens/PrimalOnDemandScreen';
import RecipePageStylingScreen from './screens/RecipePageStylingScreen';
import RecipeSearchStylingScreen from './screens/RecipeSearchStylingScreen';
import TheCommunityInfoScreen from './screens/TheCommunityInfoScreen';
import TrackYourProgressInfoScreen from './screens/TrackYourProgressInfoScreen';
import TrackYourStats7Screen from './screens/TrackYourStats7Screen';
import TrainingIndexScreen from './screens/TrainingIndexScreen';
import UserInfo6Screen from './screens/UserInfo6Screen';
import UserProfileScreen from './screens/UserProfileScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import parseBoolean from './utils/parseBoolean';
import showAlertUtil from './utils/showAlert';
import useNavigation from './utils/useNavigation';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor }) {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

function Community() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="CommunityChatScreen"
      screenOptions={{
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background.base,
          borderBottomColor: 'transparent',
        },
        headerTintColor: theme.colors.text.strong,
        headerTitleStyle: theme.typography.headline5,
      }}
    >
      <Stack.Screen
        name="CommunityChatScreen"
        component={CommunityChatScreen}
        options={{
          title: 'Community Chat',
        }}
      />
    </Stack.Navigator>
  );
}

function Home() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  return (
    <Stack.Navigator
      initialRouteName="Home10ModuleTestScreen"
      screenOptions={{
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home10ModuleTestScreen"
        component={Home10ModuleTestScreen}
        options={{
          title: 'Home 10 Module Test',
        }}
      />
    </Stack.Navigator>
  );
}

function Nutrition() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="NutritionIndexScreen"
      screenOptions={{
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="NutritionIndexScreen"
        component={NutritionIndexScreen}
        options={{
          title: 'Nutrition Index ',
        }}
      />
    </Stack.Navigator>
  );
}

function Training() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="TrainingIndexScreen"
      screenOptions={{
        cardStyle: { flex: 1 },
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="TrainingIndexScreen"
        component={TrainingIndexScreen}
        options={{
          title: 'Training Index',
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const theme = useTheme();

  const tabBarOrDrawerIcons = {
    Home: 'Entypo/home',
    Training: 'MaterialCommunityIcons/weight-lifter',
    Nutrition: 'Ionicons/nutrition',
    Community: 'MaterialCommunityIcons/google-circles-communities',
    Community: '',
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTransparent: false,
        tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 0)',
        tabBarActiveTintColor: palettes.App['Custom Color'],
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold' },
        tabBarStyle: {
          backgroundColor: palettes.App['App Block Grey'],
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Entypo/home" size={25} color={color} />
          ),
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Training"
        component={Training}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/weight-lifter"
              size={25}
              color={color}
            />
          ),
          title: 'Training',
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={Nutrition}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="Ionicons/nutrition" size={25} color={color} />
          ),
          title: 'Nutrition',
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/google-circles-communities"
              size={25}
              color={color}
            />
          ),
          title: 'Community',
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.base,
        },
      }}
      linking={LinkingConfiguration}
      navigationInChildEnabled={true}
    >
      <Stack.Navigator
        initialRouteName="LogInScreen"
        screenOptions={{
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AllSetUp9Screen"
          component={AllSetUp9Screen}
          options={{
            title: 'All Set Up 9',
          }}
        />
        <Stack.Screen
          name="CoachesCornerScreen"
          component={CoachesCornerScreen}
          options={{
            title: 'Coaches Corner',
          }}
        />
        <Stack.Screen
          name="CreateGoals8Screen"
          component={CreateGoals8Screen}
          options={{
            title: 'Create Goals 8',
          }}
        />
        <Stack.Screen
          name="EatWhatWeTellYouScreen"
          component={EatWhatWeTellYouScreen}
          options={{
            title: 'Eat What We Tell You',
          }}
        />
        <Stack.Screen
          name="EatWhatYouWantInfoScreen"
          component={EatWhatYouWantInfoScreen}
          options={{
            title: 'Eat What You Want Info Screen',
          }}
        />
        <Stack.Screen
          name="EnableNotificationScreen"
          component={EnableNotificationScreen}
          options={{
            title: 'Enable Notification',
          }}
        />
        <Stack.Screen
          name="HowWeTrainScreen"
          component={HowWeTrainScreen}
          options={{
            title: 'How We Train',
          }}
        />
        <Stack.Screen
          name="IntroImagesScreen"
          component={IntroImagesScreen}
          options={{
            title: 'Intro Images',
          }}
        />
        <Stack.Screen
          name="LiveStreamingScreen"
          component={LiveStreamingScreen}
          options={{
            title: 'Live Streaming',
          }}
        />
        <Stack.Screen
          name="LogInScreen"
          component={LogInScreen}
          options={{
            title: 'Log In',
          }}
        />
        <Stack.Screen
          name="NutritionForPerformanceInfoScreen"
          component={NutritionForPerformanceInfoScreen}
          options={{
            title: 'Nutrition For Performance Info Screen',
          }}
        />
        <Stack.Screen
          name="NutritionScreen"
          component={NutritionScreen}
          options={{
            title: 'Nutrition Screen',
          }}
        />
        <Stack.Screen
          name="Onboarding1Screen"
          component={Onboarding1Screen}
          options={{
            title: 'Onboarding 1',
          }}
        />
        <Stack.Screen
          name="Onboarding2Screen"
          component={Onboarding2Screen}
          options={{
            title: 'Onboarding 2 ',
          }}
        />
        <Stack.Screen
          name="Onboarding3Screen"
          component={Onboarding3Screen}
          options={{
            title: 'Onboarding 3',
          }}
        />
        <Stack.Screen
          name="Onboarding4Screen"
          component={Onboarding4Screen}
          options={{
            title: 'Onboarding 4',
          }}
        />
        <Stack.Screen
          name="Onboarding5NotificationScreen"
          component={Onboarding5NotificationScreen}
          options={{
            title: 'Onboarding 5 Notification',
          }}
        />
        <Stack.Screen
          name="OnboardingEnterApp6Screen"
          component={OnboardingEnterApp6Screen}
          options={{
            title: 'Onboarding Enter App 6',
          }}
        />
        <Stack.Screen
          name="Option1FoundationCourseInsoScreen"
          component={Option1FoundationCourseInsoScreen}
          options={{
            title: 'Option 1: Foundation Course Inso',
          }}
        />
        <Stack.Screen
          name="Option2MenusScreen"
          component={Option2MenusScreen}
          options={{
            title: 'Option 2 Menus',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek1Layout2Screen"
          component={P1BodyweightWorkoutWeek1Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 1 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek2Layout2Screen"
          component={P1BodyweightWorkoutWeek2Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 2 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek3Layout2Screen"
          component={P1BodyweightWorkoutWeek3Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 3 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek4Layout2Screen"
          component={P1BodyweightWorkoutWeek4Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 4 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek5Layout2Screen"
          component={P1BodyweightWorkoutWeek5Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 5 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek6Layout2Screen"
          component={P1BodyweightWorkoutWeek6Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 6 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek7Layout2Screen"
          component={P1BodyweightWorkoutWeek7Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 7 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1BodyweightWorkoutWeek8Layout2Screen"
          component={P1BodyweightWorkoutWeek8Layout2Screen}
          options={{
            title: 'P1 Bodyweight Workout Week 8 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1CourseIndexModuleTestScreen"
          component={P1CourseIndexModuleTestScreen}
          options={{
            title: 'P1 Course Index Module test',
          }}
        />
        <Stack.Screen
          name="P1Week1CoachesCornerScreen"
          component={P1Week1CoachesCornerScreen}
          options={{
            title: 'P1 Week1 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1Week2CoachesCornerScreen"
          component={P1Week2CoachesCornerScreen}
          options={{
            title: 'P1 Week 2 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1Week3CoachesCornerScreen"
          component={P1Week3CoachesCornerScreen}
          options={{
            title: 'P1 Week 3 Coaches Corner ',
          }}
        />
        <Stack.Screen
          name="P1Week4CoachesCornerScreen"
          component={P1Week4CoachesCornerScreen}
          options={{
            title: 'P1 Week 4 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1Week5CoachesCornerScreen"
          component={P1Week5CoachesCornerScreen}
          options={{
            title: 'P1 Week 5 Coaches Corner ',
          }}
        />
        <Stack.Screen
          name="P1Week6CoachesCornerScreen"
          component={P1Week6CoachesCornerScreen}
          options={{
            title: 'P1 Week 6 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1Week7CoachesCornerScreen"
          component={P1Week7CoachesCornerScreen}
          options={{
            title: 'P1 Week 7 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1Week8CoachesCornerScreen"
          component={P1Week8CoachesCornerScreen}
          options={{
            title: 'P1 Week 8 Coaches Corner',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek1Layout2Screen"
          component={P1WeightedWorkoutWeek1Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 1 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek2Layout2Screen"
          component={P1WeightedWorkoutWeek2Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 2 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek3Layout2Screen"
          component={P1WeightedWorkoutWeek3Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 3 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek4Layout2Screen"
          component={P1WeightedWorkoutWeek4Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 4 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek5Layout2Screen"
          component={P1WeightedWorkoutWeek5Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 5 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek6Layout2Screen"
          component={P1WeightedWorkoutWeek6Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 6 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek7Layout2Screen"
          component={P1WeightedWorkoutWeek7Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 7 Layout 2',
          }}
        />
        <Stack.Screen
          name="P1WeightedWorkoutWeek8Layout2Screen"
          component={P1WeightedWorkoutWeek8Layout2Screen}
          options={{
            title: 'P1 Weighted Workout Week 8 Layout 2',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek1Screen"
          component={PdfDietPlannerWeek1Screen}
          options={{
            title: 'Pdf Diet Planner Week 1',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek2Screen"
          component={PdfDietPlannerWeek2Screen}
          options={{
            title: 'Pdf Diet Planner Week 2',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek3Screen"
          component={PdfDietPlannerWeek3Screen}
          options={{
            title: 'Pdf Diet Planner Week 3',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek4Screen"
          component={PdfDietPlannerWeek4Screen}
          options={{
            title: 'Pdf Diet Planner Week 4',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek5Screen"
          component={PdfDietPlannerWeek5Screen}
          options={{
            title: 'Pdf Diet Planner Week 5',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek6Screen"
          component={PdfDietPlannerWeek6Screen}
          options={{
            title: 'Pdf Diet Planner Week 6',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek7Screen"
          component={PdfDietPlannerWeek7Screen}
          options={{
            title: 'Pdf Diet Planner Week 7',
          }}
        />
        <Stack.Screen
          name="PdfDietPlannerWeek8Screen"
          component={PdfDietPlannerWeek8Screen}
          options={{
            title: 'Pdf Diet Planner Week 8',
          }}
        />
        <Stack.Screen
          name="PdfEatWhatWeTellYouScreen"
          component={PdfEatWhatWeTellYouScreen}
          options={{
            title: 'Pdf Eat What We Tell You',
          }}
        />
        <Stack.Screen
          name="PdfEatWhatYouWantScreen"
          component={PdfEatWhatYouWantScreen}
          options={{
            title: 'Pdf Eat What You Want',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek1Screen"
          component={PdfMenuWeek1Screen}
          options={{
            title: 'Pdf Menu Week 1',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek2Screen"
          component={PdfMenuWeek2Screen}
          options={{
            title: 'Pdf Menu Week 2',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek3Screen"
          component={PdfMenuWeek3Screen}
          options={{
            title: 'Pdf Menu Week 3',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek4Screen"
          component={PdfMenuWeek4Screen}
          options={{
            title: 'Pdf Menu Week 4',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek5Screen"
          component={PdfMenuWeek5Screen}
          options={{
            title: 'Pdf Menu Week 5',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek6Screen"
          component={PdfMenuWeek6Screen}
          options={{
            title: 'Pdf Menu Week 6',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek7Screen"
          component={PdfMenuWeek7Screen}
          options={{
            title: 'Pdf Menu Week 7',
          }}
        />
        <Stack.Screen
          name="PdfMenuWeek8Screen"
          component={PdfMenuWeek8Screen}
          options={{
            title: 'Pdf Menu Week 8',
          }}
        />
        <Stack.Screen
          name="PdfTheCommunityScreen"
          component={PdfTheCommunityScreen}
          options={{
            title: 'Pdf The Community',
          }}
        />
        <Stack.Screen
          name="PdfTheNutritionOption1Screen"
          component={PdfTheNutritionOption1Screen}
          options={{
            title: 'Pdf The Nutrition Option 1',
          }}
        />
        <Stack.Screen
          name="PdfTheNutritionScreen"
          component={PdfTheNutritionScreen}
          options={{
            title: 'Pdf The Nutrition',
          }}
        />
        <Stack.Screen
          name="PdfTheTrainingScreen"
          component={PdfTheTrainingScreen}
          options={{
            title: 'Pdf The Training',
          }}
        />
        <Stack.Screen
          name="PdfTrackYourProgressScreen"
          component={PdfTrackYourProgressScreen}
          options={{
            title: 'Pdf Track Your Progress',
          }}
        />
        <Stack.Screen
          name="PrimalOnDemandScreen"
          component={PrimalOnDemandScreen}
          options={{
            title: 'Primal On Demand',
          }}
        />
        <Stack.Screen
          name="RecipePageStylingScreen"
          component={RecipePageStylingScreen}
          options={{
            title: 'Recipe Page Styling',
          }}
        />
        <Stack.Screen
          name="RecipeSearchStylingScreen"
          component={RecipeSearchStylingScreen}
          options={{
            title: 'Recipe Search Styling ',
          }}
        />
        <Stack.Screen
          name="TheCommunityInfoScreen"
          component={TheCommunityInfoScreen}
          options={{
            title: 'The Community Info',
          }}
        />
        <Stack.Screen
          name="TrackYourProgressInfoScreen"
          component={TrackYourProgressInfoScreen}
          options={{
            title: 'Track Your Progress Info',
          }}
        />
        <Stack.Screen
          name="TrackYourStats7Screen"
          component={TrackYourStats7Screen}
          options={{
            title: 'Track Your Stats 7',
          }}
        />
        <Stack.Screen
          name="UserInfo6Screen"
          component={UserInfo6Screen}
          options={{
            title: 'User Info 6 ',
          }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{
            title: 'User Profile',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            title: 'Bottom Tab Navigator',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
