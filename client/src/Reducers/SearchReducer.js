import {SEARCH_START, SEARCH_START_FAIL, SEARCH_START_SUCCESS} from '../Types/Search';

const SearchReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case SEARCH_START:
            return { ...state,  serverErrors: {} };
        case SEARCH_START_SUCCESS:
            return { ...state, ...action };
        case SEARCH_START_FAIL:
            return Object.assign( {}, { ...state, serverErrors: action.serverErrors, news: 770 } );
        default:
            return state;
    }
};

export default SearchReducer;
