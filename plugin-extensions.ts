import type {
  ConsolePluginBuildMetadata,
  EncodedExtension,
} from '@openshift-console/dynamic-plugin-sdk-webpack';

import { ResourceActionProvider } from '@openshift-console/dynamic-plugin-sdk';

export const exposedModules: ConsolePluginBuildMetadata['exposedModules'] = {
  useVmActions: './useVmActions',
  useVmiActions: './useVmiActions',
};

const extensions: EncodedExtension[] = [
  {
    type: 'console.action/resource-provider',
    properties: {
      model: {
        group: 'kubevirt.io',
        version: 'v1',
        kind: 'VirtualMachineInstance',
      },
      provider: {
        $codeRef: 'useVmiActions',
      },
    },
  } as EncodedExtension<ResourceActionProvider>,
  {
    type: 'console.action/resource-provider',
    properties: {
      model: {
        group: 'kubevirt.io',
        version: 'v1',
        kind: 'VirtualMachine',
      },
      provider: {
        $codeRef: 'useVmActions',
      },
    },
  } as EncodedExtension<ResourceActionProvider>,
];

export default extensions;
