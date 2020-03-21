
import * as actionTypes from './actionTypes';


//return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: actionTypes.GET_ERRORS,
        payload: {msg, status, id}
    }
}


//clear errors
export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    
    }
}