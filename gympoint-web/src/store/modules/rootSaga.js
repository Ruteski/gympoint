import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import plan from './plan/sagas';

export default function* rootSaga() {
   yield all([auth, user, plan]);
}
