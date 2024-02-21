interface RequestConfig {
  params?: any;
  headers?: HeadersInit;
}

export interface IHttp {
  baseUrl: string;
  get<T>(
    url: string,
    config?: RequestConfig
  ): Promise<{ data: T; headers: Headers }>;
}

export const fetchClient: IHttp = {
  baseUrl: "http://localhost:5173",
  async get<T>(url: string, config: RequestConfig = {}) {
    const res = await fetch(this.baseUrl.concat(url), {
      method: "GET",
      headers: {
        ...(config?.headers ?? {}),
      },
    });
    const data: T = await res.json();
    const { headers, ok } = res;
    if (!ok) return Promise.reject(data);
    return {
      data,
      headers,
    };
  },
};
