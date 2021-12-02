import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { addForkCount, extractFromPR, handleError } from './util';
import { PullRequest } from './interface';
import express from 'express';
import cors from 'cors';
dotenv.config();

// Collect PRs, extract information, sort by fork count
async function job(user: string) {

    const host = "https://api.github.com";
    const endpoint = "/search/issues";
    const query = `?q=is%3Apr+is%3Amerged+author%3A${user}`;

    try {

        const response = await fetch(host + endpoint + query);
        const temp = await response.json();

        const result: PullRequest[] = [];
        for (let i = 0; i < temp.items.length; ++i) {
            result.push(extractFromPR(temp.items[i]));
        }
        await addForkCount(result);
        result.sort((x, y) => {
            return y.repoForkCount - x.repoForkCount;
        })

        if (result.length < 5) {
            return result;
        }
        return result.slice(0, 5);
    } catch (err) {

        handleError(err, 'job');
    }
}

const app: express.Application = express();
app.use(cors());
app.get('/:username', async (req: express.Request, res: express.Response) => {

    try {
        const data = await job(req.params.username);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong!'});
        handleError(err, 'GET /');
    }
});

app.listen(process.env.PORT || 8080, () => console.log('Collector is up!'));
