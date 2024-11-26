//declaração de state, variáveis globais da engine
//view: variaveis globais visuais
//values: variáveis globais de background, rodando sem visualização
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemey: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        
        gameVelocity: 1000,
        //variavel para ser atribuido o hit
        hitPosition: 0,
        //Resultado geral
        result: 0,
        //tempo de jogo
        currentTime: 60,
    },
    action:{
        timerId: setInterval(randomSquare, 1000),
        //variavel de velocidade de randomização do ralph
        countDownTimerId: setInterval(countDown, 1000),
    }
};

//função para decrementar o tempo de jogo
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    //Verificação se o tempo acabou
    if(state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert("GAME OVER! Seu resultado foi: " + state.values.result);
    }
}
//passando o audioname como parametro, criamos uma interpolação.
//ao chamar a função, apenas indicar o audio que deseja utilizar, exemplo playSound(hit)
function playSound(audioName) {
    let audio = new Audio(`./src/songs/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
//Função limpa o enemy ao iniciar,
//Aplica o enemy aleatóriamente após a limpeza
function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

/*function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, 1000);
}*/


//Conceito universal listener, função ouvinte
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
//função main, initializer
function main(){
    //Chamada de função 

    addListenerHitBox();
}
//Chamada de função main
main();