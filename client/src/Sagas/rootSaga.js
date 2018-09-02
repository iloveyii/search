import { SEARCH_START } from '../Types/Search';
import { takeLatest} from 'redux-saga/effects';
import { searchSaga } from "./searchSagas";


export default function* rootSaga() {
    yield takeLatest(SEARCH_START, searchSaga);
}
