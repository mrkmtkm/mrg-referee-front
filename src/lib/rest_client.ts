import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
axios.defaults.withCredentials = true;
export class RestClient {
  constructor(private token: string | null) {}

  async get<ResponseInterface>(
    path: string
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.get<ResponseInterface>(path, this.requestConfig);
  }

  async post<RequestInterface, ResponseInterface>(
    path: string,
    body: RequestInterface
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.post<ResponseInterface>(path, body, this.requestConfig);
  }

  async patch<RequestInterface, ResponseInterface>(
    path: string,
    body: RequestInterface
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.patch<ResponseInterface>(
      path,
      body,
      this.formRequestConfig
    );
  }

  async delete<ResponseInterface>(
    path: string
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.delete<ResponseInterface>(path, this.formRequestConfig);
  }

  async formPatch<ResponseInterface>(
    path: string,
    formData: FormData
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.patch<ResponseInterface>(
      path,
      formData,
      this.formRequestConfig
    );
  }

  async formPost<ResponseInterface>(
    path: string,
    formData: FormData
  ): Promise<AxiosResponse<ResponseInterface>> {
    return await axios.post<ResponseInterface>(
      path,
      formData,
      this.formRequestConfig
    );
  }

  private get requestConfig(): AxiosRequestConfig {
    return {
      baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    };
  }

  private get formRequestConfig(): AxiosRequestConfig {
    return {
      baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
      withCredentials: true,
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    };
  }
}

export function getAdminClient(): RestClient {
  return new RestClient(localStorage.getItem('admin_access_token'));
}

export function getUserClient(): RestClient {
  return new RestClient(localStorage.getItem('user_access_token'));
}
