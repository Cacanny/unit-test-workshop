import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  getPathName(): string {
    return window.location.pathname;
  }
}
