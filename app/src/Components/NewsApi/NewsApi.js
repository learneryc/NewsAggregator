import axios from "axios";

const host = 'http://localhost:8080';
class NewsApi {
    static getSectionNews(source, section) {
        let url = `${host}/news/${source}`;
        let params = {section: section};
        return axios.get(url, {params: params});
    }

    static getArticle(source, id) {
        let url = `${host}/news/${source}/article`;
        let params = {id: id};
        return axios.get(url, {params: params});
    }

    static getSearchResults(query) {
        let url = `${host}/news/search`;
        let params = {q: query};
        return axios.get(url, {params: params});
    }
};

export {NewsApi};
