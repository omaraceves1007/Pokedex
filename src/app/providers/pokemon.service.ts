import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/';

  constructor(public http: HttpClient) { }

  getPokedex() : Observable<any> {
    let url = `${this.url}pokemon?limit=964`;
    return this.http.get(url);
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get(url);
  }

  getRegion(id: number): Observable<any> {
    let url = `${this.url}generation/${id}/`;
    return this.http.get(url);
  }
}
