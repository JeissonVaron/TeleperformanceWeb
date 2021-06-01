import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  private getBaseUrl(url) {
    return `${environment.mockUrl}/${url}`;
  }

  get(url, options?): Observable<any> {
    return this.http.get(this.getBaseUrl(url), options);
  }

  post(url, body, options?): Observable<any> {
    return this.http.post(this.getBaseUrl(url), body, options);
  }
}
