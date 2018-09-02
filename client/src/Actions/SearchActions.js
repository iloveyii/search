import {SEARCH_START, SEARCH_START_FAIL, SEARCH_START_SUCCESS} from '../Types/Search';

export const searchStartAction = credentials => {
    return {
        type: SEARCH_START,
        credentials
    }
};

export const searchStartSuccessAction = search => ({
    type: SEARCH_START_SUCCESS,
    search
});

export const searchStartFailAction = serverErrors => {
    console.log('Inside searchStartFailAction', serverErrors);
    return {
        type: SEARCH_START_FAIL,
        serverErrors
    }
};
