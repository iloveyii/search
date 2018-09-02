import { call, put } from 'redux-saga/effects';
import api from '../Api/search';
import { searchStartFailAction, searchStartSuccessAction} from '../Actions/SearchActions';

export function* userCreateSaga(action) {
    const user = yield call(api.users.signup, action.user);
    yield put(userCreateSuccessSaga(user));
}

export function* userCreateSuccessSaga(user) {

}

export function* searchSaga(action) {
    try {
        console.log('action', action);
        const resp = yield call(api.search.get, action.credentials);
        console.log('resp', resp);
        if(resp) {
            localStorage.search = resp;
            yield put(searchStartSuccessAction(resp));
        } else {
            console.log('No usr token')
            yield put(searchStartFailAction(resp));
        }
    } catch (err) {
        console.log('INSIDE searchSaga catch err is: ', err);

        yield put(searchStartFailAction(err));
        console.log('Error in login: ', err);
        console.log('But continue');
    }
}
