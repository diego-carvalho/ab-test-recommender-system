import { Component, OnInit } from '@angular/core';

import { NgxCarousel } from 'ngx-carousel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {

  public carouselPopularItems: Array<any>;
  public carouselTile: NgxCarousel;
  public myFood = "";
  public closeResult: string;  
  public movie : any;

  constructor(private modalService: NgbModal) {

   }

  ngOnInit() {

    this.carouselPopularItems = [{
      id: 1,
      image: "../../assets/online-evaluations/ml-10m/Pop/01:movie.png",
      title: "Pulp Fiction - Tempo de Violência (1994)",
      sinopse: "Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em apuros por ganhar luta que deveria perder.",
    }, {
      id: 2,
      image: "../../assets/online-evaluations/ml-10m/Pop/02:movie.jpg",
      title: "O Silêncio dos Inocentes (1991)",
      sinopse: "A agente do FBI, Clarice Starling (Jodie Foster) é ordenada a encontrar um assassino que arranca a pele de suas vítimas. Para entender como ele pensa, ela procura o periogoso psicopata, Hannibal Lecter (Anthony Hopkins), encarcerado sob a acusação de canibalismo.",
    }, {
      id: 3,
      image: "../../assets/online-evaluations/ml-10m/Pop/03:movie.jpg",
      title: "Forrest Gump (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: 4,
      image: "../../assets/online-evaluations/ml-10m/Pop/04:movie.jpg",
      title: "Jurassic Park (1993)",
      sinopse: "Um parque construído por um milionário (Richard Attenborough) tem como habitantes dinossauros diversos, extintos a sessenta e cinco milhões de anos. Isto é possível por ter sido encontrado um inseto fossilizado, que tinha sugado sangue destes dinossauros, de onde pôde-se isolar o DNA, o código químico da vida, e, a partir deste ponto, recriá-los em laboratório. Mas, o que parecia ser um sonho se torna um pesadelo, quando a experiência sai do controle de seus criadores.",
    }, {
      id: 5,
      image: "../../assets/online-evaluations/ml-10m/Pop/05:movie.jpg",
      title: "O Fugitivo (1993)",
      sinopse: "Richard Kimble (Harrison Ford), um eminente cirurgião, é condenado à morte injustamente pelo assassinato de Helen Kimble (Sela Ward), sua esposa, mas consegue escapar devido a um acidente quando rumava para o presídio, onde ficaria até ser executado. Mas é implacavelmente perseguido por Samuel Gerard (Tommy Lee Jones), um dos agentes que tentam recapturá-lo, forçando-o a não ter nenhum contato com amigos. No entanto, Kimble está determinado a encontrar provas que determinem sua inocência.",
    }, {
      id: 6,
      image: "../../assets/online-evaluations/ml-10m/Pop/06:movie.jpg",
      title: "Um Sonho de Liberdade (1994)",
      sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela. Ele é mandado para uma prisão que é o pesadelo de qualquer detento, a Penitenciária Estadual de Shawshank, no Maine. Lá ele irá cumprir a pena perpétua. Andy logo será apresentado a Warden Norton (Bob Gunton), o corrupto e cruel agente penitenciário, que usa a Bíblia como arma de controle e ao Capitão Byron Hadley (Clancy Brown) que trata os internos como animais. Andy faz amizade com Ellis Boyd Redding (Morgan Freeman), um prisioneiro que cumpre pena há 20 anos e controla o mercado negro da instituição.",
    }, {
      id: 7,
      image: "../../assets/online-evaluations/ml-10m/Pop/07:movie.jpg",
      title: "O Exterminador do Futuro 2",
      sinopse: "Uma criança destinada a ser líder (Edward Furlong) já nasceu, mas infeliz por viver com pais adotivos, pois foi privado da companhia da mãe (Linda Hamilton), que foi considerada louca quando falou de um exterminador vindo do futuro. Neste contexto, um andróide (Arnold Schwarzenegger) vem do futuro, mais exatamente um modelo T-800 igual ao filme original, para proteger o garoto, mas existe um problema: o mais avançado andróide existente no futuro, um modelo T-1000 (Robert Patrick), que feito de 'metal líquido', não pode ter nenhum dano permanente e pode assumir a forma que desejar, também veio para o passado com a missão de matar o menino.",
    }, {
      id: 8,
      image: "../../assets/online-evaluations/ml-10m/Pop/08:movie.jpg",
      title: "Coração Valente (1995)",
      sinopse: "No século XIII, soldados ingleses matam a mulher do escocês William Wallace (Mel Gibson), bem na sua noite de núpcias. Para vingar a amada, ele resolve liderar seu povo em uma luta contra o cruel Rei inglês Edward I (Patrick McGoohan). Com a ajuda de Robert e Bruce, ele vai deflagrar uma violenta batalha com o objetivo de libertar a Escócia de uma vez por todas.",
    }, {
      id: 9,
      image: "../../assets/online-evaluations/ml-10m/Pop/09:movie.jpg",
      title: "Batman (1989)",
      sinopse: "Em Gotham City o milionário Bruce Wayne (Michael Keaton), que quando jovem teve os pais assassinados por bandidos, resolve combater o crime como Batman, o Homem-Morcego. Mas chega o dia em que o vilão Coringa (Jack Nicholson) decide dominar a cidade e se torna um grande desafio para o super-herói.",
    }, {
      id: 10,
      image: "../../assets/online-evaluations/ml-10m/Pop/10:movie.jpg",
      title: "Star Wars: Episode IV - A New Hope (1977)",
      sinopse: "Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros jedi e a Hans Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.",
    }];
    this.carouselTile = {
      grid: {xs: 1, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

  }

  send(){
    console.log(this.myFood)
  }

  open(content, obj) {
    this.movie = obj;

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
