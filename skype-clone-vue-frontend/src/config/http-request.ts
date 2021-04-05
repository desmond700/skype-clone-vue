import axios, { AxiosResponse } from "axios";
import { serverUrl } from "./network";

class Request {
  private host = `${serverUrl}/api`;

  private request = axios.create({
    withCredentials: true,
    baseURL: this.host,
    headers: {
      "Access-Control-Allow-Origin": this.host
    }
  });

  constructor() {
    console.log("host: ", this.host);
  }

  // GET REQUESTS
  async getCategories() {
    const url = `${this.host}/workspaces`;
    return this.request.get(url);
  }

  async getUserData() {
    const url = `${this.host}/users/user`;
    return this.request.get(url);
  }

  async getAuthStatus() {
    const url = `${this.host}/users/isAuthenticated`;
    return this.request.get(url);
  }

  async logout() {
    const url = `${this.host}/users/logout`;
    return this.request.get(url);
  }

  // POST REQUESTS
  async login(formData: object): Promise<AxiosResponse<any>> {
    const url = `${this.host}/users/login`;
    return this.request.post(url, formData);
  }

  async register(formData: object): Promise<AxiosResponse<any>> {
    const url = `${this.host}/users/register`;
    return this.request.post(url, formData);
  }

  async getUsernameAvailability(text: string) {
    const url = `${this.host}/users/usernameAvailability`;
    return this.request.post(url, { username: text });
  }

  async getEmailAvailability(text: string) {
    const url = `${this.host}/users/emailAvailability`;
    return this.request.post(url, { email: text });
  }

  // PUT REQUESTS
  async joinWorkspace(formData: object): Promise<AxiosResponse<any>> {
    const url = `${this.host}/workspaces/join`;
    return this.request.put(url, formData);
  }

  async setActiveWorkspace(id: string): Promise<AxiosResponse<any>> {
    const url = `${this.host}/users/activeWorkspace`;
    return this.request.put(url, { workspaceId: id });
  }
}

export const HttpRequest = new Request();
