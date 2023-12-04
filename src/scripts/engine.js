const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector ("#lives"),
    },
    
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesLeft: 3,
    },

    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function countDown () {
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.values.timerId)
        alert(`O tempo acabou! O seu resultado foi ${state.values.result}! Clique em OK para tentar novamente.`)
        window.location.reload(true);
    }
}

function playSound (audioName) {
    let audio = new Audio (`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play ();
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function moveEnemy () {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox () {
    state.view.squares.forEach((square) => { 
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound ("hit");
            } else {
                if (state.values.livesLeft <= 0) {
                    clearInterval(state.actions.countDownTimerId)
                    clearInterval(state.values.timerId)
                    alert(`Game Over! Você perdeu todas as vidas. Tente de Novo!`)
                    window.location.reload(true);
                } else 
                    {state.values.livesLeft --;
                    state.view.lives.textContent = state.values.livesLeft;
                }
            }
        })
    })
}

function init () {

    moveEnemy();
    addListenerHitBox ();

}

init ();