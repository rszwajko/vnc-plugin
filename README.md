# vnc-plugin

An OpenShift Console plugin that adds a VNC action via `console.action/*` extension point.

## Deployment

### OpenShift templates

```bash
oc process -f deploymnet/oc-manifest.yaml \
  -p PLUGIN_NAME=vnc-plugin \
  -p NAMESPACE=vnc-plugin \
  -p IMAGE=quay.io/rszwajko/vnc-plugin:latest \
  | oc create -f -
```

Enable the plugin:

```bash
oc patch consoles.operator.openshift.io cluster \
  --patch '{ "spec": { "plugins": ["vnc-plugin"] } }' --type=merge
