import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeviceVariables = {
  AGORA_APP_ID: '9e77f9e2fe0240139905db0f62204ffd',
  AGORA_SERVER_TOKEN:
    'Basic NjI0YTY0YjQ0ZjJhNGZkMjkzMjFiZDRmNTRjZDJmMWI6ZGM4YWZhNWM4MzBhNDAwNjljMmYyYWU1YWVlYzY3YWE=',
  AUTHORIZATION_HEADER:
    'Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.GJGBkc8O08IUh-mjXEYFqwfYIHHfnOeMztq2rPpMp4BbKRd_plPxafKmGsZwEEEM1UP24xS7CDBf7GiX0JKYhqkAhzD1wgfU.dOqDnTRCl2nRJnrvw5ZK6g.evZAydqpZ5BQl8ELj2W__-dkKjDYCU6aaHZpSY4MBimUmx2gzIpJyQB-C79XdR32gRDC90w-bhk2nOiA3mGo-B8BMLmU06qPA36beQaWRXEbPWG1wG-xmeW3REJ0Kuht.67CtNczFmk4pniVtVHvovvgqMSmNHMsadKqoSEZxmmU',
  AUTH_UUID: 1,
  IS_TABLET: false,
  PUSH_TOKEN: '',
  SPOONACULAR_API: '4378f6dd95d1417fa748848913751e0d',
  USER: {
    profile: {
      id: 39,
      name: 'Meta Tester',
      gender: 'female',
      height: 150,
      user_id: 53,
      calories: 0,
      created_at: 1740987332492,
      date_of_birth: 1109829815000,
      profile_image: {
        url: 'https://xpal-ac6c-xw7a.n7c.xano.io/vault/CbiMXkLr/wkAP6lFi8MUZduqFYMbBBv-6MnU/ZogNdw../LWScreenShot+2025-02-13+at+1.17.58%E2%80%AFPM.png',
        meta: { width: 2560, height: 1080 },
        mime: 'image/png',
        name: 'LWScreenShot 2025-02-13 at 1.17.58 PM.png',
        path: '/vault/CbiMXkLr/wkAP6lFi8MUZduqFYMbBBv-6MnU/ZogNdw../LWScreenShot+2025-02-13+at+1.17.58%E2%80%AFPM.png',
        size: 4676767,
        type: 'image',
        access: 'public',
      },
      starting_weight: 77,
      current_workout_schedule_days: 0,
      current_workout_schedule_period: '',
    },
    result_1: {
      id: 53,
      name: 'Meta Tester',
      email: 'rahul@draftbit.com',
      created_at: 1699273202374,
    },
    Daily_Tasks: {
      task_one: true,
      task_two: false,
      task_five: true,
      task_four: false,
      task_three: true,
    },
    starting_measurement: {
      id: 1,
      arm: 10,
      calf: 33,
      chest: 203,
      thigh: 10,
      waist: 10,
      user_id: 53,
      created_at: 1711536397537,
      current_weight: 333,
      measurement_date: 1711536397536,
      intital_measurements: true,
    },
  },
  __env__: 'Development',
};
export const AppVariables = {
  Email: 'some Email',
  ERROR_MESSAGE: '',
  FirstName: 'some FirstName',
  LastName: 'some LastName',
  Location: 'some Location',
  ProfilePicture: 'some ProfilePicture',
  STREAMING_CHANNEL: 'dave',
  Tags: ['some Tag'],
  WORKOUT_SCHEDULE_ENUM: ['In a week', 'In a fortnight', 'In a month'],
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();
const keySuffix = '';

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key + keySuffix, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const keys = Object.keys(DeviceVariables);
    const entries = await AsyncStorage.multiGet(
      keySuffix ? keys.map(k => k + keySuffix) : keys
    );

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key_, value]) => {
      // Keys only have the suffix appended in storage; strip the key
      // after they are retrieved
      const key = keySuffix ? key_.replace(keySuffix, '') : key_;
      return [key, value ? tryParseJson(value) : DeviceVariables[key]];
    });

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      case 'ADD_CALLBACK':
        payload();
        return state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        if (
          payload?.__env__ &&
          DeviceVariables.__env__ &&
          payload.__env__ !== DeviceVariables.__env__
        ) {
          console.log(
            `Publication Environment changed from ${payload.__env__} to ${DeviceVariables.__env__}. Refreshing variables`
          );
          dispatch({
            type: 'LOAD_FROM_ASYNC_STORAGE',
            payload: DeviceVariables,
          });
        } else {
          dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
        }
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    return new Promise(resolve => {
      dispatch({ type: 'UPDATE', payload: { key, value } });

      // Add a callback to the dispatch 'queue'
      // This guarantees that the promise is only resolved after the initial dispatch
      // has completed and allows 'awaiting' the global variable update
      const dispatchCompleteCallback = () => {
        resolve(value);
      };
      dispatch({ type: 'ADD_CALLBACK', payload: dispatchCompleteCallback });
    });
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
