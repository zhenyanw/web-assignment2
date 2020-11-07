import { combineReducers } from 'redux';

export default combineReducers({
    // Note here that comebineReducers will pass on the part of the state with the same name
    // as the key to the reducer function
    // So if our state is {sum: 10, banana: 'yellow'}
    // Only the '10' is passed to the reducer
})