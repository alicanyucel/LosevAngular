import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../constanst/constants';
import { ResultModel } from '../models/result.model';
import { ErrorHandlerService } from './error-handler.service';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private loading: LoadingService
  ) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  post<T>(apiUrl: string, body: any, callBack: (res: T) => void, errorCallBack?: () => void): void {
    this.loading.show('İşlem yapılıyor...');
    this.http.post<ResultModel<T>>(`${api}/${apiUrl}`, body, {
      headers: this.getHeaders()
    }).subscribe({
      next: (res: ResultModel<T>) => {
        this.loading.hide();
        if (res.data) {
          callBack(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading.hide();
        this.errorHandler.errorHandler(err);
        if (errorCallBack) {
          errorCallBack();
        }
      }
    });
  }

  get<T>(apiUrl: string, callBack: (res: T) => void, errorCallBack?: () => void): void {
    this.loading.show('Veriler yükleniyor...');
    this.http.get<ResultModel<T>>(`${api}/${apiUrl}`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (res) => {
        this.loading.hide();
        if (res.data) {
          callBack(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading.hide();
        this.errorHandler.errorHandler(err);
        if (errorCallBack) {
          errorCallBack();
        }
      }
    });
  }

  put<T>(apiUrl: string, body: any, callBack: (res: T) => void, errorCallBack?: () => void): void {
    this.http.put<ResultModel<T>>(`${api}/${apiUrl}`, body, {
      headers: this.getHeaders()
    }).subscribe({
      next: (res: ResultModel<T>) => {
        if (res.data) {
          callBack(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.errorHandler(err);
        if (errorCallBack) {
          errorCallBack();
        }
      }
    });
  }

  delete<T>(apiUrl: string, callBack: (res: T) => void, errorCallBack?: () => void): void {
    this.http.delete<ResultModel<T>>(`${api}/${apiUrl}`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (res: ResultModel<T>) => {
        if (res.data) {
          callBack(res.data);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.errorHandler(err);
        if (errorCallBack) {
          errorCallBack();
        }
      }
    });
  }
  postObservable<T>(apiUrl: string, body: any): Observable<ResultModel<T>> {
    return this.http.post<ResultModel<T>>(`${api}/${apiUrl}`, body, {
      headers: this.getHeaders()
    });
  }

  getObservable<T>(apiUrl: string): Observable<ResultModel<T>> {
    return this.http.get<ResultModel<T>>(`${api}/${apiUrl}`, {
      headers: this.getHeaders()
    });
  }
}