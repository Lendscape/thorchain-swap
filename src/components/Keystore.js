import React, { useState } from "react";
import { generatePhrase, validatePhrase, encryptToKeyStore } from "@xchainjs/xchain-crypto"

// Import Material UI Components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

// Import Assets
import useStyles from "../assets/constants/styles";
// Import Icons
import crypto from 'crypto'
import * as bip39 from 'bip39'
import { blake256 } from 'foundry-primitives'
import { useDispatch } from "react-redux";
import { onsave_phrase } from "../redux/actions/provider";


const Keystore = ({ isOpen, setIsOpen, setPhrase }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const hashFunction = 'sha256';
    let fileReader;
   
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [decryptionpass, setDecryptionpass] = useState('');
    const [type, setType] = useState(true);
    const [file, setFile] = useState();
  
    const decryptFromKeystore = async (keystore, password) => {
        const kdfparams = keystore.crypto.kdfparams
        console.log(kdfparams, "kdf", hashFunction, "sh")
        const derivedKey = await pbkdf2Async(
          Buffer.from(password),
          Buffer.from(kdfparams.salt, 'hex'),
          kdfparams.c,
          kdfparams.dklen,
          hashFunction,
        )
      
        const ciphertext = Buffer.from(keystore.crypto.ciphertext, 'hex')
        const mac = blake256(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
        try{
            if (mac !== keystore.crypto.mac) alert('Invalid password')
            const decipher = crypto.createDecipheriv(
              keystore.crypto.cipher,
              derivedKey.slice(0, 16),
              Buffer.from(keystore.crypto.cipherparams.iv, 'hex'),
            )
            const phrase = Buffer.concat([decipher.update(ciphertext), decipher.final()])
            return phrase.toString('utf8')
        } catch(e) {
            console.log(e)
        }
    }

    const getSeed = (phrase) => {
        if (!validatePhrase(phrase)) {
          console.log('Invalid BIP39 phrase')
        }
        return bip39.mnemonicToSeedSync(phrase)
    }
    
    const pbkdf2Async = async (
        passphrase,
        salt,
        iterations,
        keylen,
        digest,
      ) => {
        return new Promise((resolve, reject) => {
          crypto.pbkdf2(passphrase, salt, iterations, keylen, digest, (err, drived) => {
            if (err) {
              reject(err)
            } else {
              resolve(drived)
            }
          })
        })
      }

    const GenerateKeystore = async () => {
        if(password && confirmpass && password === confirmpass) {
            const phrase = generatePhrase() 
            console.log(`phrase ${phrase}`)
            const isCorrect = validatePhrase(phrase) //validate phrase if needed returns Boolean
            console.log(`Phrase valid?: ${isCorrect}`)
            const keystore = await encryptToKeyStore(phrase, password)
            console.log(keystore, "keystore")
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(keystore)
              )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "keystore.txt";
            link.click();
        } else {
            alert("Plz input password correctly");
            return;
        }
    }
   
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFileRead = async() => {
        const content = fileReader.result;
        console.log((content))
        let phrase = await decryptFromKeystore(JSON.parse(content), decryptionpass)
        setPhrase(phrase);
        dispatch(onsave_phrase(phrase))
        let seed = getSeed(phrase)
        console.log(seed, "seed")
        setIsOpen(false);
    };
      
    const handleFileChosen = (file) => {
        if(!file) {
            alert("plz choose file");
            return;
        }else if(!decryptionpass) {
            alert("plz enter password");
            return;
        }else {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file);
        }       
    };

    return (
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
                    {!type ? "CONNECT KEYSTORE" : "CREATE KEYSTORE"}
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
                    type === true?
                    <List>
                        <ListItem className="item">
                            <label>Input Password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input type="password" placeholder="Enter Password" style={{width:'100%'}} onChange={(e) => setPassword(e.target.value)}></input>
                        </ListItem>
                        <ListItem className="item">
                            <label>Confirm Password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input type="password" placeholder="0" style={{width:'100%'}} onChange={(e) => setConfirmpass(e.target.value)}></input>
                        </ListItem>
                        <ListItem style={{display:'flex',justifyContent:'space-between'}} className="item">
                            <button onClick={() => GenerateKeystore()}>CREATE</button>
                            <button onClick={() => setType(false)}>CONNECT WALLET</button>
                        </ListItem> 
                    </List>
                    :
                    <List>
                        <ListItem className="item">
                            <label>Please Select Keystore File</label>
                        </ListItem>
                        <ListItem className="item">
                            <input type="file" onChange={(e) =>  setFile(e.target.files[0])}></input>
                        </ListItem>
                        <ListItem className="item">
                            <label>Decryption password</label>
                        </ListItem>
                        <ListItem className="item">
                            <input type="password" placeholder="Password" style={{width:'100%'}} onChange={(e) => setDecryptionpass(e.target.value)}></input>
                        </ListItem>
                        <ListItem style={{display:'flex',justifyContent:'space-between'}} className="item">
                            <button onClick={() => handleFileChosen(file)}>UNLOCK</button>
                            <button onClick={() => setType(true)}>CREATE WALLET</button>
                        </ListItem>
                    </List>
                }
            </DialogContent>
        </Dialog>
    );
};

export default Keystore;
