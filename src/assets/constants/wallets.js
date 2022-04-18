import KeystoreWallet from "../img/wallets/keystore-wallet.svg";

//chain logo
import ThorChain from "../img/chains/thorchain.svg"
import BtcChain from "../img/chains/btcchain.png"
import EthChain from "../img/chains/ethchain.png"
import BnbChain from "../img/chains/bnbchain.svg"
import LtcChain from "../img/chains/ltcchain.png"
import BchChain from "../img/chains/bchchain.png"
import BusdCoin from "../img/chains/busd.png"
import UsdtCoin from "../img/chains/usdt.png"

const Wallets = [
    {
        title: "KEYSTORE CONNECT",
        description: "Connect to your keystore Wallet",
        logo: KeystoreWallet,
        connector: 'thorchain',
    }
];

const Chains = [
    {
        title : "THOR",
        logo : ThorChain,
        choose : true,
        network: "thorchain"
    },
    {
        title : "BTC",
        logo : BtcChain,
        choose : true,
        network: "bitcoin"
    },
    {
        title : "BNB",
        logo : BnbChain,
        choose : true,
        network: "binance"
    },
    {
        title : "ETH",
        logo : EthChain,
        choose : true,
        network : "ethereum"
    },
    {
        title : "LTC",
        logo : LtcChain,
        choose : true,
        network : "litecoin"
    },
    {
        title : "BCG",
        logo : BchChain,
        choose : true,
        network : "bitcoincash"
    },
]

const Assets = [
    {
        title : "BUSD",
        logo : BusdCoin,
        choose : true,
        network: "BEP2"
    },
    {
        title : "BTC",
        logo : BtcChain,
        choose : true,
        network: "Native"
    },
    {
        title : "BNB",
        logo : BnbChain,
        choose : true,
        network: "Native"
    },
    {
        title : "ETH",
        logo : EthChain,
        choose : true,
        network : "Native"
    },
    {
        title : "USDT",
        logo : UsdtCoin,
        choose : true,
        network : "ERC20"
    },
    {
        title : "BCH",
        logo : BchChain,
        choose : true,
        network : "Native"
    },
]

export { Wallets, Assets, Chains };
