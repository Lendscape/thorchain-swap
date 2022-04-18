import React, { useState, useEffect } from "react";

import { Network } from "@xchainjs/xchain-client";
import { useSelector } from "react-redux";
import { Client as bitcoinCashClient } from "@xchainjs/xchain-bitcoincash";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoincash";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import { Client as ethereumClient } from "@xchainjs/xchain-ethereum";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
// Import Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import { Assets } from "../assets/constants/wallets";
import useStyles from "../assets/constants/styles";
import {
    deposit_bch,
    deposit_bnb,
    deposit_btc,
    deposit_ltc,
    deposit_eth,
    deposit_rune,
    deposit_busd,
    deposit_usdt,
} from "../assets/constants/deposit";

const Content = () => {
    const classes = useStyles();
    const [fAmount, setFAmount] = useState();
    const [sAmount, setSAmount] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [chain, setChain] = useState("BNB");
    const [multichain, setMultichain] = useState("BNBLUNE");
    const [choose, setChoose] = useState(1);
    const phrase = useSelector((store) => store.provider.phrase);
    let network_val = useSelector((store) => store.provider.network);

    const onItemClick = (item) => {
        setChain(item.title);
        setIsOpen(false);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const onChangeFirst = (value) => {
        setFAmount(value);
        if (choose === 2) {
            if (chain === "BNB") {
                setSAmount(2553.09 * value);
            } else if (chain === "BTC") {
                setSAmount(310011 * value);
            } else if (chain === "ETH") {
                setSAmount(1027.16 * value);
            } else if (chain === "BUSD") {
                setSAmount(0.211664 * value);
            } else if (chain === "USDT") {
                setSAmount(594.631 * value);
            } else if (chain === "BCH") {
                setSAmount(7227.86 * value);
            }
        }
    };

    const onChangeSecond = (value) => {
        console.log(value, "value");
        setSAmount(value);
        if (choose === 2) {
            if (chain === "BNB") {
                setFAmount(0.000391624 * value);
            } else if (chain === "BTC") {
                setFAmount(0.00000322568 * value);
            } else if (chain === "ETH") {
                setFAmount(0.000973448 * value);
            } else if (chain === "BUSD") {
                setFAmount(4.72446 * value);
            } else if (chain === "USDT") {
                setFAmount(0.00168171 * value);
            } else if (chain === "BCH") {
                setFAmount(0.000138352 * value);
            }
        }
    };

    const Swap = async () => {};

    const Deposit = async () => {
        network_val = network_val ? network_val : 1;
        if (phrase) {
            const network =
                network_val === 1
                    ? Network.Testnet
                    : network_val === 2
                    ? Network.Mainnet
                    : Network.Stagenet;
            console.log(network, "network");
            if (choose === 1) {
                if (chain === "BTC") {
                    deposit_btc(phrase, fAmount, network);
                } else if (chain === "BCH") {
                    deposit_bch(phrase, fAmount, network);
                } else if (chain === "LTC") {
                    deposit_ltc(phrase, fAmount, network);
                } else if (chain === "BNB") {
                    deposit_bnb(phrase, fAmount, network);
                } else if (chain === "ETH") {
                    deposit_eth(phrase, fAmount, network);
                } else if (chain === "BUSD") {
                    deposit_busd(phrase, fAmount, network);
                } else if (chain === "USDT") {
                    deposit_usdt(fAmount);
                }
            } else if (choose === 2) {
                if (multichain === "BTCRUNE") {
                    deposit_btc(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BCHRUNE") {
                    deposit_bch(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BNBRUNE") {
                    deposit_bnb(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "LTCRUNE") {
                    deposit_ltc(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "ETHRUNE") {
                    deposit_eth(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "BUSDRUNE") {
                    deposit_busd(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                } else if (multichain === "USDTRUNE") {
                    deposit_usdt(phrase, fAmount, network);
                    deposit_rune(phrase, sAmount, network);
                }
            } else {
                deposit_rune(phrase, sAmount, network, chain);
            }
        } else {
            alert("Plz connect wallet!");
        }
    };

    return (
        <>
            <Box id="content" className={classes.Content}>
                <Box className="content-box">
                    <Grid container className="token">
                        <Grid>{`SEND ${fAmount ? fAmount : 0}`}</Grid>
                        <Grid container>
                            <Grid item xs={6} xl={6}>
                                <input
                                    type="number"
                                    value={fAmount ? fAmount : ""}
                                    onChange={(e) =>
                                        onChangeFirst(e.target.value)
                                    }
                                    className="amount-input"
                                ></input>
                            </Grid>
                            <Grid item xs={3} xl={3}>
                                <Button variant="outlined">MAX</Button>
                            </Grid>
                            <Grid item xs={3} xl={3}>
                                <Button variant="outlined">{chain}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="exchange">
                        <IconButton size="large">
                            <SwapVertIcon />
                        </IconButton>
                    </Grid>
                    <Grid container className="token">
                        <Grid>{`RECEIVE ${sAmount ? sAmount : 0}`}</Grid>
                        <Grid container>
                            <Grid item xs={6} xl={6}>
                                <input
                                    type="number"
                                    value={sAmount ? sAmount : ""}
                                    onChange={(e) =>
                                        onChangeSecond(e.target.value)
                                    }
                                    className="amount-input"
                                ></input>
                            </Grid>
                            <Grid item xs={3} xl={3}>
                                <Button variant="outlined">MAX</Button>
                            </Grid>
                            <Grid item xs={3} xl={3}>
                                <Button variant="outlined">RUNE</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="action">
                        <Button
                            className="actionBtn"
                            variant="outlined"
                            onClick={() => Swap()}
                        >
                            SWAP
                        </Button>
                    </Grid>
                </Box>
            </Box>

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
                    <DialogTitle color="black">SELECT ASSET</DialogTitle>
                    <IconButton
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent className="content">
                    <List>
                        {Assets.map((item, index) => (
                            <ListItem
                                key={index}
                                onClick={() => onItemClick(item)}
                                className="item activating-item"
                            >
                                <ListItemIcon className="symbol">
                                    <img
                                        src={item ? item.logo : ""}
                                        alt={item ? item.logo : ""}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    className="activating-description"
                                    primary={item ? item.title : ""}
                                    secondary={item ? item.network : ""}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Content;
