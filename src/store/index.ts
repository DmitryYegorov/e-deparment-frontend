import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/Auth/slice";
import subjectReducer from "./reducers/Subject/slice";
import scheduleTimeReducer from "./reducers/ScheduleTime/slice";
import semesterReducer from "./reducers/Semester/slice";
import roomReducer from "./reducers/Room/slice";
import groupReducer from "./reducers/Group/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  subject: subjectReducer,
  scheduleTime: scheduleTimeReducer,
  semester: semesterReducer,
  room: roomReducer,
  group: groupReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
