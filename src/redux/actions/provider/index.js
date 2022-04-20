import {
    BCHADDRESS,
    BNBADDRESS,
    BTCADDRESS,
    NETWORK,
    PHRASE,
    THORADDRESS,
} from "../../constants";

export const onchange_network = (params) => {
    return (dispatch) => {
        dispatch({
            type: NETWORK,
            payload: { network: params },
        });
    };
};

export const onsave_phrase = (params) => {
    return (dispatch) => {
        dispatch({
            type: PHRASE,
            payload: { phrase: params },
        });
    };
};

export const onsave_thoraddress = (params) => {
    return (dispatch) => {
        dispatch({
            type: THORADDRESS,
            payload: { thoraddress: params },
        });
    };
};

export const onsave_bnbaddress = (params) => {
    return (dispatch) => {
        dispatch({
            type: BNBADDRESS,
            payload: { bnbaddress: params },
        });
    };
};

export const onsave_bchaddress = (params) => {
    return (dispatch) => {
        dispatch({
            type: BCHADDRESS,
            payload: { bchaddress: params },
        });
    };
};

export const onsave_btcaddress = (params) => {
    return (dispatch) => {
        dispatch({
            type: BTCADDRESS,
            payload: { btcaddress: params },
        });
    };
};
