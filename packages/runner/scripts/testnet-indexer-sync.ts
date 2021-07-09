import { initializeConfig } from "@ckb-lumos/config-manager";
import { Indexer } from "@ckb-lumos/indexer";
import { RPC } from "ckb-js-toolkit";
import path from "path";

process.env.LUMOS_CONFIG_NAME = "AGGRON4";
initializeConfig();

// sync CKB Layer 1 indexer data on Aggron Testnet
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const indexerPath = path.resolve(__dirname, "../db/ckb-indexer-testnet");
const https = require('https');
const httpsAliveAgent = new https.Agent({ keepAlive: true });
const rpcOptions = { agent: httpsAliveAgent };
let indexer = new Indexer(CKB_RPC_URL, indexerPath, { rpcOptions });
indexer.startForever();

const ckb_rpc = new RPC(CKB_RPC_URL, rpcOptions);
async function checkStatus(blockDifference = 3): Promise<Boolean> {
  const ckbTip = BigInt(await ckb_rpc.get_tip_block_number());
  const tip = await indexer.tip();
  const indexedNumber = tip ? BigInt(tip.block_number) : 0n;
  if (ckbTip - indexedNumber <= blockDifference) {
    return Promise.resolve(true);
  }
  const percentage = Math.floor(Number(indexedNumber)/Number(ckbTip)*10_000)/100;
  console.debug(`Syncing ${indexedNumber} / ${ckbTip}, ${percentage}% completed.`);
  return Promise.resolve(false);
}

let timeID = setInterval(checkStatus, 6666);
setTimeout(() => {
  console.log("stop and exit")
  clearInterval(timeID);
  process.exit(0);
}, 666666);
