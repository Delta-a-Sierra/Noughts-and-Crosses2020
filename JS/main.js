
const player = sign => {
    const symbol = sign;
    let score = 0;
    let isTurn = false
    
    getSymbol = () => {
        return symbol
    }

    getScore = () => {
        return score
    }

    increaseScore = () => {
        score+= 1
    }

    resetScore = () => {
        score = 0
    }

    isPlayerTurn = () => {
        return isTurn
    }

    changeTurn = () => {
        if(isTurn === true){
            isTurn = false
        }
        else{
            isTurn = true
        }
    }

    return{ getSymbol, getScore, increaseScore, resetScore, isPlayerTurn, changeTurn}
}

const gameBoard = (() => {
    let _boardState = ["", "", "", "", "", "", "", "", ""];

    changeState = (box, symbol) => {
        _boardState[box] = symbol;
        _findWinner();
    }

    getBoardState = () => {
        return _boardState;
    }

    resetBoardState = () => {
        _boardState = _boardState.map(board => board = "");
        boxes.forEach(box => {
            box.classList.remove('nought');
            box.classList.remove('cross');
        })
    }

    _findWinner = () => {
        if(_boardState[0] === _boardState[1] && _boardState[1] === _boardState[2] && _boardState[0] != ""){
            alert("Winner");
            resetBoardState();
        }
        else if(_boardState[3] === _boardState[4] && _boardState[4] === _boardState[5] && _boardState[3] != ""){
            alert("Winner");
            resetBoardState();
        }
        else if(_boardState[6] === _boardState[7] && _boardState[7] === _boardState[8] && _boardState[6] != ""){
            alert("Winner");
            resetBoardState();
        }
        else if(_boardState[0] === _boardState[4] && _boardState[4] === _boardState[8] && _boardState[0] != ""){
            alert("Winner");
            resetBoardState();
        }
        else if(_boardState[2] === _boardState[4] && _boardState[4] === _boardState[6] && _boardState[2] != ""){
            alert("Winner");
            resetBoardState();
        }
    }
    return {changeState, getBoardState, resetBoardState}

})();

const player1 = player('x');
player1.changeTurn();
const player2 = player('o');

const boxes = document.querySelectorAll('.box');
boxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        const boxIndex = Number(box.getAttribute('id'));
        if(player1.isPlayerTurn()){
            box.classList.add('nought');
            gameBoard.changeState(boxIndex, 'o');
        }
        else{
            box.classList.add('cross');
            gameBoard.changeState(boxIndex, 'x');
        }
        player1.changeTurn();
        player2.changeTurn();
        
    });
});