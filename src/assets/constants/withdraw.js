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

const BUSD_contract_address = "tbnb122wuescegyq3q47jfthzqvtk7f32j422lze084"

export const withdraw_btc = async(phrase,pool,amount) => {
    const network = Network.Testnet;
    const client = new bitcoinClient({network, phrase});
    const memo = `-:${AssetBTC.chain}.${AssetBTC.symbol}:${10000}`;
    await client.transfer({
        asset: AssetBTC,
        amount: assetToBase(assetAmount(amount,8)),
        recipient: BTC_contract_address,
        memo,
        feeRate: BTC_fee,
    });
}

export const withdraw_bch = async(phrase,pool,amount) => {
    const network = Network.Testnet;
    const client = new bitcoinCashClient({network, phrase});
    const memo = `-:${AssetBCH.chain}.${AssetBCH.symbol}:${10000}`;
    console.log(memo, "memo")
    await client.transfer({
        asset: AssetBCH,
        amount: assetToBase(assetAmount(amount, BCH_DECIMAL)),
        recipient: BCH_contract_address, 
        memo, 
        feeRate: BCH_fee, 
    });    

}


export const withdraw_busd = async(phrase,pool,amount) => {
    const AssetBUSD = {
        "chain":"BNB",
        "symbol":"BUSD-74E",
        "synth":false,
        "ticker":"BUSD"
    }
    const network = Network.Testnet;
    const client = new binanceClient({network, phrase});
    const memo = `-:${AssetBUSD.chain}.${AssetBUSD.symbol}:${10000}`;
     client.transfer({
        asset: AssetBUSD, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
        recipient: BUSD_contract_address, 
        memo, 
        feeRate: BNB_fee, 
    });
}

export const withdraw_usdt = async(phrase,pool,amount) => {
    const network = Network.Testnet;
    const AssetUSDT = {
        "chain":"ETH",
        "symbol":"USDT-0XA3910454BF2CB59B8B3A401589A3BACC5CA42306",
        "synth":false,
        "ticker":"USDT"
    }
    const client = new ethereumClient({network, phrase});
    const memo = `-:${AssetUSDT.chain}.${AssetUSDT.symbol}:${10000}`;
    await client.transfer({
        asset: AssetUSDT, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
        recipient: ETH_contract_address,
        memo, 
        feeRate: ETH_fee,
    });
}

export const withdraw_ltc = async(phrase,pool,amount) => {
    const network = Network.Testnet;
    const client = new litecoinClient({network, phrase});
    const memo = `-:${AssetLTC.chain}.${AssetLTC.symbol}:${10000}`;
    await client.transfer({
        asset: AssetLTC, 
        amount: assetToBase(assetAmount(amount, LTC_DECIMAL)), 
        recipient: LTC_contract_address,
        memo,
        feeRate: LTC_fee, 
    });    
}

export const withdraw_bnb = async(phrase,pool, amount) => {
    const network = Network.Testnet;
    const client = new binanceClient({network, phrase});
    const BNB_address = client.getAddress();
    const memo = `-:${AssetBNB.chain}.${AssetBNB.symbol}:${BNB_address}`;
    try {
         client.transfer({
            asset: AssetBNB, 
            amount: assetToBase(assetAmount(amount, ETH_DECIMAL)),
            recipient: BNB_contract_address, 
            memo, 
            feeRate: BNB_fee, 
        });
        alert("Transaction is successed!")
    } catch(e) {
        alert("Someting error!")
        console.log(e)
    }
}


export const withdraw_eth = async(phrase,pool,amount) => {
    const network = Network.Testnet;
    const client = new ethereumClient({network, phrase});
    const memo = `-:${AssetETH.chain}.${AssetETH.symbol}:${10000}`;
    await client.transfer({
        asset: AssetETH, 
        amount: assetToBase(assetAmount(amount, ETH_DECIMAL)), 
        recipient: ETH_contract_address,
        memo, 
        feeRate: ETH_fee,
    }); 
}

export const withdraw_rune = async(phrase, pool, amount) => {
    const network = Network.Testnet;
    const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
    const client = new thorchainClient({ network, phrase, chainIds });
   	const memo = `-:${pool}:${10000}`
    try{
        await client.deposit({
            amount: assetToBase(assetAmount(amount, 8)), 
            memo, 
        });
        alert("transaction success")
    }catch(e) {
        console.log(e)
        alert("Something error")
    }
}