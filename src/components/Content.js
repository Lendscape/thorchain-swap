import React, { useState, useEffect } from "react";

import { Network } from "@xchainjs/xchain-client";
import { useSelector } from "react-redux";
import {
    Client as bitcoinCashClient,
    BCH_DECIMAL,
} from "@xchainjs/xchain-bitcoincash";
import { Client as bitcoinClient } from "@xchainjs/xchain-bitcoincash";
import { Client as binanceClient } from "@xchainjs/xchain-binance";
import {
    Client as ethereumClient,
    ETH_DECIMAL,
} from "@xchainjs/xchain-ethereum";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import {
    AssetBCH,
    AssetETH,
    AssetLTC,
    AssetBTC,
    AssetRuneNative,
    AssetBNB,
    assetToBase,
    assetAmount,
} from "@xchainjs/xchain-util";

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
import axios from "axios";

const Content = () => {
    const classes = useStyles();
    const [sendAmount, setSendAmount] = useState();
    const [receiveAmount, setReceiveAmount] = useState();
    const [isOpenAssetMdl, setIsOpenAssetMdl] = useState(false);
    const [sendAsset, setSendAsset] = useState("BNB");
    const [receiveAsset, setReceiveAsset] = useState("RUNE");
    const [choose, setChoose] = useState(1);
    const thoraddress_xfi = useSelector((store) => store.provider.thoraddress);
    const bnbaddress_xfi = useSelector((store) => store.provider.bnbaddress);
    const bchaddress_xfi = useSelector((store) => store.provider.bchaddress);
    const bitcoinaddress_xfi = useSelector(
        (store) => store.provider.btcaddress
    );
    const [bchPrice, setBchPrice] = useState([0, 0]);
    const [usdtPrice, setUsdtPrice] = useState([0, 0]);
    const [bnbPrice, setBnbPrice] = useState([0, 0]);
    const [btcPrice, setBtcPrice] = useState([0, 0]);
    const [busdPrice, setBusdPrice] = useState([0, 0]);
    const [ethPrice, setEthPrice] = useState([0, 0]);
    const [runePrice, setRunePrice] = useState(4.7);
    const [priceData, setPriceData] = useState({});
    const phrase = useSelector((store) => store.provider.phrase);
    let network_val = useSelector((store) => store.provider.network);
    const xfiObject = window.xfi;

    const onAssetClick = (item) => {
        if (choose === 1) {
            setSendAsset(item.title);
        } else {
            setReceiveAsset(item.title);
        }
        setIsOpenAssetMdl(false);
    };

    const onGetCoinPrice = async () => {
        let data = await axios.get(
            `https://testnet.midgard.thorchain.info/v2/pools`
        );
        if (data.data) {
            let pdata = {};
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].asset === "BCH.BCH") {
                    setBchPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.BCH = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                } else if (
                    data.data[i].asset ===
                    "ETH.USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306"
                ) {
                    setUsdtPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.USDT = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                } else if (data.data[i].asset === "BNB.BNB") {
                    setBnbPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.BNB = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                } else if (data.data[i].asset === "BNB.BUSD-74E") {
                    setBusdPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.BUSD = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                } else if (data.data[i].asset === "BTC.BTC") {
                    setBtcPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.BTC = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                } else if (data.data[i].asset === "ETH.ETH") {
                    setEthPrice([
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ]);
                    pdata.ETH = [
                        data.data[i].assetPrice,
                        data.data[i].assetPriceUSD,
                    ];
                }
            }
            pdata.RUNE = [1, 4.7];
            console.log(pdata, "pricedata");
            setPriceData(pdata);
        }
    };

    const onCloseAssetModal = () => {
        setIsOpenAssetMdl(false);
    };

    const onClickAssetMdl = (type) => {
        setChoose(type);
        setIsOpenAssetMdl(true);
    };

    const onClickExchange = () => {
        const sAsset = sendAsset;
        const rAsset = receiveAsset;
        setReceiveAsset(sAsset);
        setSendAsset(rAsset);
    };

    const onChangeFirst = (value) => {
        let senddata = priceData[sendAsset];
        let recvdata = priceData[receiveAsset];
        console.log(senddata, recvdata, "ss");
        console.log(recvdata[1] / senddata[1], "yy");
        let recvamount = value * (senddata[1] / recvdata[1]);
        setReceiveAmount(recvamount);
        setSendAmount(value);
    };

    const onChangeSecond = (value) => {
        setReceiveAmount(value);
    };

    const Swap = async () => {
        network_val = network_val ? network_val : 1;
        const network =
            network_val === 1
                ? Network.Testnet
                : network_val === 2
                ? Network.Mainnet
                : Network.Stagenet;
        const chainIds = {
            [Network.Mainnet]: "thorchain-mainnet-v1",
            [Network.Stagenet]: "thorchain-stagenet-v1",
            [Network.Testnet]: "thorchain-testnet-v2",
        };
        const AssetBUSD = {
            chain: "BNB",
            symbol: "BUSD-74E",
            synth: false,
            ticker: "BUSD",
        };
        const AssetUSDT = {
            chain: "ETH",
            symbol: "USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306",
            synth: false,
            ticker: "USDT",
        };
        //contract address and tx fee
        const BCH_contract_address =
            "qz5fma7jqm4amplztqc63zd98xatly6aaqz0uk520w";
        const BCH_fee = +3;

        const BTC_contract_address =
            "bc1qg4lx5fhl2ampzp4na8tp5ju0am2dqznn28hxhu";
        const BTC_fee = +11250;

        const ETH_contract_address =
            "0x1f42326414e8f6a37026890d1992fe4bd28ede81";
        const ETH_fee = +120;

        const BNB_contract_address =
            "tbnb14zwl05sxa0wc0cjcxx5gnffeh2lexh0gamy9ca";
        const BNB_fee = +11250;
        if (phrase) {
            //thorchain
            const thorclient = new thorchainClient({
                network,
                phrase,
                chainIds,
            });
            const thoraddress = thorclient.getAddress();
            //binance
            const bnbclient = new binanceClient({ network, phrase });
            const bnbaddress = bnbclient.getAddress();
            //bitcoin cash
            const bchclient = new bitcoinCashClient({ network, phrase });
            const bchaddress = bchclient.getAddress();
            //bitcoin
            const bitcoinclient = new bitcoinClient({ network, phrase });
            const bitcoinaddress = bitcoinclient.getAddress();
            //ethereum
            const ethclient = new ethereumClient({ network, phrase });
            const ethaddress = ethclient.getAddress();

            //memo(when receive token is thorchain token)
            let memo = `=:${AssetRuneNative.chain}.${AssetRuneNative.symbol}:${thoraddress}`;
            if (receiveAsset === "BNB") {
                memo = `=:${AssetBNB.chain}.${AssetBNB.symbol}:${bnbaddress}`;
            } else if (receiveAsset === "BCH") {
                memo = `=:${AssetBCH.chain}.${AssetBCH.symbol}:${bchaddress}`;
            } else if (receiveAsset === "BTC") {
                memo = `=:${AssetBTC.chain}.${AssetBTC.symbol}:${bitcoinaddress}`;
            } else if (receiveAsset === "ETH") {
                memo = `=:${AssetETH.chain}.${AssetETH.symbol}:${ethaddress}`;
            } else if (receiveAsset === "BUSD") {
                memo = `=:${AssetBUSD.chain}.${AssetBUSD.symbol}:${bnbaddress}`;
            } else if (receiveAmount === "USDT") {
                memo = `=:${AssetUSDT.chain}.${AssetUSDT.symbol}:${ethaddress}`;
            }

            if (sendAsset === "BNB") {
                try {
                    const txID = bnbclient.transfer({
                        asset: AssetBNB,
                        amount: assetToBase(
                            assetAmount(sendAmount, ETH_DECIMAL)
                        ),
                        recipient: BNB_contract_address,
                        memo,
                        feeRate: BNB_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "BTC") {
                try {
                    const txID = await bitcoinclient.transfer({
                        asset: AssetBTC,
                        amount: assetToBase(assetAmount(sendAmount, 8)),
                        recipient: BTC_contract_address,
                        memo,
                        feeRate: BTC_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "BCH") {
                try {
                    const txID = await bchclient.transfer({
                        asset: AssetBCH,
                        amount: assetToBase(
                            assetAmount(sendAmount, BCH_DECIMAL)
                        ),
                        recipient: BCH_contract_address,
                        memo,
                        feeRate: BCH_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "ETH") {
                try {
                    const txID = await ethclient.transfer({
                        asset: AssetETH,
                        amount: assetToBase(
                            assetAmount(sendAmount, ETH_DECIMAL)
                        ),
                        recipient: ETH_contract_address,
                        memo,
                        feeRate: ETH_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "BUSD") {
                try {
                    const txID = await bnbclient.transfer({
                        asset: AssetBUSD,
                        amount: assetToBase(
                            assetAmount(sendAmount, ETH_DECIMAL)
                        ),
                        recipient: BNB_contract_address,
                        memo,
                        feeRate: BNB_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "USDT") {
                try {
                    const txID = await ethclient.transfer({
                        asset: AssetUSDT,
                        amount: assetToBase(
                            assetAmount(sendAmount, ETH_DECIMAL)
                        ),
                        recipient: ETH_contract_address,
                        memo,
                        feeRate: ETH_fee,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e);
                }
            } else if (sendAsset === "RUNE") {
                try {
                    const txID = await thorclient.deposit({
                        amount: assetToBase(assetAmount(sendAmount, 8)),
                        memo,
                    });
                    console.log(txID, "txID");
                    alert("Transaction is successed!");
                } catch (e) {
                    alert("Someting error!");
                    console.log(e, "error");
                }
            }
        } else if (window.xfi) {
            //memo(when receive token is thorchain token)
            let memo = `=:${AssetRuneNative.chain}.${AssetRuneNative.symbol}:${thoraddress_xfi}`;
            if (receiveAsset === "BNB") {
                memo = `=:${AssetBNB.chain}.${AssetBNB.symbol}:${bnbaddress_xfi}`;
            } else if (receiveAsset === "BCH") {
                memo = `=:${AssetBCH.chain}.${AssetBCH.symbol}:${bchaddress_xfi}`;
            } else if (receiveAsset === "BTC") {
                memo = `=:${AssetBTC.chain}.${AssetBTC.symbol}:${bitcoinaddress_xfi}`;
            } else if (receiveAsset === "BUSD") {
                memo = `=:${AssetBUSD.chain}.${AssetBUSD.symbol}:${bnbaddress_xfi}`;
            }
            if (sendAsset === "BNB") {
                try {
                    window.xfi.binance.request(
                        {
                            method: "transfer",
                            params: [
                                {
                                    from: bnbaddress_xfi,
                                    recipient: bnbaddress_xfi,
                                    amount: {
                                        amount:
                                            Number(sendAmount) *
                                            1000000000000000000,
                                        decimals: ETH_DECIMAL,
                                    },
                                    memo,
                                },
                            ],
                        },
                        (error, result) => {
                            const lastResult = { error, result };
                            console.log(lastResult, "lastResult");
                        }
                    );
                } catch (e) {
                    console.log(e, "error");
                }
            } else if (sendAsset === "BTC") {
                console.log(bitcoinaddress_xfi, "add");
                console.log(memo, "memo");
                xfiObject.bitcoin.request(
                    {
                        method: "transfer",
                        params: [
                            {
                                from: bitcoinaddress_xfi,
                                recipient: bitcoinaddress_xfi,
                                feeRate: BTC_fee,
                                amount: {
                                    amount: Number(sendAmount) * 100000000,
                                    decimals: 8,
                                },
                                memo,
                            },
                        ],
                    },
                    (error, result) => {
                        console.debug(error, result);
                        const lastResult = { error, result };
                        console.log(lastResult, "result");
                    }
                );
            } else if (sendAsset === "BCH") {
                xfiObject.bitcoincash.request(
                    {
                        method: "transfer",
                        params: [
                            {
                                from: bchaddress_xfi,
                                recipient: bchaddress_xfi,
                                feeRate: BCH_fee,
                                amount: {
                                    amount: Number(sendAmount) * 100000000,
                                    decimals: BCH_DECIMAL,
                                },
                                memo,
                            },
                        ],
                    },
                    (error, result) => {
                        const lastResult = { error, result };
                        console.log(lastResult, "result");
                    }
                );
            } else if (sendAsset === "BUSD") {
                xfiObject.binance.request(
                    {
                        method: "transfer",
                        params: [
                            {
                                asset: AssetBUSD,
                                from: bnbaddress_xfi,
                                recipient: bnbaddress_xfi,
                                amount: {
                                    amount:
                                        Number(sendAmount) *
                                        1000000000000000000,
                                    decimals: 18,
                                },
                                memo,
                            },
                        ],
                    },
                    (error, result) => {
                        console.debug(error, result);
                        const lastResult = { error, result };
                        console.log(lastResult, "result");
                    }
                );
            } else if (sendAsset === "RUNE") {
                console.log(sendAmount, "thor");
                console.log(memo, "thor");
                try {
                    xfiObject.thorchain.request(
                        {
                            method: "deposit",
                            params: [
                                {
                                    asset: AssetRuneNative,
                                    from: thoraddress_xfi,
                                    recipient: thoraddress_xfi,
                                    amount: {
                                        amount: Number(sendAmount) * 100000000,
                                        decimals: 8,
                                    },
                                    memo,
                                },
                            ],
                        },
                        (error, result) => {
                            const lastResult = { error, result };
                            console.log(lastResult, "result");
                        }
                    );
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            alert("Please connect your wallet!");
        }
    };

    useEffect(() => {
        onGetCoinPrice();
    }, []);

    return (
        <>
            <Box id="content" className={classes.Content}>
                <Box className="content-box">
                    <Grid container className="sendtoken">
                        <Grid>{`SEND ${
                            sendAmount ? sendAmount : 0
                        } ${sendAsset}`}</Grid>
                        <Grid container>
                            <Grid item xs={6} xl={6}>
                                <input
                                    type="number"
                                    value={sendAmount ? sendAmount : ""}
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
                                <Button
                                    variant="outlined"
                                    onClick={() => onClickAssetMdl(1)}
                                >
                                    {sendAsset}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="exchange">
                        <IconButton
                            onClick={() => onClickExchange()}
                            size="large"
                        >
                            <SwapVertIcon />
                        </IconButton>
                    </Grid>
                    <Grid container className="receivetoken">
                        <Grid>{`RECEIVE ${
                            receiveAmount ? receiveAmount : 0
                        } ${receiveAsset}`}</Grid>
                        <Grid container>
                            <Grid item xs={6} xl={6}>
                                <input
                                    type="number"
                                    value={receiveAmount ? receiveAmount : ""}
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
                                <Button
                                    variant="outlined"
                                    onClick={() => onClickAssetMdl(2)}
                                >
                                    {receiveAsset}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="action">
                        <Button
                            className="actionBtn"
                            variant="contained"
                            size="large"
                            onClick={() => Swap()}
                        >
                            SWAP
                        </Button>
                    </Grid>
                </Box>
            </Box>

            <Dialog
                onClose={onCloseAssetModal}
                open={isOpenAssetMdl}
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
                            setIsOpenAssetMdl(false);
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
                                onClick={() => onAssetClick(item)}
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
                                    secondary={item ? item.type : ""}
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
