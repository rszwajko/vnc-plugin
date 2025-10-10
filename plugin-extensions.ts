import type {
  ConsolePluginBuildMetadata,
  EncodedExtension,
} from '@openshift-console/dynamic-plugin-sdk-webpack';

import { ActionProvider } from '@openshift-console/dynamic-plugin-sdk';

export const exposedModules: ConsolePluginBuildMetadata['exposedModules'] = {
  useVmActions: './useVmActions',
  useVmiActions: './useVmiActions',
};

const extensions: EncodedExtension[] = [
  {
    type: 'console.action/provider',
    properties: {
      contextId: 'kubevirt.io~v1~VirtualMachineInstance',
      provider: {
        $codeRef: 'useVmiActions',
      },
    },
  } as EncodedExtension<ActionProvider>,
  {
    type: 'console.action/provider',
    properties: {
      contextId: 'kubevirt.io~v1~VirtualMachine',
      provider: {
        $codeRef: 'useVmActions',
      },
    },
  } as EncodedExtension<ActionProvider>,
];

export default extensions;
