import { Action } from '@openshift-console/dynamic-plugin-sdk';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import React, { useMemo } from 'react';

import { VirtualMachineInstanceModel } from './types';
import { asAccessReview, toObjectUrl } from './utils';

const useVncActions = ({
  name,
  namespace,
  cluster,
  userName,
  userPass,
}: {
  name?: string;
  namespace?: string;
  cluster?: string;
  userName?: string;
  userPass?: string;
}) => {
  if (!name || !namespace) {
    return [];
  }
  const actions: Action[] = useMemo(
    () => [
      {
        id: 'vm-action-open-novnc',
        insertAfter: [
          'vm-action-open-console', // id used by VM action
          'open-console', // id used by VMI action
        ],
        cta: () => window.open(toObjectUrl({ name, namespace, userName, userPass })),
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
