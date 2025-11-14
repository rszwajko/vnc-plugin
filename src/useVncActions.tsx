import React from 'react';
import { Action } from '@openshift-console/dynamic-plugin-sdk';
import { useMemo } from 'react';
import { asAccessReview, toObjectUrl } from './utils';
import { VirtualMachineInstanceModel } from './types';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

const useVncActions = ({
  name,
  namespace,
  cluster,
}: {
  name: string;
  namespace: string;
  cluster?: string;
}) => {
  const actions: Action[] = useMemo(
    () => [
      {
        id: 'vm-action-open-novnc',
        insertAfter: [
          'vm-action-open-console', // id used by VM action
          'open-console', // id used by VMI action
        ],
        cta: () => window.open(toObjectUrl({ name, namespace })),
        label: 'Open noVNC',
        icon: <ExternalLinkAltIcon />,
        // multi-cluster is not supported
        disabled: !name || !namespace || !!cluster,
        accessReview: asAccessReview(
          VirtualMachineInstanceModel,
          { name, namespace },
          'get',
          'vnc',
        ),
      },
    ],
    [name, namespace, cluster],
  );

  return actions;
};

export default useVncActions;
