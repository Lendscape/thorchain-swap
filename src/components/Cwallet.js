import React, { useState } from "react";
import Keystore from "./Keystore";

// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemIcon from "@mui/material/ListItemIcon";  
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
// Import Assets
import useStyles from "../assets/constants/styles";
// Import Icons
import CloseIcon from "@mui/icons-material/Close";
import { Wallets } from "../assets/constants/wallets";

const Cwallet = ({ isOpen, setIsOpen, setPhrase, network }) => {
    const classes = useStyles();

    const [keystoreConnector, setKeystoreConnector] = useState(false);
   
    const onThorchainConnect = async () => {
        handleClose();
        setKeystoreConnector(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={isOpen}
                maxWidth="xs"
                className={classes.cWallet}
                classes={{
                    paper: "cwallet-paper"
                }}
            >
                <Box className="title">
                    <DialogTitle color="black">
                        Select Wallet
                    </DialogTitle>
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
                            {Wallets.map((item, idx) => {
                                return (
                                    <ListItem
                                        key={idx}
                                        className="item"
                                        onClick={() => onThorchainConnect()}
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
            </Dialog>
            {
                keystoreConnector ?
                <Keystore isOpen={keystoreConnector} setIsOpen={setKeystoreConnector} setPhrase={setPhrase} /> :''
            }
            
        </>
    );
};

export default Cwallet;
