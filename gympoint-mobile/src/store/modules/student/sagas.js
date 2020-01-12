import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
   try {
      const { studentId } = payload;
      const { status } = yield call(api.get, `students/${studentId}/checkins`);

      if (status !== 200) {
         Alert.alert('ID Incorreto 01!', 'Verifique seus dados');
         return;
      }

      yield put(signInSuccess(studentId));
   } catch (err) {
      Alert.alert('ID Incorreto!', 'Verifique seus dados.');
   }
}

export default all([takeLatest('@student/SIGN_IN_REQUEST', signIn)]);
