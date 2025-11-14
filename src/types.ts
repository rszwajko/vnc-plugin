import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';

export const VirtualMachineInstanceModel: K8sModel = {
  label: 'VirtualMachineInstance',
  labelPlural: 'VirtualMachineInstances',
  apiVersion: 'v1',
  apiGroup: 'kubevirt.io',
  plural: 'virtualmachineinstances',
  abbr: 'VMI',
  namespaced: true,
  kind: 'VirtualMachineInstance',
  id: 'virtualmachineinstance',
  color: '#002F5D',
  crd: true,
};

export const VirtualMachineModel: K8sModel = {
  label: 'VirtualMachine',
  labelPlural: 'VirtualMachines',
  apiVersion: 'v1',
  apiGroup: 'kubevirt.io',
  plural: 'virtualmachines',
  abbr: 'VM',
  namespaced: true,
  kind: 'VirtualMachine',
  id: 'virtualmachine',
  crd: true,
};

export type V1VirtualMachine = {
  cluster?: string;
  apiVersion?: string;
  kind?: string;
  metadata?: {
    name?: string;
    namespace?: string;
  };
  spec: object;
  status?: object;
};

export type V1VirtualMachineInstance = V1VirtualMachine;
