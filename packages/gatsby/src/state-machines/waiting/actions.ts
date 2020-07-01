import { AssignAction, assign, ActionFunctionMap } from "xstate"
import { IWaitingContext } from "./types"
import { AnyAction } from "redux"

/**
 * Event handler used when we're not ready to process node mutations.
 * Instead we add it to a batch to process when we're next idle
 */
export const addNodeMutation: AssignAction<IWaitingContext, AnyAction> = assign(
  ({ nodeMutationBatch }, event) => {
    return {
      nodeMutationBatch: nodeMutationBatch.concat([event.payload]),
    }
  }
)

export const waitingActions: ActionFunctionMap<IWaitingContext, AnyAction> = {
  addNodeMutation,
}
