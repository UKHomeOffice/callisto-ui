#!/usr/bin/env bash

set -o errexit
set -o nounset

# default values
export DRONE_DEPLOY_TO=${DRONE_DEPLOY_TO:?'[error] Please specify which cluster to deploy to.'}
export KUBE_NAMESPACE=${KUBE_NAMESPACE=callisto}
export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/${DRONE_DEPLOY_TO}.crt

case ${DRONE_DEPLOY_TO} in
  'callisto')
    export KUBE_SERVER="https://kube-api-notprod.notprod.acp.homeoffice.gov.uk"
    export KUBE_TOKEN=${KUBE_TOKEN_ACP_NOTPROD}
    ;;
esac

echo "--- kube api url: ${KUBE_SERVER}"
echo "--- namespace: ${KUBE_NAMESPACE}"

echo "--- deploying application"
if ! kd --timeout=5m \
  -f kube/networkpolicy.yaml \
  -f kube/service.yaml \
  -f kube/deployment.yaml \
  -f kube/ingress.yaml; then
  echo "[error] failed to deploy application"
  exit 1
fi
