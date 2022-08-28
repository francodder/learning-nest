import { HttpAdapter } from "../interfaces/httpAdapter.interface";

export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data: T = await resp.json();
    return data;
  }

  async post(url: string, data: any) {}
  async put(url: string, data: any) {}
  async patch(url: string, data: any) {}
  async delete(url: string, data: any) {}
}
