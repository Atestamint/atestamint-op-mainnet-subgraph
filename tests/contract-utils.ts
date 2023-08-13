import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { DropCreated, EditionCreated } from "../generated/Contract/Contract"

export function createDropCreatedEvent(
  creator: Address,
  dropAddress: Address,
  vaultAddress: Address,
  editionSize: BigInt,
  metadataURIBase: string,
  metadataContractURI: string
): DropCreated {
  let dropCreatedEvent = changetype<DropCreated>(newMockEvent())

  dropCreatedEvent.parameters = new Array()

  dropCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "dropAddress",
      ethereum.Value.fromAddress(dropAddress)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultAddress",
      ethereum.Value.fromAddress(vaultAddress)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "editionSize",
      ethereum.Value.fromUnsignedBigInt(editionSize)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataURIBase",
      ethereum.Value.fromString(metadataURIBase)
    )
  )
  dropCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataContractURI",
      ethereum.Value.fromString(metadataContractURI)
    )
  )

  return dropCreatedEvent
}

export function createEditionCreatedEvent(
  creator: Address,
  editionAddress: Address,
  vaultAddress: Address,
  editionSize: BigInt,
  imageURI: string,
  metadataContractURI: string
): EditionCreated {
  let editionCreatedEvent = changetype<EditionCreated>(newMockEvent())

  editionCreatedEvent.parameters = new Array()

  editionCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  editionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "editionAddress",
      ethereum.Value.fromAddress(editionAddress)
    )
  )
  editionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultAddress",
      ethereum.Value.fromAddress(vaultAddress)
    )
  )
  editionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "editionSize",
      ethereum.Value.fromUnsignedBigInt(editionSize)
    )
  )
  editionCreatedEvent.parameters.push(
    new ethereum.EventParam("imageURI", ethereum.Value.fromString(imageURI))
  )
  editionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadataContractURI",
      ethereum.Value.fromString(metadataContractURI)
    )
  )

  return editionCreatedEvent
}
