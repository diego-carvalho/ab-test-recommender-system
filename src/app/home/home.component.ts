import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  intr:any = undefined;

  constructor(private router: Router, private angFireData: AngularFireDatabase) { }

  ngOnInit() {
    this.angFireData.database.ref('AB/').once('value')
      .then((res) => {
        this.intr = res.val().interator;
        console.log(this.intr % 2);
        console.log((this.intr + 4) % 2);
        console.log((this.intr + 7) % 2);
      })
      .catch((err) => {
        console.log("Error em pegar o interator do AB test");
      }
    );
  }

  goNext(){
    if(this.intr != undefined){

      this.angFireData.database.ref('AB').set({
        interator: this.intr + 1
      }).then((res) => {
        localStorage.setItem('interator', this.intr);
        this.router.navigate(['/two']);
      }).catch((err) => {
        console.log("Erro ao atualizar valor de intr: " + err);
      })
    }
  }

}
