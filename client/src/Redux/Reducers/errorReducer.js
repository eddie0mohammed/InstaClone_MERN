
import * as actionTypes from '../Actions/actionTypes';

const initialState = {

    msg: {},
    status: '',
    id: ''

}


const errorReducer = (state = initialState, action) => {

    switch(action.type){

        case(actionTypes.GET_ERRORS):
            return {
                ...state,
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id

            }

        case(actionTypes.CLEAR_ERRORS):
            return {
                ...state,
                msg: {},
                status: '',
                id: ''

            }


        default:
            return state;
    }
}

export default errorReducer;