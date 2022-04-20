import React, { useState, useEffect } from "react";
import Cwallet from "./Cwallet";
import useStyles from "../assets/constants/styles";
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain";
import { Network } from "@xchainjs/xchain-client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { onchange_network } from "../redux/actions/provider";

const Header = ({ phrase, setPhrase, setChainNetwork }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [thorAddress, setThorAddress] = useState("");
    const [network, setNetwork] = useState(1);
    const thoraddress_xfi = useSelector((store) => store.provider.thoraddress);
    console.log(thoraddress_xfi, "thoraddress_xfi");
    //network change
    const onChangeNetwork = (value) => {
        console.log(value, "networkval");
        setNetwork(value);
        dispatch(onchange_network(value));
    };

    const onConnectWallet = async () => {
        setIsOpenDialog(true);
    };

    useEffect(() => {
        if (phrase) {
            const network = Network.Testnet;
            const chainIds = {
                [Network.Mainnet]: "thorchain-mainnet-v1",
                [Network.Stagenet]: "thorchain-stagenet-v1",
                [Network.Testnet]: "thorchain-testnet-v2",
            };
            const client = new thorchainClient({ network, phrase, chainIds });
            setThorAddress(client.getAddress());
        }
    }, [phrase]);

    useEffect(() => {
        setChainNetwork(network);
    }, [network]);

    return (
        <header className={classes.Header}>
            <Box sx={{ minWidth: 100, maxHeight: 40 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Network
                    </InputLabel>
                    <Select
                        sx={{ maxHeight: 40 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={network}
                        label="Age"
                        onChange={(e) => onChangeNetwork(e.target.value)}
                    >
                        <MenuItem value={1}>Testnet</MenuItem>
                        <MenuItem value={2}>Chaosnet</MenuItem>
                        <MenuItem value={3}>Stagenet</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {phrase ? (
                <>
                    <CopyToClipboard text={thorAddress}>
                        <Tooltip arrow title="Copy address">
                            <IconButton size="small">
                                {thorAddress.substring(0, 3)} ...{" "}
                                {thorAddress.substring(thorAddress.length - 3)}
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </>
            ) : window.xfi && thoraddress_xfi ? (
                <>
                    <CopyToClipboard text={thoraddress_xfi}>
                        <Tooltip arrow title="Copy address">
                            <IconButton size="small">
                                {thoraddress_xfi.substring(0, 3)} ...{" "}
                                {thoraddress_xfi.substring(
                                    thoraddress_xfi.length - 3
                                )}
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </>
            ) : (
                <Button
                    variant="contained"
                    className="button-connect"
                    onClick={onConnectWallet}
                >
                    Connect
                </Button>
            )}
            <Cwallet
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
                setPhrase={setPhrase}
                network={network}
            />
        </header>
    );
};

export default Header;
