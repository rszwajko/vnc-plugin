import { load, type LoadOptions } from 'js-yaml';

import { V1CloudInit, type V1VirtualMachine, V1Volume } from './types';

type CloudinitUserDataObject = {
  passwd?: { users: { name: string }[] };
  password?: string;
  user?: string;
};

export const getCloudInitCredentials = (
  vm: V1VirtualMachine,
): { users: { name?: string; password?: string }[] } => {
  const cloudInitVolume = getCloudInitVolume(vm);
  const cloudInitData = getCloudInitData(cloudInitVolume ?? {});
  const userDataObject = safeYAMLToJS<CloudinitUserDataObject | undefined>(
    cloudInitData?.userData,
    undefined,
  );

  if (userDataObject?.user || userDataObject?.password) {
    return {
      users: [
        {
          name: userDataObject?.user,
          password: userDataObject?.password?.toString(),
        },
      ],
    };
  }

  if (userDataObject?.passwd?.users) {
    return {
      users: userDataObject.passwd.users.map((userobject) => {
        return { name: userobject?.name };
      }),
    };
  }

  return { users: [] };
};

export const getCloudInitVolume = (vm: V1VirtualMachine): V1Volume | undefined => {
  return vm?.spec?.template?.spec?.volumes?.find(
    (vol) => !!vol.cloudInitConfigDrive || !!vol.cloudInitNoCloud,
  );
};

export const getCloudInitData = (cloudInitVolume: V1Volume): V1CloudInit | undefined => {
  return cloudInitVolume?.cloudInitConfigDrive ?? cloudInitVolume?.cloudInitNoCloud;
};

const isBlankYAML = (yaml: null | string | undefined): boolean =>
  yaml === null || yaml === undefined || yaml.trim() === '';

// Safely parse yaml to js object. Returns fallback on empty input (js-yaml v5+) or parse errors.
// fallback is required so callers can pass undefined without it being replaced by a default.
export const safeYAMLToJS = <T>(
  yaml: null | string | undefined,
  fallback: T,
  options: LoadOptions = {},
): T => {
  if (isBlankYAML(yaml)) {
    return fallback;
  }

  try {
    return load(yaml, options) as T;
  } catch {
    return fallback;
  }
};
