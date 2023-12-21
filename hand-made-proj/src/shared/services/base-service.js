import axiosClient from "../interceptors";
export default class BaseService {
    constructor(path) {
        this.path = path;
        this.axiosClient = axiosClient;
    }
}