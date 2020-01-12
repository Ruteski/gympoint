import { takeLatest, all } from 'redux-saga/effects';
import {} from './actions';

export function* registrationList() {}

export default all([takeLatest('@plan/LIST_REQUEST', registrationList)]);
