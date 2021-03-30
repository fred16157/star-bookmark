class RepositoryInfo {
    id: string;
    name: string;
    fullName: string;
    description: string;
    owner: GithubUser;
    url: string;
    htmlUrl: string;
    createdAt: Date;
    updatedAt: Date;
    pushedAt: Date;
    language: string;
    forks: number;
    openIssues: number;
    constructor(json: any) {
        this.id = json.id;
        this.name = json.name;
        this.fullName = json.full_name;
        this.description = json.description;
        this.owner = new GithubUser(json.owner);
        this.url = json.url;
        this.htmlUrl = json.html_url;
        this.createdAt = new Date(json.created_at);
        this.updatedAt = new Date(json.updated_at);
        this.pushedAt = new Date(json.pushed_at);
        this.language = json.language;
        this.forks = json.forks;
        this.openIssues = json.open_issues;
    }
    static getReposFromJsonArray(arr: any) : RepositoryInfo[] {
        let repos : RepositoryInfo[] = [];
        for(let index in arr) {
            repos.push(new RepositoryInfo(arr[index]));
        }
        return repos;
    }   
}

class GithubUser {
    login: string;
    id: string;
    url: string;
    htmlUrl: string;
    avatarUrl: string;
    constructor(json: any) {
        this.login = json.login;
        this.id = json.id;
        this.url = json.url;
        this.htmlUrl = json.html_url;
        this.avatarUrl = json.avatar_url;
    }
}

export { RepositoryInfo, GithubUser };