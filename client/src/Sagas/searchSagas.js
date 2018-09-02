import { call, put } from 'redux-saga/effects';
import api from '../Api/search';
import { searchStartFailAction, searchStartSuccessAction} from '../Actions/SearchActions';

export function* searchSaga(action) {
    try {
        const resp = yield call(api.search.get, action.credentials);
        if(resp) {
            localStorage.search = resp;
            yield put(searchStartSuccessAction(resp));
        } else {
            yield put(searchStartFailAction(resp));
        }
    } catch (err) {
        console.log('INSIDE searchSaga catch err is: ', err);

        yield put(searchStartFailAction(err));
        console.log('Error in login: ', err);
        console.log('But continue');
    }
}
