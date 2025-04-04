//Moonlander. Um jogo de alunissagem.
//Davi Joaquim (https://github.com/daviJoaquim)
//28/03/2025
//Versão 0.1.0


/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");


 let lancamentoPelaEsquerda = (Math.round(Math.random()) == 0)

let moduloLunar = {
    posicao: {
        x: lancamentoPelaEsquerda ? 100 : 700,
        y: 100
    },
    angulo: lancamentoPelaEsquerda ? -Math.PI/2 : Math.PI/2,
    largura: 20,
    altura: 20,
    cor: "pink",
    motorLigado: false,
    velocidade: {
        x: lancamentoPelaEsquerda ? 2 : -2,
        y: 0,
    },
    combustivel: 100,
    rotacaoAntiHorario: false,
    rotacaoHorario: false,

 }

 let estrelas = [];

 for(let i = 0; i < 500; i ++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(2 * Math.random()),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()

    }

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
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 30);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "yellow";
    contexto.fill();
 }
        function mostrarVelocidade(){
         mostrarIndicador(
            mensagem =`Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`,
            x = 110,
            y = 30
        )
        }

        function mostrarCombustivel(){
        mostrarIndicador(
            mensagem =`Combustível: ${(moduloLunar.combustivel).toFixed(0)}`,
            x = 280,
            y = 30
       )   
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
            mostrarIndicador(
            mensagem = `Angulo: ${(moduloLunar.angulo * 180/Math.PI).toFixed(0)}°`,
            x = 110,
            y = 50
        );
        }

        function mostrarVelocidadeHorizontal(){
        mostrarIndicador(
            mensagem =`Velocidade Vertical: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`,
            x = 280,
            y = 50
        )
        }

        function mostrarAltitude(){
        mostrarIndicador( 
          mensagem = `Altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(0)}`,
          x = 110,
          y = 70
        ) 
        }
        
        function mostrarPorcentagemDoCombustivel(){
         mostrarIndicador(
         mensagem =`Porcentagem: ${(moduloLunar.combustivel/100) * 100 .toFixed(0)}%`,
         x = 280,
         y = 70
        )
        }

        function desenharEstrelas(){
            for(let i = 0; i < estrelas.length; i++){
                let estrela = estrelas[i];
            contexto.beginPath();
            contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2*Math.PI);
            contexto.closePath();
            contexto.fillStyle = `rgba(255, 0, 157, ${ estrela.brilho})`;
            contexto.fill();
            if(estrela.apagando){
                estrela.brilho -= estrela.cintilacao;
                if(estrela.brilho < 0){
                    estrela.apagando = false;
                }
            } else{
                estrela.brilho += estrela.cintilacao;
                if(estrela.brilho >= 1.0){
                   estrela.apagando = true
                }

            }
            
        } 
        contexto.restore();
        }

        function mostrarResultado(mensagem, cor){
            contexto.font = "bold 40px Calibri";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = cor;
        contexto.fillText(mensagem, canvas.width/2, canvas.height/2);
        }

        function mostrarIndicador(mensagem, x, y){
        contexto.font = "bold 18px Arial";
        contexto.textAlign = "left";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "lightgray";
        contexto.fillText(mensagem, x, y);
        }

    function desenhar(){
   //limpar tela
   contexto.clearRect(0, 0, canvas.width, canvas.height);
   //Esta função atualiza a posição do módulo da função
   atracaoGravitacional();
   desenharEstrelas();
   desenharModuloLunar();
   mostrarVelocidade();
   mostrarCombustivel();
   mostrarAngulo();
   mostrarVelocidadeHorizontal();
   mostrarAltitude();
   mostrarPorcentagemDoCombustivel();
   //Esta função repete a execução da função desenhar cada atualização a cada quadro
   if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)) {

    if(moduloLunar.velocidade.y >= 0.5 ||
       Math.abs(moduloLunar.velocidade.x) >= 0.5 ||
        5 < Math.abs(moduloLunar.angulo)
    )
    {   
        mostrarResultado('Você morreu na queda!', "red", 400, 300);
        return;
    }else{
       mostrarResultado('Você conseguiu pousar!', "green", 400, 300);
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