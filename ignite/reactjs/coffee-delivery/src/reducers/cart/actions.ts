import { Item } from './reducer'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY',
  DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY',
}

export type Action =
  | {
      type: ActionTypes.ADD_ITEM
      payload: {
        newItem: Item
      }
    }
  | {
      type:
        | ActionTypes.REMOVE_ITEM
        | ActionTypes.INCREMENT_ITEM_QUANTITY
        | ActionTypes.DECREMENT_ITEM_QUANTITY
      payload: {
        itemId: Item['id']
      }
    }

export function addItemAction(newItem: Item) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      newItem,
    },
  } satisfies Action
}

export function removeItemAction(itemId: Item['id']) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId,
    },
  } satisfies Action
}

export function incrementItemQuantityAction(itemId: Item['id']) {
  return {
    type: ActionTypes.INCREMENT_ITEM_QUANTITY,
    payload: {
      itemId,
    },
  } satisfies Action
}

export function decrementItemQuantityAction(itemId: Item['id']) {
  return {
    type: ActionTypes.DECREMENT_ITEM_QUANTITY,
    payload: {
      itemId,
    },
  } satisfies Action
}
