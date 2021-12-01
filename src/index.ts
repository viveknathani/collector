import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { addForkCount, extractFromPR, handleError } from './util';
import { PullRequest } from './interface';
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

job(process.env.username || 'none')
.then((result) => console.log(result))
.catch((err) => console.log(err));
