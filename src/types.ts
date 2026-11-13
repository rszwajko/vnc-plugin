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
  spec: {
    template: {
      spec: {
        volumes: V1Volume[];
      };
    };
  };
  status?: object;
};

export type V1VirtualMachineInstance = V1VirtualMachine;

export interface V1Volume {
  /** CloudInitConfigDrive represents a cloud-init Config Drive user-data source. The Config Drive data will be added as a disk to the vmi. A proper cloud-init installation is required inside the guest. More info: https://cloudinit.readthedocs.io/en/latest/topics/datasources/configdrive.html */
  cloudInitConfigDrive?: V1CloudInit;
  /** CloudInitNoCloud represents a cloud-init NoCloud user-data source. The NoCloud data will be added as a disk to the vmi. A proper cloud-init installation is required inside the guest. More info: http://cloudinit.readthedocs.io/en/latest/topics/datasources/nocloud.html */
  cloudInitNoCloud?: V1CloudInit;
}

export interface V1CloudInit {
  userData?: string;
  userDataBase64?: string;
  secretRef?: unknown;
  networkData?: string;
  networkDataBase64?: string;
  networkDataSecretRef?: unknown;
}
