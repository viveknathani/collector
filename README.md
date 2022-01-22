# collector

collector is a small tool I wrote for fun. It's job is to show the top 5 contributions of a user on GitHub. Currently, only merged pull requests count as contributions. Ranking is based on how many forks the corresponding repository has.

[![build](https://github.com/viveknathani/collector/actions/workflows/build.yaml/badge.svg)](https://github.com/viveknathani/collector/actions/workflows/build.yaml) [![deploy](https://github.com/viveknathani/collector/actions/workflows/deploy.yaml/badge.svg)](https://github.com/viveknathani/collector/actions/workflows/deploy.yaml) [![Maintainability](https://api.codeclimate.com/v1/badges/455b6da321febf56a0dc/maintainability)](https://codeclimate.com/github/viveknathani/collector/maintainability)

## why

- Personally, I built this for the [work page](https://vivekn.dev/work/) of my website.
- For others, technical recruiters might wanna use this to form some level of judgement of users based on their GitHub profiles.

## usage

```bash
$ curl https://vnxcollector.herokuapp.com/${username}
```

or visit https://collector.vivekn.dev/ 

## setup and build

```bash
npm install
npm run build
```

## run

1. make an `.env` file based on [.env.example](./env.example)
2. run by, `npm start`

## license

[MIT](./LICENSE)
