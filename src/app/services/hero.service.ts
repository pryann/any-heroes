import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../interfaces';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error) => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  fetchHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetch heroes')),
      catchError(this.handleError<Hero[]>('fetchHeroes', []))
    );
  }

  findHero(heroId: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${heroId}`).pipe(
      tap(() => this.log(`find hero by id (${heroId})`)),
      catchError(this.handleError<Hero>('findHero'))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`create hero (${hero.name})`)),
      catchError(this.handleError<Hero>('createHero'))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`update hero (${hero.id})`)),
        catchError(this.handleError<Hero>('updateHero'))
      );
  }

  deleteHero(heroId: string): Observable<Hero> {
    return this.http
      .delete<Hero>(`${this.heroesUrl}/${heroId}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`delete hero (${heroId})`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
}
