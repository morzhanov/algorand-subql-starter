import { AlgorandTransaction } from "@subql/types-algorand";
import { Transaction, Address } from "../types";

export async function handleTransaction(
  tx: AlgorandTransaction
): Promise<void> {
  // logger.info(JSON.stringify(tx));
  if (tx.assetTransferTransaction) {
    // ensure that our address entities exist
    const senderAddress = await Address.get(tx.sender.toLowerCase());
    if (!senderAddress) {
      await new Address(tx.sender.toLowerCase()).save();
    }

    const txReceiverAddr = tx.assetTransferTransaction.receiver.toLowerCase()
    const receiverAddress = await Address.get(txReceiverAddr);
    if (!receiverAddress) {
      await new Address(txReceiverAddr).save();
    }
    // Create the new transfer entity
    const transactionEntity: Transaction = Transaction.create({
      id: tx.id,
      blockHeight: tx.confirmedRound,
      senderId: tx.sender.toLowerCase(),
      receiverId: txReceiverAddr,
      blockTime: tx.roundTime,
      amount: BigInt(tx.assetTransferTransaction.amount),
    });
    await transactionEntity.save();
  }
}
