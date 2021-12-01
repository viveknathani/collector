# collector

collector is a small tool I wrote for fun. It's job is to show the top 5 contributions of a user on GitHub. Currently, only merged pull requests count as contributions. Ranking is based on how many forks the corresponding repository has.

## why

- Personally, I am trying to see if I can integrate this with my portfolio site. Results of this service could be used for showcasing.
- For others, technical recruiters might wanna use this to form some level of judgement of users based on their GitHub profiles.

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
