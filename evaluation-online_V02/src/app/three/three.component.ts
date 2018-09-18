import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  public listAMovies: Array<any>;
  public listBMovies: Array<any>;
  public listEvaluations = [];

  private modalRef: any;
  public closeResult: string; 

  public evaluation: any = {
    rec: null,
    q1: null,
    q2: null,
    q3: null,
    time: null
  }

  public movie : any;

  public time: any;
  public timeAll: any;
  public intr: any = undefined;
  public user: any = undefined;

  public q1 : any;
  public q2 : any;
  public q3 : any;

  public contMovie : number = 0;
  public step : String = "";
  public lengthList : number;
  public buttonNext : String = "Próximo";

  constructor(private modalService: NgbModal, private router: Router,
    private angFireData: AngularFireDatabase) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.intr = localStorage.getItem('interator');
    
    this.time = new Date().getTime();
    this.timeAll = new Date().getTime();

    this.user = localStorage.getItem('user');

    this.listAMovies = [{
      id: "1",
      rec: ['Popularidade', 'Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem1.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "2",
      rec: ['Popularidade', 'Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem2.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "3",
      rec: ['Popularidade', 'Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem3.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "4",
      rec: ['Popularidade', 'Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem4.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "5",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem5.jpg",
      title: "BATMAN: O CAVALEIRO DAS TREVAS (2008)",
      rec: ['Popularidade', 'Best-Rated'],
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham. Mas um jovem e anárquico criminoso conhecido como Coringa ganha força e decide instaurar um verdadeiro caos na cidade. O justiceiro será testado psicologicamente e fisicamente como nunca fora antes em um confronto bastante pessoal. Cabe a Batman encontrar uma maneira de deter o sádico vilão antes que mais vidas sejam perdidas.",
    }, {
      id: "6",
      rec: ['Popularidade', 'Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem6.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "7",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem7.jpg",
      title: "O SENHOR DOS ANÉIS: O RETORNO DO REI (2003)",
      rec: ['Popularidade', 'Best-Rated'],
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    }, {
      id: "8",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem8.jpg",
      title: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL (2001)",
      rec: ['Popularidade', 'Best-Rated'],
      sinopse: "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.",
    }, {
      id: "9",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem9.jpg",
      title: "STAR WARS: EPISODE IV - A NEW HOPE (1977)",
      rec: ['Popularidade', 'Best-Rated'],
      sinopse: "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
    }, {
      id: "10",
      rec: ['Popularidade'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem10.jpg",
      title: "O SENHOR DOS ANÉIS: AS DUAS TORRES (2002)",
      sinopse: "Após a captura de Merry (Dominic Monaghan) e Pippy (Billy Boyd) pelos orcs, a Sociedade do Anel é dissolvida. Enquanto que Frodo (Elijah Wood) e Sam (Sean Astin) seguem sua jornada rumo à Montanha da Perdição para destruir o Um Anel, Aragorn (Viggo Mortensen), Legolas (Orlando Bloom) e Gimli (John Rhys-Davies) partem para resgatar os hobbits sequestrados.",
    }, {
      id: "11",
      rec: ['Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem9.jpg",
      title: "PULP FICTION (1994)",
      sinopse: "Os caminhos de vários criminosos se cruzam nestas três histórias de Quentin Tarantino. Um pistoleiro se apaixona pela mulher de seu chefe, um boxeador não se sai bem em uma luta e um casal tenta executar um plano de roubo que foge do controle.",
    }, {
      id: "12",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem1.jpg",
      title: "INCRIVEL HULK (1998)",
      sinopse: "O cientista Bruce Banner se esconde no Brasil enquanto busca desesperadamente a cura da mutação que o transforma em um monstro incontrolável. Só assim ele poderá novamente levar uma vida normal e ficar ao lado da mulher que ama. Porém, durante este processo, ele tem que lutar contra um novo inimigo que quer capturá-lo, conhecido como 'O Abominável'.",
    }, {
      id: "13",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem2.jpg",
      title: "END OF WATCH (2012)",
      sinopse: "Os policiais Brian e Mike, além de parceiros, são amigos. Brian resolve gravar a rotina da dupla pelas ruas de Los Angeles para um curso. A câmera registra momentos familiares e cenas de tensão quando os dois acabam se envolvendo com traficantes.",
    }, {
      id: "14",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem3.jpg",
      title: "THE BIG CHILL (1983)",
      sinopse: "Sete ex-colegas de faculdade fazem um reencontro durante um fim de semana em uma casa sofisticada na Carolina do Sul, após o funeral de um amigo que se suicidou. Nessa reunião, vêm à tona verdades, sacrifícios e traições passados na vida de cada um.",
    }, {
      id: "15",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem4.jpg",
      title: "HIGH TECH, LOW LIFE (2012)",
      sinopse: "Este documentário segue a trajetória de dois cidadãos chineses que decidem percorrer o próprio país em busca de histórias de cunho social, que a imprensa oficial não conta. Com equipamentos eletrônicos (computadores portáteis, telefones celulares), eles entrevistam pessoas que driblaram o sistema, ao mesmo tempo em que eles mesmos devem evitar a forte censura do governo chinês.",
    }, {
      id: "16",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem5.jpg",
      title: "50/50 (2011)",
      sinopse: "Inspirado em fatos reais. Adam (Joseph Gordon-Levitt) tem apenas 27 anos e descobre que está com câncer. O problema é que ele não fumava, não bebia e foi difícil entender porquê foi aparecer um tumor em sua vida. Mas para ajuda-lo a enfrentar a doença, Adam contara com a ajuda de seu melhor amigo Kyle (Seth Rogen), a princípio um cara irresponsável, porém, fiel ao seu amigo. Ele também vai contar com a ajuda de sua atraente, porém inexperiente analista Katherine (Anna Kendrick). Dessa forma parece até que suas chances de sobrevivência em torno dos 50% não são tão ruins assim. Será que não mesmo?",
    }, {
      id: "17",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem6.jpg",
      title: "ME, MYSELF AND IRENE (2000)",
      sinopse: "Charlie Baileygates (Jim Carrey) é um policial veterano com 17 anos de carreira. Ele é trabalhador, prestativo e um pai devotado. Infelizmente, ele sofre de transtorno de dupla personalidade, e quando deixa de tomar seus remédios vira Hank, a versão agressiva de Charlie. Os dois lados do agente se apaixonam pela mesma mulher (Renée Zellweger) e brigam entre si para conquistar o coração da moça.",
    }, {
      id: "18",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem7.jpg",
      title: "O RETORNO DA MÚMIA (2001)",
      sinopse: "Rick e Evelyn O'Connell estão morando na Londres de 1935, onde criam o filho. Quando uma série de eventos revela o corpo de Imhotep ressuscitado, os O'Connell iniciam uma corrida desesperada para salvar o mundo do mal e resgatar o filho antes que seja tarde demais.",
    }, {
      id: "19",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem8.jpg",
      title: "CHICAGO (2002)",
      sinopse: "Velma, a sensação de um clube noturno, assassina seu marido mulherengo. Então Billy Flyn, o advogado mais esperto de Chicago, é o escolhido para defendê-la. A novata cantora Roxie também acaba na prisão por matar seu namorado, e Billy também pega seu caso, transformando tudo em um circo da mídia. Agora, elas disputam entre si pelo topo do estrelato.",
    }, {
      id: "20",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem9.jpg",
      title: "MR. E MRS. SMITH (2005)",
      sinopse: "John e Jane Smith aparentemente parecem formar um casal normal, mas na realidade ambos mantêm um segredo. Os dois são assassinos de aluguel contratados por empresas rivais. A verdade só vem à tona quando John e Jane, sem saber, recebem uma missão para eliminar o mesmo alvo e mais tarde descobrem que devem matar um ao outro.",
    }, {
      id: "21",
      rec: ['Recent-Items'],
      image: "../../assets/online-evaluations/ml-10m/RecItems/Imagem10.jpg",
      title: "MULHOLLAND DRIVE (2001)",
      sinopse: "Uma jovem atriz viaja para Hollywood e se vê emaranhada numa intriga secreta com uma mulher que escapou por pouco de ser assassinada, e que agora se encontra com amnésia devido a um acidente de carro. Seu mundo se torna um pesadelo e surreal.",
    }];
    this.listBMovies = [{
      id: "2",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem2.jpg",
      title: "THE SHAWSHANK REDEMPTION (1994)",
      sinopse: "Em 1946, o jovem e bem-sucedido banqueiro Andy Dufresne (Tim Robbins) é sentenciado a duas prisões perpétuas consecutivas pelo assassinato de sua esposa e de seu amante, a serem cumpridas na Penitenciária Estadual de Shawshank, no Maine, dirigida pelo cristão devoto, todavia cruel agente penitenciário Samuel Norton (Bob Gunton). Rapidamente, Andy se torna amigo de Ellis 'Red' Redding (Morgan Freeman), interno influente, também sentenciado à prisão perpétua, que controla o mercado negro do presídio. Ao longo das quase duas décadas na prisão, ele se revela um interno incomum, buscando seus objetivos através de seus próprios meios.",
    }, {
      id: "2",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem1.jpg",
      title: "MATRIX (1999)",
      sinopse: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
    }, {
      id: "3",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem3.jpg",
      title: "INCEPTION (2010)",
      sinopse: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
    }, {
      id: "4",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem6.jpg",
      title: "CLUBE DA LUTA (1999)",
      sinopse: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.",
    }, {
      id: "5",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem5.jpg",
      title: "BATMAN: O CAVALEIRO DAS TREVAS (2008)",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem na cidade de Gotham. Mas um jovem e anárquico criminoso conhecido como Coringa ganha força e decide instaurar um verdadeiro caos na cidade. O justiceiro será testado psicologicamente e fisicamente como nunca fora antes em um confronto bastante pessoal. Cabe a Batman encontrar uma maneira de deter o sádico vilão antes que mais vidas sejam perdidas.",
    }, {
      id: "6",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem4.jpg",
      title: "FORREST GUMP (1994)",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
    }, {
      id: "7",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem7.jpg",
      title: "O SENHOR DOS ANÉIS: O RETORNO DO REI (2003)",
      rec: ['Max-Coverage', 'Best-Rated', 'Niche-Coverage'],
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    }, {
      id: "8",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem8.jpg",
      title: "O SENHOR DOS ANÉIS: A SOCIEDADE DO ANEL (2001)",
      rec: ['Best-Rated'],
      sinopse: "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.",
    }, {
      id: "9",
      rec: ['Best-Rated'],
      image: "../../assets/online-evaluations/ml-10m/BestR/Imagem9.jpg",
      title: "PULP FICTION (1994)",
      sinopse: "Os caminhos de vários criminosos se cruzam nestas três histórias de Quentin Tarantino. Um pistoleiro se apaixona pela mulher de seu chefe, um boxeador não se sai bem em uma luta e um casal tenta executar um plano de roubo que foge do controle.",
    }, {
      id: "10",
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem9.jpg",
      title: "STAR WARS: EPISODE IV - A NEW HOPE (1977)",
      rec: ['Best-Rated'],
      sinopse: "A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
    }, {
      id: "11",
      rec: ['Max-Coverage', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem8.jpg",
      title: "(500) DAYS OF SUMMER (2009)",
      sinopse: "Um romântico escritor se surpreende quando sua namorada Summer termina o namoro repentinamente. Com isso, ele relembra vários momentos dos 500 dias que passaram juntos para tentar descobrir onde seu caso de amor se perdeu e vai redescobrindo suas verdadeiras paixões.",
    }, {
      id: "12",
      rec: ['Max-Coverage', 'Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem9.jpg",
      title: "DANGEROUS MINDS (1995)",
      sinopse: "Louanne Johnson, uma oficial da marinha, abandona a vida militar para ser professora de inglês. Porém logo na primeira escola em que trabalha, ela se depara com diversas barreiras, tendo que lidar com a rebeldia dos alunos. Como a professora não consegue a atenção da sua classe, ela parte para outra forma de ensino e passa a dar aulas com karatê e músicas de Bob Dylan, tentando ajudar a turma através de métodos pouco convencionais.",
    }, {
      id: "13",
      rec: ['Max-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/MaxCoverage/Imagem10.jpg",
      title: "UP (2005)",
      sinopse: "Carl Fredricksen é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. Após um incidente, Carl é considerado uma ameaça pública e forçado a ser internado. Para evitar que isto aconteça, ele põe balões em sua casa, fazendo com que ela levante voo. Carl quer viajar para uma floresta na América do Sul, onde ele e Ellie sempre desejaram morar, mas descobre que um problema embarcou junto: Russell, um menino de 8 anos.",
    }, {
      id: "14",
      rec: ['Niche-Coverage'],
      image: "../../assets/online-evaluations/ml-10m/Pop/Imagem10.jpg",
      title: "O SENHOR DOS ANÉIS: AS DUAS TORRES (2002)",
      sinopse: "Após a captura de Merry (Dominic Monaghan) e Pippy (Billy Boyd) pelos orcs, a Sociedade do Anel é dissolvida. Enquanto que Frodo (Elijah Wood) e Sam (Sean Astin) seguem sua jornada rumo à Montanha da Perdição para destruir o Um Anel, Aragorn (Viggo Mortensen), Legolas (Orlando Bloom) e Gimli (John Rhys-Davies) partem para resgatar os hobbits sequestrados.",
    }];
    
    this.listAMovies = this.shuffle(this.listAMovies);
    this.listBMovies = this.shuffle(this.listBMovies);
    
    if((this.intr % 2) == 0){
      this.movie = this.listAMovies[this.contMovie]
    }else{
      this.movie = this.listBMovies[this.contMovie]
    }

    if((this.intr % 2) == 0){
      this.lengthList = this.listAMovies.length
    }else{
      this.lengthList = this.listBMovies.length
    }
    
    this.step = (this.contMovie + 1) + '/' + (this.lengthList);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  nextEvaluationMovie(){
    window.scrollTo(0, 0);
    let lengthList = this.listAMovies.length - 1

    if(!this.q1){
      //return this.errorParams('1');
      this.q1 = 'sem resposta'
    }
    if(!this.q2){
      //return this.errorParams('2');
      this.q2 = 'sem resposta'
    }
    if(!this.q3){
      //return this.errorParams('3');
      this.q3 = 'sem resposta'
    }

    //adicionar os dados do filme a um array
    this.time = new Date().getTime() - this.time;
    this.timeAll = new Date().getTime() - this.timeAll;
    this.listEvaluations.push({
      rec: this.movie.rec,
      title: this.movie.title,
      q1: this.q1,
      q2: this.q2,
      q3: this.q3,
      time: this.time
    });

    if(this.contMovie == (this.lengthList - 1)){
      console.log("FINISH")
      this.angFireData.database.ref('/Users/' + this.user +'/PageThree').set({
        timeAll: this.timeAll,
        evaluations: this.listEvaluations,
      }).then((res) => {
        this.router.navigate(['/four']);
      }).catch((err) => {
        console.log("erro na pagina 3: " + err);
      });
    }else{
      this.contMovie += 1;
      if((this.intr % 2) == 0){
        this.movie = this.listAMovies[this.contMovie]
      }else{
        this.movie = this.listBMovies[this.contMovie]
      }
      this.step = (this.contMovie + 1) + '/' + (this.lengthList);
    }
    this.time = new Date().getTime();
    this.q1 = null;
    this.q2 = null;
    this.q3 = null;
  }



  sendNoEvaluation(content){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if(result == "CONFIRM"){

        this.nextEvaluationMovie();

      }else{
        console.log(`Closed with: ${result}`);
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
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
