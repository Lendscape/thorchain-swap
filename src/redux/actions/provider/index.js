import { NETWORK, PHRASE } from "../../constants";


export const onchange_network = (params) => {
    return (dispatch) => {
        dispatch({
            type: NETWORK,
            payload: { network: params },
        });
    }
}

export const onsave_phrase = (params) => {
    return (dispatch) => {
        dispatch({
            type: PHRASE,
            payload: { phrase: params },
        });
    }
}