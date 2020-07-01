import { IMutationAction } from "../state-machines/data-layer/types"
import { Store, AnyAction } from "redux"
import { IGatsbyState } from "../redux/types"
import { actions } from "xstate"
import { IWaitingContext } from "../state-machines/waiting/types"
import reporter from "gatsby-cli/lib/reporter"

const callRealApi = async (
  event: IMutationAction,
  store?: Store<IGatsbyState, AnyAction>
): Promise<void> => {
  if (!store) {
    reporter.panic(`No redux store`)
  }
  const { type, payload } = event
  if (type in actions) {
    store.dispatch(actions[type](...payload))
  }
}

export const runMutationBatch = ({
  runningBatch = [],
  store,
}: Partial<IWaitingContext>): Promise<void> =>
  // Consume the entire batch and run actions
  Promise.all(runningBatch.map(payload => callRealApi(payload, store))).then(
    () => void 0
  )
