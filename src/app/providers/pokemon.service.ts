import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon?limit=964';

  constructor(public http: HttpClient) { }

  getPokedex(){
    return this.http.get(this.url);
  }

  getPokemon(url: string) {
    return this.http.get(url);
  }
}
