import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {
  
  data: any;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
      this.route.queryParams.subscribe((data: any) => {
        let myList = data.dataSend;
        let result = [];
        for(let item in myList){
          result.push(JSON.parse(myList[item]));
        }
        this.data = result;
      });
  }

}
