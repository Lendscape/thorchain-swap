import React, { useState, useEffect } from "react";
import Keystore from "./Keystore";

// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";

// Import Assets
import useStyles from "../assets/constants/styles";
import { Chains } from "../assets/constants/wallets";

// Import Icons
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
    onsave_bchaddress,
    onsave_bnbaddress,
    onsave_btcaddress,
    onsave_thoraddress,
} from "../redux/actions/provider";

const Cwallet = ({ isOpen, setIsOpen }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [multichains, setMultichains] = useState(Chains);
    const [keystoreConnector, setKeystoreConnector] = useState(false);
    const xfiObject = window.xfi;

    //xdefi wallect connect function
    const request = (network, object, method, params) => {
        console.log(object, "object");
        try {
            object.request(
                {
                    method,
                    params: params,
                },
                (error, result) => {
                    if (network === "BNB") {
                        dispatch(onsave_bnbaddress(result[0]));
                    } else if (network === "BCH") {
                        dispatch(onsave_bchaddress(result[0]));
                    } else if (network === "BTC") {
                        dispatch(onsave_btcaddress(result[0]));
                    } else if (network == "THOR") {
                        dispatch(onsave_thoraddress(result[0]));
                    }
                    console.debug("callback", error, result);
                    const lastResult = { error, result };
                    console.log(lastResult, "result");
                }
            );
        } catch (e) {
            console.error(e);
            const lastResult = `Error: ${e.message}`;
            console.log(lastResult, "result");
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const onWalletConnect = () => {
        console.log(multichains, "multichain");
        for (let i = 0; i < multichains.length; i++) {
            if (multichains[i].choose === true) {
                const obj = xfiObject[multichains[i].network];
                request(multichains[i].title, obj, "request_accounts", []);
            }
        }
    };

    const onSelectChain = (index) => {
        const data = [...multichains];
        if (data[index].choose === true) {
            data[index].choose = false;
            setMultichains(data);
        } else {
            data[index].choose = true;
            setMultichains(data);
        }
    };

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={isOpen}
                maxWidth="xs"
                className={classes.cWallet}
                classes={{
                    paper: "cwallet-paper",
                }}
            >
                <Box className="title">
                    <DialogTitle color="black">Select Chain</DialogTitle>
                    <IconButton
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent className="content">
                    {
                        <List>
                            {multichains.map((item, idx) => {
                                return item.choose === true ? (
                                    <ListItem
                                        key={idx}
                                        className="item-selected"
                                        onClick={() => onSelectChain(idx)}
                                    >
                                        <ListItemIcon className="symbol">
                                            <img
                                                src={item.logo}
                                                alt={item.logo}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className="description"
                                            primary={item.title}
                                        />
                                    </ListItem>
                                ) : (
                                    <ListItem
                                        key={idx}
                                        className="item"
                                        onClick={() => onSelectChain(idx)}
                                    >
                                        <ListItemIcon className="symbol">
                                            <img
                                                src={item.logo}
                                                alt={item.logo}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className="description"
                                            primary={item.title}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    }
                </DialogContent>
                <Box className="connect">
                    <Button
                        variant="contained"
                        onClick={() => onWalletConnect()}
                    >
                        CONNECT
                    </Button>
                </Box>
            </Dialog>
            {keystoreConnector ? (
                <Keystore
                    isOpen={keystoreConnector}
                    setIsOpen={setKeystoreConnector}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default Cwallet;
