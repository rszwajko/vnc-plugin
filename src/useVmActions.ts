import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachine } from './types';
import useVncActions from './useVncActions';

const useVmActions: ExtensionHook<Action[], V1VirtualMachine> = (vm) => {
  const { name, namespace } = vm?.metadata ?? {};
  const cluster = vm?.cluster;
  const actions = useVncActions({ name, namespace, cluster });
  return [actions, true, null];
};

export default useVmActions;
