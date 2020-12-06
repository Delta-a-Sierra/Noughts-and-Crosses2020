
// Player object Factory
const player = (sign, newName) => {
    const symbol = sign;
    let name = newName;
    const player = newName
    let score = 0;
    let isTurn = false
    const PlayerTXT = document.querySelector(`#${player}`)
    
    const getSymbol = () => {
        return symbol
    }

    const getScore = () => {
        return score
    }

    const increaseScore = () => {
        score+= 1
        _changeScore()
    }

    const resetScore = () => {
        score = 0
        _changeScore()
    }

    const isPlayerTurn = () => {
        return isTurn
    }

    const changeTurn = () => {
        if(isTurn === true){
            isTurn = false
        }
        else{
            isTurn = true
        }

        _togglePlayerColor()
    }

    const getName = () => {
        return name;
    }

    const changeName = (newName) => {
        name = newName;
        let temp = PlayerTXT.innerHTML.split(':')
        temp[0] = name
        temp = temp.join(': ')
        PlayerTXT.innerHTML = temp
    }

    const _togglePlayerColor = () => {
        const playerPane = document.querySelector(`#${player}`)
        if(isTurn){
            playerPane.classList.add('active')
        }
        else{
            playerPane.classList.remove('active')
        }

    }

    const _changeScore = () => {
        
        PlayerTXT.firstElementChild.innerHTML = score
    }

    return{ getSymbol, getScore, increaseScore, resetScore, isPlayerTurn, changeTurn, getName, changeName, player}
}

// GameBoard Module
const gameBoard = (() => {
    let _boardState = ["", "", "", "", "", "", "", "", ""];
    let validTurn = false;

    const changeState = (index, symbol, box) => {
        validTurn = false
        if(_boardState[index] === ""){
            box.classList.add(`${symbol}`);
            _boardState[index] = symbol;
            validTurn = true
        }
    }

    const getBoardState = () => {
        return _boardState;
    }

    const resetBoardState = () => {
        _boardState = _boardState.map(board => board = "");
        boxes.forEach(box => {
            box.classList.remove('o');
            box.classList.remove('x');
        })
    }

    const isValidTurn = () => {
        return validTurn;
    }

    const findWinner = () => {
        if(_boardState[0] === _boardState[1] && _boardState[1] === _boardState[2] && _boardState[0] != ""){      
            return _boardState[0]
        }
        else if(_boardState[3] === _boardState[4] && _boardState[4] === _boardState[5] && _boardState[3] != ""){
            return _boardState[3]
        }
        else if(_boardState[6] === _boardState[7] && _boardState[7] === _boardState[8] && _boardState[6] != ""){
            return _boardState[6]
        }
        else if(_boardState[0] === _boardState[4] && _boardState[4] === _boardState[8] && _boardState[0] != ""){
            return _boardState[0]
        }
        else if(_boardState[2] === _boardState[4] && _boardState[4] === _boardState[6] && _boardState[2] != ""){
            return _boardState[2]
        }
        else if(_boardState[0] === _boardState[3] && _boardState[3] === _boardState[6] && _boardState[0] != ""){
            return _boardState[0]
        }
        else if(_boardState[1] === _boardState[4] && _boardState[4] === _boardState[7] && _boardState[1] != ""){
            return _boardState[1]
        }
        else if(_boardState[2] === _boardState[5] && _boardState[5] === _boardState[8] && _boardState[2] != ""){
            return _boardState[2]
        }
    }

    return {changeState, getBoardState, resetBoardState, findWinner, isValidTurn}
})();

const popUps = (() => {
    const chngNamePopUp = document.querySelector('#chngname-popup');
    const blur = document.querySelector('.blur')

    const showNameChangePopUp = () => {
        blur.classList.remove('hidden')
        chngNamePopUp.classList.remove('hidden')
    }

    const hideNameChangePopUp = () => {
        blur.classList.add('hidden')
        chngNamePopUp.classList.add('hidden')
    }

    return {showNameChangePopUp, hideNameChangePopUp}
})();


const player1 = player('o', "player1");
player1.changeTurn();
const player2 = player('x', "player2");

const boxes = document.querySelectorAll('.box');
boxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        const boxIndex = Number(box.getAttribute('id'));
        if(player1.isPlayerTurn()){       
            gameBoard.changeState(boxIndex, 'o', box);
        }
        else{
            gameBoard.changeState(boxIndex, 'x', box);
        }

        if(gameBoard.isValidTurn()){
            const winner = gameBoard.findWinner();

            if(player1.getSymbol() === winner){
                setTimeout(function() {
                    player1.increaseScore()
                    gameBoard.resetBoardState();
                }, 0)
            }
            else if (player2.getSymbol() === winner){
                setTimeout(function() {
                    player2.increaseScore()
                    gameBoard.resetBoardState();
                }, 0)
            }
            
            const boardIsFull = gameBoard.getBoardState().every(box => box != "")
            if(boardIsFull){
                gameBoard.resetBoardState();
            }
            player1.changeTurn();
            player2.changeTurn();
        }
    });
});


const changeNameBtn = document.querySelector('#chngname-btn')
changeNameBtn.addEventListener('click', () => {
    popUps.showNameChangePopUp();
});

const confirmChangeNameBtn = document.querySelector('#chngname-confirm-btn')
const form = document.querySelector('form')  
confirmChangeNameBtn.addEventListener('click', (e) => {
    
    e.preventDefault()
    const p1name =  form.p1name.value
    const p2name = form.p2name.value
    popUps.hideNameChangePopUp()
    form.reset()
    if(p1name != ""){
        player1.changeName(p1name)
    }
    if(p2name != ""){
        player2.changeName(p2name)
    }
});



const newGameBtn = document.querySelector('#newgame-btn')
newGameBtn.addEventListener('click', () => {
    gameBoard.resetBoardState();
    player2.resetScore();
    player1.resetScore();
    player1.changeName(player1.player)
    player2.changeName(player2.player)
});