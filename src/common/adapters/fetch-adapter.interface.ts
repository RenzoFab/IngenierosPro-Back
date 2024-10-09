import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error('Fetch adapter error on get - Check logs');
    }
  }

  async post<T>(
    url: string,
    headers: Record<string, string>,
    body?: URLSearchParams | string,
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error('Fetch adapter error on post - Check logs');
    }
  }
}
