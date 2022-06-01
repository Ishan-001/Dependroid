import fs from "fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import "dotenv/config";
import { Octokit } from "@octokit/core";

export default function gitClone(path) {
    await git.clone({
        fs,
        http,
        dir: process.env.GIT_CLONE_PATH,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: path,
        singleBranch: true,
        depth: 1
    })
    console.log('Repository cloned')
}

export default function createPullRequest(_owner, _repo, _head, _body) {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN }),
        owner = _owner,
         repo = _repo,
        title = 'My Test Pull Request',
        body  = _body,
        head  = _head,
        base  = 'master';

    await octokit.request(
        `POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base }
    );
}

export default function gitAdd() {
    await git.add({ fs, dir: process.env.PATH, filepath: 'package.json' })
}

export default function gitCommit(_message) {
    await git.commit({
        fs,
        dir: process.env.PATH,
        author: {
            name: process.env.USERNAME,
            email: process.env.PASSWORD,
        },
        message: _message
    })
}

export default function gitBranch() {
    await git.branch({ fs, dir: process.env.PATH, ref: 'version-update' })
    await git.checkout({
        fs,
        dir: process.env.PATH,
        ref: 'version-update'
    })
}

export default function gitPush() {
    let pushResult = await git.push({
        fs,
        http,
        dir: process.env.PATH,
        remote: 'origin',
        ref: 'version-update',
        onAuth: () => ({ username: process.env.GITHUB_TOKEN }),
    })
    console.log(pushResult)
}


