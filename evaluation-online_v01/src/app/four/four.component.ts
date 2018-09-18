import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';  

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.css']
})
export class FourComponent implements OnInit {

  public selectItems = [];
  public listOfItems = [];
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
      movieId: "THE SHAWSHANK REDEMPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem1.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "N2",
      movieId: "STAR WARS: EPISODE IV - A NEW HOPE",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem2.jpg",
      title: "STAR WARS: EPISODE IV - A NEW HOPE (1977)",
      sinopse: "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
    }, {
      id: "N3",
      movieId: "O EXTERMINADOR DO FUTURO 2",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem3.jpg",
      title: "O EXTERMINADOR DO FUTURO 2 (1991)",
      sinopse: "O jovem John Connor, a chave para a vitória da civilização sobre uma rebelião de robôs do futuro, é o alvo do T-1000, um exterminador que muda de forma e que foi enviado do futuro para matá-lo. Outro exterminador, o renovado T-800, foi enviado de volta para proteger o menino e, com John e sua mãe em uma fuga, o rapaz faz uma ligação inesperada com o robô.",
    }, {
      id: "N4",
      movieId: "MATRIX",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem4.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "N5",
      movieId: "FORREST GUMP",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem5.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "N6",
      movieId: "CLUBE DA LUTA",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem6.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "N7",
      movieId: "DE VOLTA PARA O FUTURO",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem7.jpg",
      title: "DE VOLTA PARA O FUTURO (1985)",
      sinopse: "Marty McFly, um adolescente de uma pequena cidade californiana, é transportado para a década de 1950 quando a experiência do excêntrico cientista Doc Brown dá errado. Viajando no tempo em um carro modificado, Marty conhece versões jovens de seus pais e precisa fazer com que eles se apaixonem ou então ele deixará de existir. Para complicar, Marty precisa voltar para casa a tempo de salvar o cientista.",
    }, {
      id: "N8",
      movieId: "INCEPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem8.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "N9",
      movieId: "A LISTA DE SCHINDLER",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem9.jpg",
      title: "A LISTA DE SCHINDLER (1993)",
      sinopse: "O alemão Oskar Schindler viu na mão de obra judia uma solução barata e viável para lucrar com negócios durante a guerra. Com sua forte influência dentro do partido nazista, foi fácil conseguir as autorizações e abrir uma fábrica. O que poderia parecer uma atitude de um homem não muito bondoso, transformou-se em um dos maiores casos de amor à vida da História, pois este alemão abdicou de toda sua fortuna para salvar a vida de mais de mil judeus em plena luta contra o extermínio alemão.",
    }, {
      id: "N10",
      movieId: "WALL-E",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/NiCoverage/Imagem10.jpg",
      title: "WALL-E (2008)",
      sinopse: "WALL-E, abreviação de Waste Allocation Load Lifter Earth-class, é o último robô deixado na Terra. Ele passa o dia arrumando o lixo do planeta. Mas por 700 anos, WALL-E desenvolveu uma personalidade e é mais do que um robô. Ao avistar Eve, uma sonda mecânica em missão à Terra, ele se apaixona e resolve segui-la por toda a galáxia.",
    }];

    this.carouselMaxItems = [{
      id: "M1",
      movieId: "MATRIX",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem1.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "M2",
      movieId: "THE SHAWSHANK REDEMPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem2.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "M3",
      movieId: "INCEPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem3.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "M4",
      movieId: "FORREST GUMP",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem4.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "M5",
      movieId: "O SENHOR DOS ANÉIS: O RETORNO DO REI",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem5.jpg",
      title: "O SENHOR DOS ANÉIS: O RETORNO DO REI (2003)",
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    }, {
      id: "M6",
      movieId: "CLUBE DA LUTA",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem6.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "M7",
      movieId: "BATMAN: O CAVALEIRO DAS TREVAS",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem7.jpg",
      title: "BATMAN: O CAVALEIRO DAS TREVAS (2008)",
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham. Mas um jovem e anárquico criminoso conhecido como Coringa ganha força e decide instaurar um verdadeiro caos na cidade. O justiceiro será testado psicologicamente e fisicamente como nunca fora antes em um confronto bastante pessoal. Cabe a Batman encontrar uma maneira de deter o sádico vilão antes que mais vidas sejam perdidas.",
    }, {
      id: "M8",
      movieId: "(500) DAYS OF SUMMER",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem8.jpg",
      title: "(500) DAYS OF SUMMER (2009)",
      sinopse: "Um romântico escritor se surpreende quando sua namorada Summer termina o namoro repentinamente. Com isso, ele relembra vários momentos dos 500 dias que passaram juntos para tentar descobrir onde seu caso de amor se perdeu e vai redescobrindo suas verdadeiras paixões.",
    }, {
      id: "M9",
      movieId: "DANGEROUS MINDS",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem9.jpg",
      title: "DANGEROUS MINDS (1995)",
      sinopse: "Louanne Johnson, uma oficial da marinha, abandona a vida militar para ser professora de inglês. Porém logo na primeira escola em que trabalha, ela se depara com diversas barreiras, tendo que lidar com a rebeldia dos alunos. Como a professora não consegue a atenção da sua classe, ela parte para outra forma de ensino e passa a dar aulas com karatê e músicas de Bob Dylan, tentando ajudar a turma através de métodos pouco convencionais.",
    }, {
      id: "M10",
      movieId: "UP",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem10.jpg",
      title: "UP (2005)",
      sinopse: "Carl Fredricksen é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. Após um incidente, Carl é considerado uma ameaça pública e forçado a ser internado. Para evitar que isto aconteça, ele põe balões em sua casa, fazendo com que ela levante voo. Carl quer viajar para uma floresta na América do Sul, onde ele e Ellie sempre desejaram morar, mas descobre que um problema embarcou junto: Russell, um menino de 8 anos.",
    }];

    this.carouselBestItems = [{
      id: "B1",
      movieId: "THE SHAWSHANK REDEMPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem1.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "B2",
      movieId: "MATRIX",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem2.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "B3",
      movieId: "INCEPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem3.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "B4",
      movieId: "CLUBE DA LUTA",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem4.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "B5",
      movieId: "BATMAN: O CAVALEIRO DAS TREVAS",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem5.jpg",
      title: "BATMAN: O CAVALEIRO DAS TREVAS (2008)",
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham. Mas um jovem e anárquico criminoso conhecido como Coringa ganha força e decide instaurar um verdadeiro caos na cidade. O justiceiro será testado psicologicamente e fisicamente como nunca fora antes em um confronto bastante pessoal. Cabe a Batman encontrar uma maneira de deter o sádico vilão antes que mais vidas sejam perdidas.",
    }, {
      id: "B6",
      movieId: "FORREST GUMP",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem6.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "B7",
      movieId: "O SENHOR DOS ANÉIS: O RETORNO DO REI",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem7.jpg",
      title: "O SENHOR DOS ANÉIS: O RETORNO DO REI (2003)",
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    }, {
      id: "B8",
      movieId: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem8.jpg",
      title: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL (2001)",
      sinopse: "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.",
    }, {
      id: "B9",
      movieId: "PULP FICTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem9.jpg",
      title: "PULP FICTION (1994)",
      sinopse: "Os caminhos de vários criminosos se cruzam nestas três histórias de Quentin Tarantino. Um pistoleiro se apaixona pela mulher de seu chefe, um boxeador não se sai bem em uma luta e um casal tenta executar um plano de roubo que foge do controle.",
    }, {
      id: "B10",
      movieId: "STAR WARS: EPISODE IV - A NEW HOPE",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem10.jpg",
      title: "STAR WARS: EPISODE IV - A NEW HOPE (1977)",
      sinopse: "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
    }];

    this.carouselPopularItems = [{
      id: "P1",
      movieId: "MATRIX",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem1.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "P2",
      movieId: "THE SHAWSHANK REDEMPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem2.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "P3",
      movieId: "INCEPTION",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem3.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "P4",
      movieId: "FORREST GUMP",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem4.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "P5",
      movieId: "BATMAN: O CAVALEIRO DAS TREVAS",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem5.jpg",
      title: "BATMAN: O CAVALEIRO DAS TREVAS (2008)",
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham. Mas um jovem e anárquico criminoso conhecido como Coringa ganha força e decide instaurar um verdadeiro caos na cidade. O justiceiro será testado psicologicamente e fisicamente como nunca fora antes em um confronto bastante pessoal. Cabe a Batman encontrar uma maneira de deter o sádico vilão antes que mais vidas sejam perdidas.",
    }, {
      id: "P6",
      movieId: "CLUBE DA LUTA",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem6.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "P7",
      movieId: "O SENHOR DOS ANÉIS: O RETORNO DO REI",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem7.jpg",
      title: "O SENHOR DOS ANÉIS: O RETORNO DO REI (2003)",
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    }, {
      id: "P8",
      movieId: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem8.jpg",
      title: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL (2001)",
      sinopse: "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.",
    }, {
      id: "P9",
      movieId: "STAR WARS: EPISODE IV - A NEW HOPE",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem9.jpg",
      title: "STAR WARS: EPISODE IV - A NEW HOPE (1977)",
      sinopse: "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
    }, {
      id: "P10",
      movieId: "O SENHOR DOS ANÉIS: AS DUAS TORRES",
      modal: false,
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem10.jpg",
      title: "O SENHOR DOS ANÉIS: AS DUAS TORRES (2002)",
      sinopse: "Após a captura de Merry (Dominic Monaghan) e Pippy (Billy Boyd) pelos orcs, a Sociedade do Anel é dissolvida. Enquanto que Frodo (Elijah Wood) e Sam (Sean Astin) seguem sua jornada rumo à Montanha da Perdição para destruir o Um Anel, Aragorn (Viggo Mortensen), Legolas (Orlando Bloom) e Gimli (John Rhys-Davies) partem para resgatar os hobbits sequestrados.",
    }];


    this.carouselTile = {
      grid: {xs: 2, sm: 4, md: 5, lg: 6, all: 0},
      slide: 3,
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
      
      this.checkEquivality(obj, false);
    }
    console.log("select: ", this.selectItems);
    console.log("interation items: ", this.listOfItems)
  }

  checkEquivality(obj, opc){
    let listCurrentItems = []

    for (let i of this.carouselPopularItems){
      if(i.movieId == obj.movieId){
        listCurrentItems.push(i.id);
        // this.selectItems.push(i.id);
        i.modal = opc
      }
    }
    for (let i of this.carouselBestItems){
      if(i.movieId == obj.movieId){
        listCurrentItems.push(i.id);
        i.modal = opc
      }
    }
    for (let i of this.carouselMaxItems){
      if(i.movieId == obj.movieId){
        listCurrentItems.push(i.id);
        i.modal = opc
      }
    }
    for (let i of this.carouselNiItems){
      if(i.movieId == obj.movieId){
        listCurrentItems.push(i.id);
        i.modal = opc
      }
    }

    console.log("Current: " ,listCurrentItems)
    if(opc){
      this.listOfItems.push(obj.id)
      this.selectItems.push(listCurrentItems);
    }else{
      let index = -1;
      index = this.listOfItems.indexOf(obj.id);
      if(index != -1){
        this.listOfItems.splice(index, 1);
      }

      index = 0;
      for(let i of this.selectItems){
        if(this.arraysEqual(listCurrentItems,i)){
          this.selectItems.splice(index, 1);  
        }
      }
    }
  }

  arraysEqual(arr1, arr2):boolean {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
  }

  sendEvaluation(){
    if(this.selectItems.length >= 0 && this.listOfItems.length >= 0){
      this.time = new Date().getTime() - this.time;
      console.log(new Date().getTime())

      this.angFireData.database.ref('/Users/' + this.user +'/PageFour').set({
        time: this.time,
        items: this.selectItems,
        itemsInteration: this.listOfItems
      }).then((res) => {
        this.router.navigate(['/five']);
      }).catch((err) => {
        console.log("erro na pagina 4: " + err);
      });

    }else{
      alert("Por favor selecione um filme para assistir");
    }
  }

  leaveSystem(content){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if(result == "CONFIRM"){

        this.router.navigate(['/end']);

      }else{
        console.log(`Closed with: ${result}`);
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
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
