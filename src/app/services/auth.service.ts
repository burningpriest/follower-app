import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials)).pipe(map(response=>{
        let result = response.json();
        if(result && result.token){
          localStorage.setItem('token',result.token);
          return true;
        }
        return false
        
      })
      );
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    let jwtHelper= new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token)
    return false;
    
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }
  get currentUser(){
    let jwtHelper= new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token)
    return null;

    return jwtHelper.decodeToken(token);
    
    
  }
}

