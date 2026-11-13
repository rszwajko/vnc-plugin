# Image info: https://catalog.redhat.com/en/software/containers/ubi9/nodejs-22/66431d1785c5c3a31edd24f1
# registry.access.redhat.com/ubi9/nodejs-22:9.9-1794504241
FROM registry.access.redhat.com/ubi9/nodejs-22@sha256:623c4bda86a58190bb410ff85b7b3f8eaf16d8ead17d57388b9db1b6672c1742 AS builder

USER root

COPY . /opt/app-root/src
WORKDIR /opt/app-root/src

ENV HUSKY=0

RUN npm config set fetch-timeout 1200000
RUN --mount=type=secret,id=github_token,env=GITHUB_READ_PACKAGES_TOKEN npm ci --ignore-scripts --legacy-peer-deps
RUN npm run build

# Image info: https://catalog.redhat.com/en/software/containers/ubi9/nginx-124/657b066b6c1bc124a1d7ff39
# registry.access.redhat.com/ubi9/nginx-124:9.9-1794514344
FROM registry.access.redhat.com/ubi9/nginx-124@sha256:728394512286300a97db9519960fc98459e5cf8dd576eea0c31b8bdd9369a487

COPY --from=builder /opt/app-root/src/dist /usr/share/nginx/html
USER 1001

ENTRYPOINT ["nginx", "-g", "daemon off;"]
