//Moonlander. Um jogo de alunissagem.
//Davi Joaquim (https://github.com/daviJoaquim)
//28/03/2025
//Versão 0.1.0


/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let x;
 let velocidadeX;
 let angulo;
 if(Math.round(Math.random()) == 0){
    x = 100;
    velocidadeX = 2;
    angulo = -Math.PI/2;
 }else{
    x = 700
    velocidadeX = -2;
    angulo = -Math.PI/2;
 }

let moduloLunar = {
    posicao: {
        x: x,
        y: 100
    },
    angulo: -Math.PI/2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0,
    },
    combustivel: 100,
    rotacaoAntiHorario: false,
    rotacaoHorario: false,

 }

 let estrelas = [];
 for(let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0,
        diminuicao: true,
        razaoDeCincitalacao: Math.random() * 0.05
    };
 }
 
    //Seção de Visualização
 function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
    }

    //desenharChama()
    
    contexto.restore();
 }

 function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 100);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
 }
    function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 150, 30);
    }

    function mostrarCombustivel(){
        contexto.font = "bold 18px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "lightgray";
        let combustivel = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}`;
        contexto.fillText(combustivel, 350, 30);
        
    }

    function gasto(){
        if(moduloLunar.combustivel > 0){
            moduloLunar.combustivel --
        }else{
            moduloLunar.combustivel = 0 
            moduloLunar.motorLigado = false
        }
    }

    function mostrarAngulo(){
        contexto.font = "bold 18px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "lightgray";
        let angulo = `Angulo: ${(moduloLunar.angulo * 180/Math.PI).toFixed(0)}°`;
        contexto.fillText(angulo, 150, 50);
        }
        
        function mostrarVelocidadeHorizontal(){
        contexto.font = "bold 18px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "lightgray";
        let velocidade = `Velocidade Verlical: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`;
        contexto.fillText(velocidade, 350, 50);
        }

        function mostrarAltitude(){
        contexto.font = "bold 18px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "lightgray";
        let altitude = `Altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(0)}`;
        contexto.fillText(altitude, 150, 70);
        }
        
        function mostrarPorcentagemDoCombustivel(){
            contexto.font = "bold 18px Arial";
            contexto.textAlign = "center";
            contexto.textBaseline = "middle";
            contexto.fillStyle = "lightgray";
            let combustivel = `Combustível Porcentagem: ${(moduloLunar.combustivel/100) * 100 .toFixed(0)}%`;
            contexto.fillText(combustivel, 350, 70);
            
        }

        function desenharEstrelas(){
            for( let i = 0; i < estrelas.length; i++){
                let estrela = estrelas[i];
                contexto.beginPath();
                contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
                contexto.closePath();
                contexto.fillStyle = "rgba(255, 255, 255, " + estrela.transparencia + ")";
                contexto.fill();
                contexto.restore();
            }
        }
    function desenhar(){
   //limpar tela
   contexto.clearRect(0, 0, canvas.width, canvas.height);
   //Esta função atualiza a posição do módulo da função
   atracaoGravitacional();
   desenharModuloLunar();
   mostrarVelocidade();
   mostrarCombustivel();
   mostrarAngulo();
   mostrarVelocidadeHorizontal();
   mostrarAltitude();
   mostrarPorcentagemDoCombustivel();
   desenharEstrelas();
   //Esta função repete a execução da função desenhar cada atualização a cada quadro
   if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)) {

    if(moduloLunar.velocidade.y >= 0.5 || moduloLunar.velocidade.x != 0.005 || 5 < moduloLunar.angulo || moduloLunar.angulo < 5){
        contexto.font = "bold 50px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "red";
        contexto.fillText('Você morreu na queda!', canvas.width/2, canvas.height/2);
        return;
    }else{
        contexto.font = "bold 50px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "green";
        contexto.fillText('Você conseguiu pousar!', canvas.width/2, canvas.height/2);
        return;
    }
   }

   requestAnimationFrame(desenhar);
}
    //Seção de controle

   //Pressionando a seta para cima para ligar o motor 
 document.addEventListener("keydown", teclaPressionada)

 function teclaPressionada(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = true;
        gasto()
     }else if(evento.keyCode == 39){
      moduloLunar.rotacaoAntiHorario = true;
        
     }else if(evento.keyCode == 37){
    moduloLunar.rotacaoHorario = true;
     }
    }
  

 document.addEventListener("keyup", teclaSolta);
 function teclaSolta(evento){
    if(evento.keyCode == 38){
    moduloLunar.motorLigado = false;
    
    }else if(evento.keyCode == 39){
      moduloLunar.rotacaoAntiHorario = false;

    }else if(evento.evento == 37){
      moduloLunar.rotacaoHorario = false;
       
    }
}
let gravidade = 0.03;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario ){
        moduloLunar.angulo += Math.PI/180; 
    }else if (moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180;
    }

    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.2 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.2 * Math.sin(moduloLunar.angulo);
    }

    moduloLunar.velocidade.y += gravidade;
    if(moduloLunar.posicao.y < 10){
        moduloLunar.posicao.y = 10;
        moduloLunar.velocidade.y = 0;
       
    }
    if(moduloLunar.posicao.y > 590){
        moduloLunar.posicao.y = 590;
        moduloLunar.velocidade.y = 0;
    }

}
desenhar();

