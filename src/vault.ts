import { BigInt } from "@graphprotocol/graph-ts";
import {
  FundsUnlocked as FundsUnlockedEvent,
  Voted as VotedEvent,
} from "../generated/templates/Vault/Vault";
import { Vault } from "../generated/schema";

export function handleFundsUnlocked(event: FundsUnlockedEvent): void {
  let vault = new Vault(event.address.toHexString());
  if (vault) {
    vault.isUnlocked = true;
    vault.save();
  }
}

export function handleVoted(event: VotedEvent): void {
  let vault = new Vault(event.address.toHexString());
  if (vault) {
    if (event.params.isFor) {
      vault.positiveVotes = vault.positiveVotes + 1;
    }
    vault.save();
  }
}
