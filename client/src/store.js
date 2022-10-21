import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authentication/authenticationSlice';
import modalReducer from './features/dummy-feature/components/ModalDialog/redux-slice';
import dummyDataReducer from './features/dummy-feature/dummyDataSlice';
import dummyThunkReducerForFetch from './features/dummy-feature/dummyThunkSliceForFetch';
import dummyThunkReducerForAxios from './features/dummy-feature/dummyThunkSliceForAxios';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    dummyAsyncData: dummyDataReducer,
    dummyAsyncDataFromFetch: dummyThunkReducerForFetch,
    dummyAsyncDataFromAxios: dummyThunkReducerForAxios
  }
});

export default store;
