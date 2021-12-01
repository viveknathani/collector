import fetch from "node-fetch";
import { PullRequest } from "./interface";

// Throw well
export function handleError(err: any, caller: string) {
    if (err instanceof Error) {
        throw err;
    }
    if (typeof err === 'string') {
        throw new Error(err);
    }
    throw new Error(`Something went wrong in ${caller}.`);
}

// Add fork count of repo to our PR structure, for all PRs
export async function addForkCount(prs: PullRequest[]): Promise<void> {

    const cache: Map<string, number> = new Map<string, number>();
    
    try {
        
        const base = "https://api.github.com/repos";
        for (let i = 0; i < prs.length; ++i) {
            
            const url = `${base}/${prs[i].owner}/${prs[i].repo}`;
            if (!cache.has(url)) {
                const response = await fetch(url);
                const temp = await response.json();
                cache.set(url, temp.forks_count);
            }
            prs[i].repoForkCount = cache.get(url) || 0;
        }
    } catch (err) {
        handleError(err, 'addForkCount');
    }
}

// Extract information from PR, returns with repoForkCount set to 0
export function extractFromPR(data: any): PullRequest {

    const result: PullRequest = {
        url: data.html_url,
        owner: '',
        repo: '',
        pr: data.number,
        repoForkCount: 0
    }

    const host = "https://github.com/";
    let countSlash = 1;
    for (let i = host.length; i < result.url.length; ++i) {

        if (result.url[i] === '/') {
            ++countSlash;
            continue;
        }
        if (countSlash === 3) {
            break;
        }

        (countSlash === 1) ? result.owner += result.url[i] : result.repo += result.url[i];
    }
    return result;
}