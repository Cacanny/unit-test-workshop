import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { urlBase } from './api-insura-quest.types';
import { catchError, map, Observable, of } from 'rxjs';
import {
  ClaimProcessingHistory,
  Creature,
  FraudDetectionCase,
  InsuranceClaim,
  User,
} from '../../store/insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class InsuraQuestService {
  urls = {
    login: `${urlBase}/users`,
    creatures: `${urlBase}/creatures`,
    insuranceClaims: `${urlBase}/insuranceClaims`,
    fraudDetectionCases: `${urlBase}/fraudDetectionCases`,
    claimsProcessingHistory: `${urlBase}/claimsProcessingHistory`,
  };

  httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<User | null> {
    return this.httpClient.get<User[]>(this.urls.login).pipe(
      map((users) => {
        const user = users.find(
          (user: User) => user.username === email && user.password === password,
        );

        return user ? user : null;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  getCreatures(): Observable<Creature[]> {
    return this.httpClient.get<Creature[]>(this.urls.creatures).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error fetching creatures:', error);
        return of([]); // Return an empty array on error
      }),
    );
  }

  getInsuranceClaims(): Observable<InsuranceClaim[]> {
    return this.httpClient
      .get<InsuranceClaim[]>(this.urls.insuranceClaims)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching insurance claims:', error);
          return of([]); // Return an empty array on error
        }),
      );
  }

  getInsuranceClaim(id: string): Observable<InsuranceClaim | null> {
    return this.httpClient
      .get<InsuranceClaim>(`${this.urls.insuranceClaims}${id}`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching insurance claim:', error);
          return of(null); // Return null on error
        }),
      );
  }

  getFraudeDetectionCases(): Observable<FraudDetectionCase[]> {
    return this.httpClient
      .get<FraudDetectionCase[]>(`${this.urls.fraudDetectionCases}`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching fraud detection cases:', error);
          return of([]); // Return an empty array on error
        }),
      );
  }

  getClaimsProcessingHistory(): Observable<ClaimProcessingHistory[]> {
    return this.httpClient
      .get<ClaimProcessingHistory[]>(this.urls.claimsProcessingHistory)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching claims processing history:', error);
          return of([]); // Return an empty array on error
        }),
      );
  }
}
