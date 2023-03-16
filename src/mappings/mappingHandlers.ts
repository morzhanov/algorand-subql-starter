import { AlgorandTransaction } from "@subql/types-algorand";
import { Transaction } from "../types";

export async function handleTransaction(
  tx: AlgorandTransaction
): Promise<void> {
  // logger.info(JSON.stringify(tx));
  if (tx.assetTransferTransaction) {
    // Create the new transfer entity
    const transactionEntity: Transaction = Transaction.create({
      id: tx.id,
      blockNumber: tx.confirmedRound,
      blockTimestamp: tx.roundTime,
      from: tx.sender.toLowerCase(),
      to: tx.assetTransferTransaction.receiver.toLowerCase(),
      amount: BigInt(tx.assetTransferTransaction.amount),
    });
    await transactionEntity.save();
  }
}
