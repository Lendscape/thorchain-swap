import KeystoreWallet from "../img/wallets/keystore-wallet.svg";
import XdefiWallet from "../img/wallets/xdefi-wallet.png";

//chain logo
import ThorChain from "../img/chains/thorchain.svg";
import BtcChain from "../img/chains/btcchain.png";
import EthChain from "../img/chains/ethchain.png";
import BnbChain from "../img/chains/bnbchain.svg";
import LtcChain from "../img/chains/ltcchain.png";
import BchChain from "../img/chains/bchchain.png";
import BusdCoin from "../img/chains/busd.png";
import RuneCoin from "../img/chains/rune.svg";
import UsdtCoin from "../img/chains/usdt.png";

const Wallets = [
    {
        title: "KEYSTORE CONNECT",
        description: "Connect to your keystore Wallet",
        logo: KeystoreWallet,
        connector: "thorchain",
    },
    {
        title: "XDEFI WALLET",
        description: "Connect to your Xdefi Wallet",
        logo: XdefiWallet,
        connector: "thorchain",
    },
];

const Chains = [
    {
        title: "THOR",
        logo: ThorChain,
        choose: true,
        network: "thorchain",
    },
    {
        title: "BTC",
        logo: BtcChain,
        choose: true,
        network: "bitcoin",
    },
    {
        title: "BNB",
        logo: BnbChain,
        choose: true,
        network: "binance",
    },
    // {
    //     title: "ETH",
    //     logo: EthChain,
    //     choose: true,
    //     network: "ethereum",
    // },
    {
        title: "LTC",
        logo: LtcChain,
        choose: true,
        network: "litecoin",
    },
    {
        title: "BCG",
        logo: BchChain,
        choose: true,
        network: "bitcoincash",
    },
];

const Assets = [
    {
        title: "BUSD",
        logo: BusdCoin,
        choose: true,
        type: "BEP2",
    },
    {
        title: "BTC",
        logo: BtcChain,
        choose: true,
        type: "Native",
    },
    {
        title: "BNB",
        logo: BnbChain,
        choose: true,
        type: "Native",
    },
    {
        title: "ETH",
        logo: EthChain,
        choose: true,
        type: "Native",
    },
    {
        title: "USDT",
        logo: UsdtCoin,
        choose: true,
        type: "ERC20",
    },
    {
        title: "BCH",
        logo: BchChain,
        choose: true,
        type: "Native",
    },
    {
        title: "RUNE",
        logo: RuneCoin,
        choose: true,
        type: "Native",
    },
];

export { Wallets, Assets, Chains };
