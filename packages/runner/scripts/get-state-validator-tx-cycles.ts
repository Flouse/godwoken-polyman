import { Hash } from "@ckb-lumos/base";
import { HexStringToBigInt } from "ckb-js-toolkit";
import JSBI from "jsbi";

// connect to CKB_RPC WebSocket
const WebSocket = require("faye-websocket");
let ws = new WebSocket.Client("ws://localhost:28114");

ws.on('open', function (event) {
  console.log('open');
  ws.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe","params": ["new_transaction"]}');
});

ws.on('message', function (event) {
  const data = JSON.parse(event.data);
  console.debug(data);
  if (data.method !== "subscribe") return;

  // Parse Response
  const result = JSON.parse(data.params?.result);
  const transaction = result?.transaction;
  console.debug("transaction:", transaction);
  const cycles = HexStringToBigInt(result?.cycles);
  console.debug("cycles:", String(cycles));

  recordTopCyclesTx(transaction?.hash, cycles);
});

ws.on('close', function (event) {
  console.log('close', event.code, event.reason);
  ws = null;
});

let maxCycles = JSBI.BigInt(0);
let topHash: Hash;
function recordTopCyclesTx(txHash: Hash, cycles: JSBI) {
  console.warn(txHash, cycles.toString());
  console.warn("max:\n", topHash, maxCycles.toString());
  if (JSBI.lessThanOrEqual(cycles, maxCycles)) return;

  maxCycles = cycles;
  topHash = txHash;
  // TODO write to file
}
