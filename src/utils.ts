import {
  AccessReviewResourceAttributes,
  K8sModel,
  K8sVerb,
} from '@openshift-console/dynamic-plugin-sdk';
import vncPage from './vncPage';

/**
 * function to build AccessReviewResourceAttributes from a resource
 *
 * Kubevirt-plugin utility method from https://github.com/kubevirt-ui/kubevirt-plugin/blob/a22a98b8ef58aa77fefb26ad1d5150c02949f9c4/src/utils/resources/shared.ts#L199
 *
 * Non standard cluster prop is used to extend the functionality (multicluster use case)
 *
 * @param model - k8s model
 * @param obj - resource
 * @param verb - verb
 * @param subresource - subresource
 * @returns AccessReviewResourceAttributes
 */
export const asAccessReview = (
  model: K8sModel,
  obj: { name: string; namespace: string; cluster?: string },
  verb: K8sVerb,
  subresource?: string,
): AccessReviewResourceAttributes & { cluster?: string } => {
  if (!obj) {
    return null;
  }
  return {
    cluster: obj?.cluster,
    group: model.apiGroup,
    name: obj?.name,
    namespace: obj?.namespace,
    resource: model.plural,
    subresource,
    verb,
  };
};

export const isConnectionEncrypted = () => window.location.protocol === 'https:';
export const SECURE = '443';
export const INSECURE = '80';

export const injectIntoHtml = (page: string, data: { defaults: object; mandatory: object }) =>
  page.replace(
    '<head>',
    `
    <head>
    <script id="data" type="application/json">
    ${JSON.stringify(data)}
    </script>
    `,
  );

export const toObjectUrl = ({ name, namespace }: { name: string; namespace: string }) => {
  const path = `api/kubernetes/apis/subresources.kubevirt.io/v1/namespaces/${namespace}/virtualmachineinstances/${name}/vnc`;
  const host = window.location.hostname;
  const port = window.location.port || (isConnectionEncrypted() ? SECURE : INSECURE);
  const objectUrl = URL.createObjectURL(
    new Blob([injectIntoHtml(vncPage, { defaults: { port }, mandatory: { host, path } })], {
      type: 'text/html',
    }),
  );
  return objectUrl;
};
