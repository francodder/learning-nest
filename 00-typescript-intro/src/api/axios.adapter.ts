import axios from "axios";
import { HttpAdapter } from "../interfaces/httpAdapter.interface";

/* This adapter class is an abstraction of the request client, if we neet to 
   change the request method, we only need to change this adapter */
export class AxiosAdapter implements HttpAdapter {
  private readonly axios = axios;

  // <T> is a generic type
  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);
    return data;
  }

  async post(url: string, data: any) {}
  async put(url: string, data: any) {}
  async patch(url: string, data: any) {}
  async delete(url: string, data: any) {}
}
