import { Client as bitcoinCashClient, BCH_DECIMAL } from '@xchainjs/xchain-bitcoincash';
import { Client as bitcoinClient} from "@xchainjs/xchain-bitcoincash"
import { Client as binanceClient} from "@xchainjs/xchain-binance"
import { Client as ethereumClient, ETH_DECIMAL} from "@xchainjs/xchain-ethereum"
import { Client as litecoinClient, LTC_DECIMAL} from "@xchainjs/xchain-litecoin"
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain"
import { AssetBCH, AssetETH, AssetLTC, AssetBTC, AssetBNB, assetToBase, assetAmount } from '@xchainjs/xchain-util';

import { Network } from '@xchainjs/xchain-client';

const BCH_contract_address = "qz5fma7jqm4amplztqc63zd98xatly6aaqz0uk520w";
const BCH_fee = +3;

const BTC_contract_address = "bc1qg4lx5fhl2ampzp4na8tp5ju0am2dqznn28hxhu";
const BTC_fee = +11250;

const LTC_contract_address = "ltc1qcd5akjsefkdglscktwwd6nlsdxrd78fgjm4zjg";
const LTC_fee = +247;

const ETH_contract_address = "0x1f42326414e8f6a37026890d1992fe4bd28ede81";
const ETH_fee = +120;

const BNB_contract_address = "tbnb14zwl05sxa0wc0cjcxx5gnffeh2lexh0gamy9ca";
const BNB_fee = +11250;

export const deposit_btc = async(phrase, amount, network) => {
    const client = new bitcoinClient({network, phrase});
    const BTC_address = client.getAddress();
    console.log(BTC_address, "addres")
    const memo = `+:${AssetBTC.chain}.${AssetBTC.symbol}:${BTC_address}`;
    try {
        await client.transfer({
            asset: AssetBTC,
            amount: assetToBase(assetAmount(amount,8)),
            recipient: BTC_contract_address,
            memo,
            feeRate: BTC_fee,
        });
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}

export const deposit_bch = async(phrase, amount, network) => {
    const client = new bitcoinCashClient({network, phrase});
    const BCH_address = client.getAddress();
    const memo = `+:${AssetBCH.chain}.${AssetBCH.symbol}:${BCH_address}`;
    try {
        await client.transfer({
            asset: AssetBCH,
            amount: assetToBase(assetAmount(amount, BCH_DECIMAL)),
            recipient: BCH_contract_address, 
            memo, 
            feeRate: BCH_fee, 
        });    
        
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }

}

export const deposit_ltc = async(phrase, amount, network) => {
    const client = new litecoinClient({network, phrase});
    const LTC_address = client.getAddress();
    const memo = `+:${AssetLTC.chain}.${AssetLTC.symbol}:${LTC_address}`;
    try {
        
        await client.transfer({
            asset: AssetLTC, 
            amount: assetToBase(assetAmount(amount, LTC_DECIMAL)), 
            recipient: LTC_contract_address,
            memo,
            feeRate: LTC_fee, 
        });    
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}

export const deposit_bnb = async(phrase, amount, network) => {
    const client = new binanceClient({network, phrase});
    const BNB_address = client.getAddress();
    const memo = `+:${AssetBNB.chain}.${AssetBNB.symbol}:${BNB_address}`;
    try {
        const txID = client.transfer({
            asset: AssetBNB, 
            amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
            recipient: BNB_contract_address, 
            memo, 
            feeRate: BNB_fee, 
        });
        console.log(txID, "txID")
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}

export const deposit_busd = async(phrase, amount, network) => {
    const AssetBUSD = {
        "chain":"BNB",
        "symbol":"BUSD-74E",
        "synth":false,
        "ticker":"BUSD"
    }
    const client = new binanceClient({network, phrase});
    const memo = `+:${AssetBUSD.chain}.${AssetBUSD.symbol}`;
    try {
        const txID = client.transfer({
            asset: AssetBUSD, 
            amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
            recipient: BNB_contract_address,
            memo, 
            feeRate: BNB_fee, 
        });
        console.log(txID, "txID")
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}

export const deposit_usdt = async(phrase, amount, network) => {
    const AssetUSDT = {
        "chain":"ETH",
        "symbol":"USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306",
        "synth":false,
        "ticker":"USDT"
    }
    const client = new ethereumClient({network, phrase});
    const ETH_address = client.getAddress();
    const memo = `+:${AssetUSDT.chain}.${AssetUSDT.symbol}:${ETH_address}`;
    try {
        const txID = await client.transfer({
            asset: AssetUSDT, 
            amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
            recipient: ETH_contract_address,
            memo, 
            feeRate: ETH_fee,
        });
        console.log(txID, "txID")
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}


export const deposit_eth = async(phrase, amount, network) => {
    const client = new ethereumClient({network, phrase});
    const ETH_address = client.getAddress();
    
    const memo = `+:${AssetETH.chain}.${AssetETH.symbol}:${ETH_address}`;
    try {
        const txID = await client.transfer({
            asset: AssetETH, 
            amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
            recipient: ETH_contract_address,
            memo, 
            feeRate: ETH_fee,
        });
        console.log(txID, "txID")
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}

export const deposit_rune = async(phrase, amount, network, chain) => {
    const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
    const client = new thorchainClient({ network, phrase, chainIds });
    let memo = `+:${AssetBNB.chain}.${AssetBNB.symbol}`;
    if(chain === "BTC") {
        memo = `+:${AssetBTC.chain}.${AssetBTC.symbol}`;
    } else if(chain === "BCH") {
        memo = `+:${AssetBCH.chain}.${AssetBCH.symbol}`;
    } else if(chain === "ETH") {
        memo = `+:${AssetETH.chain}.${AssetETH.symbol}`;
    } 
    console.log(memo,"memo")
    console.log(network, "network")
    
    try{
        const txID = await client.deposit({
            amount:  assetToBase(assetAmount(amount, 8)), 
            memo, 
        });
        console.log(txID, "txID")
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e, "error")
    }
}