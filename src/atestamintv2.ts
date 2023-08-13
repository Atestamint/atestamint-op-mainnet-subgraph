import { BigInt } from "@graphprotocol/graph-ts";
import {
  DropCreated,
  EditionCreated,
} from "../generated/AtestamintV2/AtestamintV2";
import {
  EditionCollection,
  DropCollection,
  Vault as VaultEntity,
} from "../generated/schema";
import { Vault, ERC721Drop } from "../generated/templates";

export function handleDropCreated(event: DropCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let drop = DropCollection.load(event.params.dropAddress.toHexString());

  if (!drop) {
    drop = new DropCollection(event.params.dropAddress.toHexString());
    drop.creator = event.params.creator;
    drop.drops = [];
    drop.editionSize = event.params.editionSize;
    drop.metadataContractURI = event.params.metadataContractURI;
    drop.currentTokenId = 0;
    drop.metadataBaseURI = event.params.metadataURIBase;
    Vault.create(event.params.vaultAddress);
    ERC721Drop.create(event.params.dropAddress);
    let vault = VaultEntity.load(event.params.vaultAddress.toHexString());
    if (!vault) {
      vault = new VaultEntity(event.params.vaultAddress.toHexString());
      vault.editionSize = event.params.editionSize;
      vault.isUnlocked = false;
      vault.nftAddress = event.params.dropAddress;
      vault.positiveVotes = 0;
      vault.save();
      drop.vault = vault.id;
      drop.save();
    }
  }
}

export function handleEditionCreated(event: EditionCreated): void {
  let edition = EditionCollection.load(
    event.params.editionAddress.toHexString()
  );

  if (!edition) {
    edition = new EditionCollection(event.params.editionAddress.toHexString());
    edition.editions = [];
    edition.editionSize = event.params.editionSize;
    edition.metadataContractURI = event.params.metadataContractURI;
    edition.creator = event.params.creator;
    edition.currentTokenId = 0;
    edition.imageURI = event.params.imageURI;
    Vault.create(event.params.vaultAddress);
    ERC721Drop.create(event.params.editionAddress);
    let vault = VaultEntity.load(event.params.vaultAddress.toHexString());
    if (!vault) {
      vault = new VaultEntity(event.params.vaultAddress.toHexString());
      vault.editionSize = event.params.editionSize;
      vault.nftAddress = event.params.editionAddress;
      vault.isUnlocked = false;
      vault.positiveVotes = 0;
      vault.save();
      edition.vault = vault.id;
      edition.save();
    }
  }
}
