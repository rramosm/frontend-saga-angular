import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Users } from './users';
import { Projects } from './projects';

const httpOptions = {
  headers: new HttpHeaders({
    'Ocp-Apim-Subscription-Key': 'XXXXXXXXXXXXXXXXXXXX',
    'Ocp-Apim-Trace': 'true'
  })
};
const apiSecurityUrl = 'https://XXXXXXXXX.azure-api.net/hbin';
const apiProjectUrl = 'https://XXXXXXXXX.azure-api.net/hbin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //Projects
  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${apiProjectUrl}/project/all/active`, httpOptions)
      .pipe(
        tap(users => console.log('fetched projects')),
        catchError(this.handleError('getProjects', []))
      );
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${apiUrl}/user/all`, httpOptions)
      .pipe(
        tap(users => console.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUsersById(userId: string): Observable<Users> {
    const url = `${apiUrl}/user/${userId}`;
    return this.http.get<Users>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched users userId=${userId}`)),
      catchError(this.handleError<Users>(`getUsersById userId=${userId}`))
    );
  }

  addUsers(users: Users): Observable<Users> {
    return this.http.post<Users>(`${apiUrl}/user`, users, httpOptions).pipe(
      tap((c: Users) => console.log(`added product w/ userId=${c.userId}`)),
      //catchError(this.handleError<Users>('addUsers'))
    );
  }

  updateUsers(userId: string, users: Users): Observable<any> {
    const url = `${apiUrl}/${userId}`;
    users.userId = userId;
    return this.http.put(`${apiUrl}/user`, users, httpOptions).pipe(
      tap(_ => console.log(`updated users userId=${userId}`)),
      //catchError(this.handleError<any>('updateUsers'))
    );
  }

  deleteUsers(userId: string): Observable<Users> {
    const url = `${apiUrl}/user/${userId}`;
    return this.http.delete<Users>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted users userId=${userId}`)),
      catchError(this.handleError<Users>('deleteUsers'))
    );
  }

}
