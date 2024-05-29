import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface User {
  id: number;
  username: string;
  dni: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            // DNI already exists
            return throwError('El DNI proporcionado ya está registrado.');
          } else {
            // Other errors
            return throwError('Error al registrar usuario. Por favor, inténtelo de nuevo.');
          }
        })
      );
  }
}
