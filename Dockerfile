FROM node:18.12.0 as base
WORKDIR /home/node/app
EXPOSE 3000

FROM base as test
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn test

FROM base as development
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build
CMD yarn dev

FROM base as production
EXPOSE 80
COPY --from=development package.json yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY --from=development /home/node/app/build ./build
CMD yarn start
