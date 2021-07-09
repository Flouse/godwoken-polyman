FROM nervos/godwoken-js-prebuilds:v0.3.1-rc3

WORKDIR "/godwoken-polyman"

RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo "Finished installing dependencies"

COPY package*.json ./
COPY packages/client/package*.json ./packages/client/
COPY packages/godwoken/package*.json ./packages/godwoken/
COPY packages/polyjuice/package*.json ./packages/polyjuice/
COPY packages/runner/package*.json ./packages/runner/

RUN yarn install

COPY . ./

EXPOSE 6100
EXPOSE 6101

USER node
CMD ["node", "version"]
