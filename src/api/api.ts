

class ApiService{
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async signin(user){
        const token = (Math.random() + 1).toString(36).substring(2);
        localStorage.setItem("token", token);
        return this.postFetch('/signin', JSON.stringify(user));
    }

    async signup(user){
        return this.postFetch('/signup', JSON.stringify(user));
    }


    async getQuests(){
        const res = await this.getFetch('/quest');
        const data = await res.json();
        return data;
    }

    async getUsersQuests(){
        const res = await this.getFetch(`/useroks/${localStorage.getItem("user_id")}/quests`);
        const data = await res.json();
        return data['_embedded']['quests'];
    }

    async getTranslation(questName, lang){
        const res = await this.getFetch(`/translation/${questName}/${lang}`);
        const data = await res.json();
        return data;
    }

    async createTranslation(questName, translation){
        return this.postFetch(`/quests/${questName}`, JSON.stringify(translation));
    }

    async solveQuest(questName, lang, solution){
        return this.postFetch(`/quests/${questName}/${lang}`, JSON.stringify(solution));
    }



    async postFetch(endpoint: string, body){
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json',  "Authorization": localStorage.getItem("token") },
            cache: 'no-cache'
        });
        return response;
    }

    async getFetch(endpoint: string){
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json',  "Authorization": localStorage.getItem("token") },
            cache: 'no-cache'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}

export const apiService = new ApiService('http://localhost:8082');