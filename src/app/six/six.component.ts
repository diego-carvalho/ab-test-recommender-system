import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-six',
  templateUrl: './six.component.html',
  styleUrls: ['./six.component.css']
})
export class SixComponent implements OnInit {

  public um : any;
  public dois : any;
  public tres : any;
  public quatro : any;
  public cinco : any;
  public seis : any;
  public sete : any;

  public user: any = undefined;

  constructor(private router: Router, private angFireData: AngularFireDatabase) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  sendEvaluation(){
    if(!this.um){
      return this.errorParams('1');
    }
    if(!this.dois){
      return this.errorParams('2');
    }
    if(!this.tres){
      return this.errorParams('3');
    }
    if(!this.quatro){
      return this.errorParams('4');
    }
    if(!this.cinco){
      return this.errorParams('5');
    }
    if(!this.seis){
      return this.errorParams('6');
    }
    if(!this.sete){
      return this.errorParams('6');
    }

    this.angFireData.database.ref('/Users/' + this.user +'/PageSix').set({
      question1: this.um,
      question2: this.dois,
      question3: this.tres,
      question4: this.quatro,
      question5: this.cinco,
      question6: this.seis,
      question7: this.sete,
    }).then((res) => {
      this.router.navigate(['/end']);
    }).catch((err) => {
      console.log("Erro na pagina 6: " + err);
    })
  }

  errorParams(q){
    alert("Por favor responda a pergunta " + q);
  }

}
