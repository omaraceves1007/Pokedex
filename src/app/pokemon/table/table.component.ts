import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { PokemonService } from '../../providers/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: ['.mat-column-select {overflow: initial;} .mat-form-field { font-size: 15px; width: 100%;}']
})
export class TableComponent implements OnInit {

  pokedex: [];
  columnsNames = ['select', '#', 'Imagen', 'Nombre', 'Altura', 'Peso', 'Tipo(s)'];
  pokedexFilter: any;
  selection = new SelectionModel<any>(true, []);
  selected: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _ps: PokemonService, public dialog: MatDialog) { }

  ngOnInit() {
    this._ps.getPokedex().subscribe((resp: any) => {
      if(resp) {
        this.pokedex = resp.results;
        this.getDataforPok(this.pokedex);
      }
    })
  }

  setNumber() {
    for(let element in this.pokedex ){
      let id = parseInt(element) + 1;
      Object.assign(this.pokedex[element],{id});
      this.pokedexFilter = new MatTableDataSource(this.pokedex);
    }
    this.pokedexFilter.paginator = this.paginator;
    this.pokedexFilter.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    if( this.pokedexFilter ){
      this.pokedexFilter.filter = filterValue.trim().toLowerCase();
    }
  }

  isAllSelected() {
    if(this.pokedexFilter)  {
      const numSelected = this.selection.selected.length;
      const numRows = this.pokedexFilter.data.length;
      return numSelected === numRows;
    }
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.pokedexFilter.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row: any, event: any) {
    event ? this.selection.toggle(row) : null;
    if( this.selection.selected ){
      if(this.selection.selected.length === 10 ){
        this.selected = this.selection.selected;
        this.dialog.open(ModalComponent, {
          data: this.selected
        });
      }
    }
  }

  getDataforPok(pokedex: any){
    let petitions = [];
    for(let pok in pokedex ){
      petitions.push(this._ps.getPokemon(pokedex[pok].url));
    }
    forkJoin(petitions).subscribe((pokemons: any) => this.addData(pokemons));
  }

  addData(pokemons: any){
    for( let pok in pokemons ) {
      let data = {}, types = [], image: string;
      for( let type in pokemons[pok].types ) {
        types.push(pokemons[pok].types[type].type.name)
      }
      image = pokemons[pok].sprites.front_default ? pokemons[pok].sprites.front_default : './assets/images/default.png';
      data = {
          height: pokemons[pok].height,
          weight: pokemons[pok].weight,
          image,
          types
      };
      Object.assign(this.pokedex[pok], data);
    }
    this.setNumber();
  }

}
