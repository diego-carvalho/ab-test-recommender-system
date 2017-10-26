import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-five',
  templateUrl: './five.component.html',
  styleUrls: ['./five.component.css']
})
export class FiveComponent implements OnInit {

    public selectItems = [];
    public user: any = undefined;
  
    public carouselPopularItems: Array<any>;
    public carouselBestItems: Array<any>;
    public carouselMaxItems: Array<any>;
    public carouselNiItems: Array<any>;
  
    public carouselTile: NgxCarousel;
    public closeResult: string;  
    public movie : any;
  
    private modalRef: any;
    public time: any;
  
    constructor(private modalService: NgbModal, private router: Router, private angFireData: AngularFireDatabase) {
  
     }
  
    ngOnInit() {
      window.scrollTo(0, 0);

      this.user = localStorage.getItem('user');

      this.time = new Date().getTime();
      console.log(this.time)
  
      this.carouselNiItems = [{
        id: "N1",
        movieId: "Toy Story",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/01:movie.jpg",
        title: "Toy Story (1995)",
        sinopse: "O aniversário de Andy está chegando e os brinquedos estão nervosos. Afinal de contas, eles temem que um novo brinquedo possa substituí-los. Liderados por Woody, um caubói que é também o brinquedo predileto de Andy, eles montam uma escuta que lhes permite saber dos presentes ganhos. Entre eles está Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Isto aos poucos gera ciúmes em Woody, que tenta fazer com que ele caia atrás da cama. Só que o plano dá errado e Buzz cai pela janela. É o início da aventura de Woody, que precisa resgatar Buzz também para limpar sua barra com os outros brinquedos.",
      }, {
        id: "N2",
        movieId: "De Volta Para o Futuro",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/02:movie.jpg",
        title: "De Volta Para o Futuro (1985)",
        sinopse: "Um jovem (Michael J. Fox) aciona acidentalmente uma máquina do tempo construída por um cientista (Christopher Lloyd) em um Delorean, retornando aos anos 50. Lá conhece sua mãe (Lea Thompson), antes ainda do casamento com seu pai, que fica apaixonada por ele. Tal paixão põe em risco sua própria existência, pois alteraria todo o futuro, forçando-o a servir de cupido entre seus pais.",
      }, {
        id: "N3",
        movieId: "Batman Eternamente",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/03:movie.jpg",
        title: "Batman Eternamente (1995)",
        sinopse: "Duas-Caras (Tommy Lee Jones) e Charada (Jim Carrey), dois excêntricos bandidos, decidem descobrir a identidade do Homem-Morcego (Val Kilmer) para depois mata-lo. Este por sua vez recebe a ajuda de um jovem (Chris O'Donnell) que tem sede de vingança, por ter perdido a família em um acidente provocado exatamente pelo Duas-Caras.",
      }, {
        id: "N4",
        movieId: "Feitiço do Tempo",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/04:movie.jpg",
        title: "Feitiço do Tempo (1993)",
        sinopse: "Um repórter (Bill Murray) de televisão que faz previsões de metereologia vai a uma pequena cidade fazer uma matéria especial sobre o celebrado 'Dia da marmota'. Pretendendo ir embora o mais rapidamente possível, ele inexplicavelmente fica preso no tempo, condenado a vivenciar para sempre os eventos daquele dia.",
      }, {
        id: "N5",
        movieId: "Star Wars: Episode IV",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/05:movie.jpg",
        title: "Star Wars: Episode IV - A New Hope (1977)",
        sinopse: "Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros jedi e a Hans Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.",
      }, {
        id: "N6",
        movieId: "O Exterminador do Futuro 2",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/06:movie.jpg",
        title: "O Exterminador do Futuro 2",
        sinopse: "Uma criança destinada a ser líder (Edward Furlong) já nasceu, mas infeliz por viver com pais adotivos, pois foi privado da companhia da mãe (Linda Hamilton), que foi considerada louca quando falou de um exterminador vindo do futuro. Neste contexto, um andróide (Arnold Schwarzenegger) vem do futuro, mais exatamente um modelo T-800 igual ao filme original, para proteger o garoto, mas existe um problema: o mais avançado andróide existente no futuro, um modelo T-1000 (Robert Patrick), que feito de 'metal líquido', não pode ter nenhum dano permanente e pode assumir a forma que desejar, também veio para o passado com a missão de matar o menino.",
      }, {
        id: "N7",
        movieId: "Apollo 13",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/07:movie.jpg",
        title: "Apollo 13 (1995)",
        sinopse: "Três astronautas americanos a caminho de uma missão na Lua sobrevivem à uma explosão, mas precisam retornar rapidamente à Terra para poderem sobreviver, pois correm o risco de ficarem sem oxigênio. Além disto existe o risco de, mesmo retornando, a nave ficar seriamente danificada, por não suportar o imenso calor na reentrada da órbita terrestre.",
      }, {
        id: "N8",
        movieId: "Duro de Matar",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/08:movie.jpg",
        title: "Duro de Matar (1988)",
        sinopse: "John McClane (Bruce Willis) é um detetive de Nova York que está indo a Los Angeles para se encontrar com sua esposa (Bonnie Bedelia), que trabalha em uma empresa japonesa. Porém, ao chegar no prédio onde ela trabalha, percebe que o edifício está sendo assaltado por um bando de terroristas e decide atrapalhar seus planos para resgatar sua mulher.",
      }, {
        id: "N9",
        movieId: "12 Monkeys",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/09:movie.jpg",
        title: "12 Monkeys (1996)",
        sinopse: "No ano de 2035, James Cole (Bruce Willis) aceita a missão de voltar ao passado para tentar decifrar um mistério envolvendo um vírus mortal que atacou grande parte da população mundial. Tomado como louco, no passado, ele tenta provar a sua sanidade para a médica Kathryn Railly (Madeleine Stowe), sua única esperança de mudar o futuro.",
      }, {
        id: "N10",
        movieId: "O Exterminador do Futuro",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/NiCoverage/10:movie.jpg",
        title: "O Exterminador do Futuro (1984)",
        sinopse: "Num futuro próximo, a guerra entre humanos e máquinas foi deflagrada. Com a tecnologia a seu dispor, um plano inusitado é arquitetado pelas máquinas ao enviar para o passado um andróide (Arnold Schwarzenegger) com a missão de matar a mãe (Linda Hamilton) daquele que viria a se transformar num líder e seu pior inimigo. Contudo, os humanos também conseguem enviar um representante (Michael Biehn) para proteger a mulher e tentar garantir o futuro da humanidade.",
      }];
  
      this.carouselMaxItems = [{
        id: "M1",
        movieId: "Pulp Fiction",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/01:movie.png",
        title: "Pulp Fiction - Tempo de Violência (1994)",
        sinopse: "Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em apuros por ganhar luta que deveria perder.",
      }, {
        id: "M2",
        movieId: "Star Wars: Episode IV",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/02:movie.jpg",
        title: "Star Wars: Episode IV - A New Hope (1977)",
        sinopse: "Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros jedi e a Hans Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.",
      }, {
        id: "M3",
        movieId: "Forrest Gump",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/03:movie.jpg",
        title: "Forrest Gump (1994)",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
      }, {
        id: "M4",
        movieId: "Beleza Americana",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/04:movie.jpg",
        title: "Beleza Americana (1999)",
        sinopse: "Lester Burham (Kevin Spacey) não aguenta mais o emprego e se sente impotente perante sua vida. Casado com Carolyn (Annette Bening) e pai da 'aborrecente' Jane (Tora Birch), o melhor momento de seu dia quando se masturba no chuveiro. Até que conhece Angela Hayes (Mena Suvari), amiga de Jane. Encantado com sua beleza e disposto a dar a volta por cima, Lester pede demissão e começa a reconstruir sua vida, com a ajuda de seu vizinho Ricky (Wes Bentley).",
      }, {
        id: "M5",
        movieId: "Independence Day",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/05:movie.jpg",
        title: "Independence Day (1996)",
        sinopse: "No dia 2 de julho os sistemas de comunicação do mundo inteiro se transformam em um caos, devido à uma estranha interferência atmosférica. Logo se descobre que enormes objetos estão em curso de colisão com a Terra. Inicialmente imagina-se que se tratam de meteoros, mas logo revela-se ser na verdade uma imensa nave espacial pilotada por alienígenas. Após frustradas tentativas de se comunicar com os extra-terrestres, um técnico em comunicação descobre que os seres do espaços estão usando os satélites terrestres para se comunicarem e iniciarem em menos de um dia um ataque conjunto nas principais cidades do planeta. No dia 3 de julho o ataque alienígena começa de forma esmagadora e nem armas nucleares conseguem destruir a blindagem protetora. Mas no dia 4 de julho surge uma possibilidade de vencer o invasor e nesta hora todas as nações precisam se unir, pois está em jogo a existência da raça humana.",
      }, {
        id: "M6",
        movieId: "O Silêncio dos Inocentes",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/06:movie.jpg",
        title: "O Silêncio dos Inocentes (1991)",
        sinopse: "A agente do FBI, Clarice Starling (Jodie Foster) é ordenada a encontrar um assassino que arranca a pele de suas vítimas. Para entender como ele pensa, ela procura o periogoso psicopata, Hannibal Lecter (Anthony Hopkins), encarcerado sob a acusação de canibalismo.",
      }, {
        id: "M7",
        movieId: "O Senhor dos Anéis, as Duas Torres",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/07:movie.jpg",
        title: "O Senhor dos Anéis, as Duas Torres (2002)",
        sinopse: "Após a captura de Merry (Dominic Monaghan) e Pippy (Billy Boyd) pelos orcs, a Sociedade do Anel é dissolvida. Enquanto que Frodo (Elijah Wood) e Sam (Sean Astin) seguem sua jornada rumo à Montanha da Perdição para destruir o Um Anel, Aragorn (Viggo Mortensen), Legolas (Orlando Bloom) e Gimli (John Rhys-Davies) partem para resgatar os hobbits sequestrados.",
      }, {
        id: "M8",
        movieId: "Star Wars VI",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/08:movie.jpg",
        title: "Star Wars VI - O Retorno do Jedi (1983)",
        sinopse: "O imperador (Ian McDiarmid) está supervisionando a construção de uma nova Estrela da Morte. Enquanto isso Luke Skywalker (Mark Hamill) liberta Han Solo (Harrison Ford) e a Princesa Leia (Carrie Fisher) das mãos de Jaba, o pior bandido das galáxias. Luke só se tornará um cavaleiro jedi quando destruir Darth Vader, que ainda pretende atraí-lo para o lado negro da 'Força'. No entanto a luta entre os dois vai revelar um inesperado segredo.",
      }, {
        id: "M9",
        movieId: "Toy Story",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/09:movie.jpg",
        title: "Toy Story (1995)",
        sinopse: "O aniversário de Andy está chegando e os brinquedos estão nervosos. Afinal de contas, eles temem que um novo brinquedo possa substituí-los. Liderados por Woody, um caubói que é também o brinquedo predileto de Andy, eles montam uma escuta que lhes permite saber dos presentes ganhos. Entre eles está Buzz Lightyear, o boneco de um patrulheiro espacial, que logo passa a receber mais atenção do garoto. Isto aos poucos gera ciúmes em Woody, que tenta fazer com que ele caia atrás da cama. Só que o plano dá errado e Buzz cai pela janela. É o início da aventura de Woody, que precisa resgatar Buzz também para limpar sua barra com os outros brinquedos.",
      }, {
        id: "M10",
        movieId: "Shrek",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/MaxCoverage/10:movie.jpg",
        title: "Shrek (2001)",
        sinopse: "Em um pântano distante vive Shrek (Mike Myers), um ogro solitário que vê, sem mais nem menos, sua vida ser invadida por uma série de personagens de contos de fada, como três ratos cegos, um grande e malvado lobo e ainda três porcos que não têm um lugar onde morar. Todos eles foram expulsos de seus lares pelo maligno Lorde Farquaad (John Lithgow). Determinado a recuperar a tranquilidade de antes, Shrek resolve encontrar Farquaad e com ele faz um acordo: todos os personagens poderão retornar aos seus lares se ele e seu amigo Burro (Eddie Murphy) resgatarem uma bela princesa (Cameron Diaz), que é prisioneira de um dragão. Porém, quando Shrek e o Burro enfim conseguem resgatar a princesa logo eles descobrem que seus problemas estão apenas começando.",
      }];
  
      this.carouselBestItems = [{
        id: "B1",
        movieId: "O Silêncio dos Inocentes",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/01:movie.jpg",
        title: "O Silêncio dos Inocentes (1991)",
        sinopse: "A agente do FBI, Clarice Starling (Jodie Foster) é ordenada a encontrar um assassino que arranca a pele de suas vítimas. Para entender como ele pensa, ela procura o periogoso psicopata, Hannibal Lecter (Anthony Hopkins), encarcerado sob a acusação de canibalismo.",
      }, {
        id: "B2",
        movieId: "Pulp Fiction",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/02:movie.png",
        title: "Pulp Fiction - Tempo de Violência (1994)",
        sinopse: "Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em apuros por ganhar luta que deveria perder.",
      }, {
        id: "B3",
        movieId: "Forrest Gump",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/03:movie.jpg",
        title: "Forrest Gump (1994)",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
      }, {
        id: "B4",
        movieId: "Um Sonho de Liberdade",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/04:movie.jpg",
        title: "Um Sonho de Liberdade (1994)",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela. Ele é mandado para uma prisão que é o pesadelo de qualquer detento, a Penitenciária Estadual de Shawshank, no Maine. Lá ele irá cumprir a pena perpétua. Andy logo será apresentado a Warden Norton (Bob Gunton), o corrupto e cruel agente penitenciário, que usa a Bíblia como arma de controle e ao Capitão Byron Hadley (Clancy Brown) que trata os internos como animais. Andy faz amizade com Ellis Boyd Redding (Morgan Freeman), um prisioneiro que cumpre pena há 20 anos e controla o mercado negro da instituição.",
      }, {
        id: "B5",
        movieId: "O Fugitivo",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/05:movie.jpg",
        title: "O Fugitivo (1993)",
        sinopse: "Richard Kimble (Harrison Ford), um eminente cirurgião, é condenado à morte injustamente pelo assassinato de Helen Kimble (Sela Ward), sua esposa, mas consegue escapar devido a um acidente quando rumava para o presídio, onde ficaria até ser executado. Mas é implacavelmente perseguido por Samuel Gerard (Tommy Lee Jones), um dos agentes que tentam recapturá-lo, forçando-o a não ter nenhum contato com amigos. No entanto, Kimble está determinado a encontrar provas que determinem sua inocência.",
      }, {
        id: "B6",
        movieId: "Jurassic Park",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/06:movie.jpg",
        title: "Jurassic Park (1993)",
        sinopse: "Um parque construído por um milionário (Richard Attenborough) tem como habitantes dinossauros diversos, extintos a sessenta e cinco milhões de anos. Isto é possível por ter sido encontrado um inseto fossilizado, que tinha sugado sangue destes dinossauros, de onde pôde-se isolar o DNA, o código químico da vida, e, a partir deste ponto, recriá-los em laboratório. Mas, o que parecia ser um sonho se torna um pesadelo, quando a experiência sai do controle de seus criadores.",
      }, {
        id: "B7",
        movieId: "Coração Valente",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/07:movie.jpg",
        title: "Coração Valente (1995)",
        sinopse: "No século XIII, soldados ingleses matam a mulher do escocês William Wallace (Mel Gibson), bem na sua noite de núpcias. Para vingar a amada, ele resolve liderar seu povo em uma luta contra o cruel Rei inglês Edward I (Patrick McGoohan). Com a ajuda de Robert e Bruce, ele vai deflagrar uma violenta batalha com o objetivo de libertar a Escócia de uma vez por todas.",
      }, {
        id: "B8",
        movieId: "Star Wars: Episode IV",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/08:movie.jpg",
        title: "Star Wars: Episode IV - A New Hope (1977)",
        sinopse: "Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construção da Estrela da Morte, uma gigantesca estação espacial com capacidade para destruir um planeta. Luke então se junta aos cavaleiros jedi e a Hans Solo (Harrison Ford), um mercenário, para tentar destruir esta terrível ameaça ao lado dos membros da resistência.",
      }, {
        id: "B9",
        movieId: "O Exterminador do Futuro 2",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/09:movie.jpg",
        title: "O Exterminador do Futuro 2",
        sinopse: "Uma criança destinada a ser líder (Edward Furlong) já nasceu, mas infeliz por viver com pais adotivos, pois foi privado da companhia da mãe (Linda Hamilton), que foi considerada louca quando falou de um exterminador vindo do futuro. Neste contexto, um andróide (Arnold Schwarzenegger) vem do futuro, mais exatamente um modelo T-800 igual ao filme original, para proteger o garoto, mas existe um problema: o mais avançado andróide existente no futuro, um modelo T-1000 (Robert Patrick), que feito de 'metal líquido', não pode ter nenhum dano permanente e pode assumir a forma que desejar, também veio para o passado com a missão de matar o menino.",
      }, {
        id: "B10",
        movieId: "A Lista de Schindler",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/BestR/10:movie.jpg",
        title: "A Lista de Schindler (1993)",
        sinopse: "A inusitada história de Oskar Schindler (Liam Neeson), um sujeito oportunista, sedutor, 'armador', simpático, comerciante no mercado negro, mas, acima de tudo, um homem que se relacionava muito bem com o regime nazista, tanto que era membro do próprio Partido Nazista (o que não o impediu de ser preso algumas vezes, mas sempre o libertavam rapidamente, em razão dos seus contatos). No entanto, apesar dos seus defeitos, ele amava o ser humano e assim fez o impossível, a ponto de perder a sua fortuna mas conseguir salvar mais de mil judeus dos campos de concentração.",
      }];
  
      this.carouselPopularItems = [{
        id: "P1",
        movieId: "Pulp Fiction",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/01:movie.png",
        title: "Pulp Fiction - Tempo de Violência (1994)",
        sinopse: "Vincent Vega (John Travolta) e Jules Winnfield (Samuel L. Jackson) são dois assassinos profissionais trabalham fazendo cobranças para Marsellus Wallace (Ving Rhames), um poderosos gângster. Vega é forçado a sair com a garota do chefe, temendo passar dos limites; enquanto isso, o pugilista Butch Coolidge (Bruce Willis) se mete em apuros por ganhar luta que deveria perder.",
      }, {
        id: "P2",
        movieId: "O Silêncio dos Inocentes",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/02:movie.jpg",
        title: "O Silêncio dos Inocentes (1991)",
        sinopse: "A agente do FBI, Clarice Starling (Jodie Foster) é ordenada a encontrar um assassino que arranca a pele de suas vítimas. Para entender como ele pensa, ela procura o periogoso psicopata, Hannibal Lecter (Anthony Hopkins), encarcerado sob a acusação de canibalismo.",
      }, {
        id: "P3",
        movieId: "Forrest Gump",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/03:movie.jpg",
        title: "Forrest Gump (1994)",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
      }, {
        id: "P4",
        movieId: "Jurassic Park",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/04:movie.jpg",
        title: "Jurassic Park (1993)",
        sinopse: "Um parque construído por um milionário (Richard Attenborough) tem como habitantes dinossauros diversos, extintos a sessenta e cinco milhões de anos. Isto é possível por ter sido encontrado um inseto fossilizado, que tinha sugado sangue destes dinossauros, de onde pôde-se isolar o DNA, o código químico da vida, e, a partir deste ponto, recriá-los em laboratório. Mas, o que parecia ser um sonho se torna um pesadelo, quando a experiência sai do controle de seus criadores.",
      }, {
        id: "P5",
        movieId: "O Fugitivo",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/05:movie.jpg",
        title: "O Fugitivo (1993)",
        sinopse: "Richard Kimble (Harrison Ford), um eminente cirurgião, é condenado à morte injustamente pelo assassinato de Helen Kimble (Sela Ward), sua esposa, mas consegue escapar devido a um acidente quando rumava para o presídio, onde ficaria até ser executado. Mas é implacavelmente perseguido por Samuel Gerard (Tommy Lee Jones), um dos agentes que tentam recapturá-lo, forçando-o a não ter nenhum contato com amigos. No entanto, Kimble está determinado a encontrar provas que determinem sua inocência.",
      }, {
        id: "P6",
        movieId: "Um Sonho de Liberdade",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/06:movie.jpg",
        title: "Um Sonho de Liberdade (1994)",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela. Ele é mandado para uma prisão que é o pesadelo de qualquer detento, a Penitenciária Estadual de Shawshank, no Maine. Lá ele irá cumprir a pena perpétua. Andy logo será apresentado a Warden Norton (Bob Gunton), o corrupto e cruel agente penitenciário, que usa a Bíblia como arma de controle e ao Capitão Byron Hadley (Clancy Brown) que trata os internos como animais. Andy faz amizade com Ellis Boyd Redding (Morgan Freeman), um prisioneiro que cumpre pena há 20 anos e controla o mercado negro da instituição.",
      }, {
        id: "P7",
        movieId: "O Exterminador do Futuro 2",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/07:movie.jpg",
        title: "O Exterminador do Futuro 2",
        sinopse: "Uma criança destinada a ser líder (Edward Furlong) já nasceu, mas infeliz por viver com pais adotivos, pois foi privado da companhia da mãe (Linda Hamilton), que foi considerada louca quando falou de um exterminador vindo do futuro. Neste contexto, um andróide (Arnold Schwarzenegger) vem do futuro, mais exatamente um modelo T-800 igual ao filme original, para proteger o garoto, mas existe um problema: o mais avançado andróide existente no futuro, um modelo T-1000 (Robert Patrick), que feito de 'metal líquido', não pode ter nenhum dano permanente e pode assumir a forma que desejar, também veio para o passado com a missão de matar o menino.",
      }, {
        id: "P8",
        movieId: "Coração Valente",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/08:movie.jpg",
        title: "Coração Valente (1995)",
        sinopse: "No século XIII, soldados ingleses matam a mulher do escocês William Wallace (Mel Gibson), bem na sua noite de núpcias. Para vingar a amada, ele resolve liderar seu povo em uma luta contra o cruel Rei inglês Edward I (Patrick McGoohan). Com a ajuda de Robert e Bruce, ele vai deflagrar uma violenta batalha com o objetivo de libertar a Escócia de uma vez por todas.",
      }, {
        id: "P9",
        movieId: "Batman",
        modal: false,
        image: "../../assets/online-evaluations/ml-10m/Pop/09:movie.jpg",
        title: "Batman (1989)",
        sinopse: "Em Gotham City o milionário Bruce Wayne (Michael Keaton), que quando jovem teve os pais assassinados por bandidos, resolve combater o crime como Batman, o Homem-Morcego. Mas chega o dia em que o vilão Coringa (Jack Nicholson) decide dominar a cidade e se torna um grande desafio para o super-herói.",
      }, {
        id: "P10",
        movieId: "Star Wars: Episode IV",
        modal: false,
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
  
    changeCheckbox(e, obj){
      if(e.target.checked){
        this.checkEquivality(obj, true);
      }else{
        /*if (obj.id[0] == 'P'){
          console.log('P: ' + obj.id[0]);
        }else if (obj.id[0] == 'B'){
          console.log('B: ' + obj.id[0]);
        }else if (obj.id[0] == 'M'){
          console.log('M: ' + obj.id[0]);
        }else if (obj.id[0] == 'N'){
          console.log('N: ' + obj.id[0]);
        }else{
          console.log("Error em achar de qual lista o elemento pertence")
        }*/
        this.checkEquivality(obj, false);
      }
      console.log(this.selectItems);
    }
  
    checkEquivality(obj, opc){
      if(opc){
        for (let i of this.carouselPopularItems){
          if(i.movieId == obj.movieId){
            this.selectItems.push(i.id);
            i.modal = opc
          }
        }
        for (let i of this.carouselBestItems){
          if(i.movieId == obj.movieId){
            this.selectItems.push(i.id);
            i.modal = opc
          }
        }
        for (let i of this.carouselMaxItems){
          if(i.movieId == obj.movieId){
            this.selectItems.push(i.id);
            i.modal = opc
          }
        }
        for (let i of this.carouselNiItems){
          if(i.movieId == obj.movieId){
            this.selectItems.push(i.id);
            i.modal = opc
          }
        }
      }else{
        let index = -1;
        for (let i of this.carouselPopularItems){
          if(i.movieId == obj.movieId){
            index = this.selectItems.indexOf(i.id);
            if(index != -1){
              this.selectItems.splice(index, 1);
              i.modal = opc
            }
          }
        }
        for (let i of this.carouselBestItems){
          if(i.movieId == obj.movieId){
            index = this.selectItems.indexOf(i.id);
            if(index != -1){
              this.selectItems.splice(index, 1);
              i.modal = opc
            }
          }
        }
        for (let i of this.carouselMaxItems){
          if(i.movieId == obj.movieId){
            index = this.selectItems.indexOf(i.id);
            if(index != -1){
              this.selectItems.splice(index, 1);
              i.modal = opc
            }
          }
        }
        for (let i of this.carouselNiItems){
          if(i.movieId == obj.movieId){
            index = this.selectItems.indexOf(i.id);
            if(index != -1){
              this.selectItems.splice(index, 1);
              i.modal = opc
            }
          }
        }
      }
    }
  
    sendEvaluation(){
      this.time = new Date().getTime() - this.time;
      console.log(new Date().getTime())

      this.angFireData.database.ref('/Users/' + this.user +'/PageFive').set({
        time: this.time,
        items: this.selectItems
      }).then((res) => {
        this.router.navigate(['/six']);
      }).catch((err) => {
        console.log("erro na pagina 5: " + err);
      });
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
