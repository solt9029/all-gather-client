# Setup

```sh
yarn install
yarn start
```

Edit `baseURL` in `util.js` 

# Build

```sh
yarn build
docker build --tag=solt9029/all-gather:latest .
docker push solt9029/all-gather:latest
```
