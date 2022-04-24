import { Client as bitcoinCashClient } from '@xchainjs/xchain-bitcoincash';
import { Client as bitcoinClient} from "@xchainjs/xchain-bitcoincash"
import { Client as binanceClient} from "@xchainjs/xchain-binance"
import { Client as ethereumClient} from "@xchainjs/xchain-ethereum"
import { Client as thorchainClient } from "@xchainjs/xchain-thorchain"
import { Network } from '@xchainjs/xchain-client';
import axios from "axios"

export const getPoolInfo = async(network, phrase) => {
    // const BCH_client = new bitcoinCashClient({network, phrase});
    // const BCH_address = BCH_client.getAddress();
    // const BTC_client = new bitcoinClient({network, phrase});
    // const BTC_address = BTC_client.getAddress();
    // const BNB_client = new binanceClient({network, phrase});
    // const BNB_address = BNB_client.getAddress();
    // const ETH_client = new ethereumClient({network, phrase});
    // const ETH_address = ETH_client.getAddress();
    // const chainIds = {[Network.Mainnet]: 'thorchain-mainnet-v1', [Network.Stagenet]: 'thorchain-stagenet-v1', [Network.Testnet]: 'thorchain-testnet-v2'}
    // const RUNE_client = new thorchainClient({ network, phrase, chainIds });
    // const RUNE_address = RUNE_client.getAddress();
    // try {
    //     const BTC_list = await axios.get(`https://testnet.midgard.thorchain.info/v2/member/${BTC_address}`)
    //     if(BTC_list.data) {
    //         setBTCList(BTC_list.data.pools)
    //     }
    // } catch(e) {
    //     console.log(e)
    // }
    // try {
    //     const BNB_list = await axios.get(`https://testnet.midgard.thorchain.info/v2/member/${BNB_address}`)
    //     if(BNB_list.data) {
    //         setBNBList(BNB_list.data.pools)
    //     }
    // }catch(e) {
    //     console.log(e)
    // }
    // try {
    //     const ETH_list = await axios.get(`https://testnet.midgard.thorchain.info/v2/member/${ETH_address}`)
    //     if(ETH_list.data) {
    //         setETHList(ETH_list.data.pools)
    //     }
    // } catch(e) {
    //     console.log(e)
    // }
    // try {
    //     const RUNE_list = await axios.get(`https://testnet.midgard.thorchain.info/v2/member/${RUNE_address}`)
    //     if(RUNE_list.data) {
    //         console.log(RUNE_list.data.pools, "runelist")
    //         setRUNEList(RUNE_list.data.pools)
    //     }
    // } catch(e) {
    //     console.log(e)
    // }
    // try {
    //     const BCH_list = await axios.get(`https://testnet.midgard.thorchain.info/v2/member/${BCH_address}`)
    //     if(BCH_list.data) {
    //         console.log(BCH_list.data.pools, "bchlist" )
    //         setBCHList(BCH_list.data.pools)
    //     }
    // }catch(e) {
    //     console.log(e)
    // }
}