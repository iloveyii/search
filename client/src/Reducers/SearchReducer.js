import {SEARCH_START, SEARCH_START_FAIL, SEARCH_START_SUCCESS} from '../Types/Search';

const SearchReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case 'User.Update':
            return action.payload.user;
        case SEARCH_START:
            console.log('INSIDE SEARCH_START', action)
            return { ...state,  serverErrors: {} };
        case SEARCH_START_SUCCESS:
            return { ...state, ...action };
        case SEARCH_START_FAIL:
            console.log('Inside SEARCH_START_FAIL reducer', action.type);
            return Object.assign( {}, { ...state, serverErrors: action.serverErrors, news: 770 } );
        default:
            return state;
    }
};

export default SearchReducer;
