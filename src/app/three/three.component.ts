import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {
  
  public q1 : any;
  public q2 : any;
  public q3 : any;
  public q4 : any;
  public q5 : any;
  public q6 : any;
  public comments: string = "";

  public user: any = undefined;

  constructor(private router: Router, private angFireData: AngularFireDatabase) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  sendEvaluation(){
    if(!this.q1){
      return this.errorParams('1');
    }
    if(!this.q2){
      return this.errorParams('2');
    }
    if(!this.q3){
      return this.errorParams('3');
    }
    if(!this.q4){
      return this.errorParams('4');
    }
    if(!this.q5){
      return this.errorParams('5');
    }
    if(!this.q6){
      return this.errorParams('6');
    }
    console.log("Page three Ok");
    console.log(this.comments);

    this.angFireData.database.ref('/Users/' + this.user +'/PageThree').set({
      question1: this.q1,
      question2: this.q2,
      question3: this.q3,
      question4: this.q4,
      question5: this.q5,
      question6: this.q6,
      comments: this.comments,
    }).then((res) => {
      this.router.navigate(['/four']);
    }).catch((err) => {
      console.log("Erro na pagina 3: " + err);
    })

  }

  errorParams(q){
    alert("Por favor escolha uma das opções na pergunta " + q);
  }

}
