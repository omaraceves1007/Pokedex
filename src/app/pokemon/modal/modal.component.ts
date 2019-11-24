import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  @Input() set selecction(data: any){
    if(data){
      console.log(data)
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
