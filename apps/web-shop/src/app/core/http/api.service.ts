import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  /**
   * GET request with optional parameters
   */
  get<T>(endpoint: string, params?: PaginationParams | any): Observable<ApiResponse<T> | T> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<ApiResponse<T> | T>(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: any): Observable<ApiResponse<T> | T> {
    return this.http.post<ApiResponse<T> | T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: any): Observable<ApiResponse<T> | T> {
    return this.http.put<ApiResponse<T> | T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body: any): Observable<ApiResponse<T> | T> {
    return this.http.patch<ApiResponse<T> | T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<ApiResponse<T> | T> {
    return this.http.delete<ApiResponse<T> | T>(`${this.baseUrl}${endpoint}`);
  }
}
