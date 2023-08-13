import { BigInt } from "@graphprotocol/graph-ts";
import {
  Sale as SaleEvent,
  Transfer as TransferEvent,
} from "../generated/templates/ERC721Drop/ERC721Drop";
import {
  EditionNFT,
  DropNFT,
  EditionCollection,
  DropCollection,
} from "../generated/schema";

export function handleSale(event: SaleEvent): void {
  let edition = new EditionCollection(event.address.toHexString());
  if (edition) {
    edition.currentTokenId = edition.currentTokenId + 1;
    let editionNFT = new EditionNFT(
      event.address
        .toHexString()
        .concat("-")
        .concat(edition.currentTokenId.toString())
    );
    editionNFT.editionAddress = event.address;
    editionNFT.owner = event.transaction.from;
    editionNFT.tokenId = BigInt.fromI32(edition.currentTokenId);
    let tempEditions = edition.editions;
    if (tempEditions == null) {
      tempEditions = [];
    }
    let index = tempEditions.indexOf(editionNFT.id);
    if (index == -1) {
      tempEditions.push(editionNFT.id);
    }
    edition.editions = tempEditions;
    editionNFT.save();
    edition.save();
  } else {
    let drop = new DropCollection(event.address.toHexString());
    if (drop) {
      drop.currentTokenId = drop.currentTokenId + 1;
      let dropNFT = new DropNFT(
        event.address
          .toHexString()
          .concat("-")
          .concat(drop.currentTokenId.toString())
      );
      dropNFT.dropAddress = event.address;
      dropNFT.owner = event.transaction.from;
      dropNFT.tokenId = BigInt.fromI32(drop.currentTokenId);
      let tempDrops = drop.drops;
      if (tempDrops == null) {
        tempDrops = [];
      }
      let index = tempDrops.indexOf(dropNFT.id);
      if (index == -1) {
        tempDrops.push(dropNFT.id);
      }
      drop.drops = tempDrops;
      drop.save();
      dropNFT.save();
    }
  }
}

export function handleTransfer(event: TransferEvent): void {
  let editionNft = EditionNFT.load(
    event.address
      .toHexString()
      .concat("-")
      .concat(event.params.tokenId.toString())
  );
  if (editionNft) {
    editionNft.owner = event.params.to;
    editionNft.save();
  } else {
    let dropNft = DropNFT.load(
      event.address
        .toHexString()
        .concat("-")
        .concat(event.params.tokenId.toString())
    );
    if (dropNft) {
      dropNft.owner = event.params.to;
      dropNft.save();
    }
  }
}
