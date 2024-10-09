export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
  post<T>(
    url: string,
    headers: Record<string, string>,
    body: URLSearchParams,
  ): Promise<T>;
}
