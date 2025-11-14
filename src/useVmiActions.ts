import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachineInstance } from './types';
import useVncActions from './useVncActions';

const useVmiActions: ExtensionHook<Action[], V1VirtualMachineInstance> = (
  vmi: V1VirtualMachineInstance,
) => {
  const { name, namespace } = vmi?.metadata ?? {};
  const actions = useVncActions({ name, namespace });
  return [actions, true, null];
};

export default useVmiActions;
