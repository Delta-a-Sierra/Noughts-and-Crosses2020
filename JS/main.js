
const player = (sign, newName) => {
    const symbol = sign;
    let name = newName;
    let score = 0;
    let isTurn = false
    
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
    }

    const _togglePlayerColor = () => {
        const playerPane = document.querySelector(`#${name}`)
        if(isTurn){
            playerPane.classList.add('active')
        }
        else{
            playerPane.classList.remove('active')
        }

    }

    const _changeScore = () => {
        const scoreTxt = document.querySelector(`#${name}`).firstElementChild
        scoreTxt.innerHTML = score
    }

    return{ getSymbol, getScore, increaseScore, resetScore, isPlayerTurn, changeTurn, getName, changeName}
}

const gameBoard = (() => {
    let _boardState = ["", "", "", "", "", "", "", "", ""];

    const changeState = (box, symbol) => {
        _boardState[box] = symbol;
    }

    const getBoardState = () => {
        return _boardState;
    }

    const resetBoardState = () => {
        _boardState = _boardState.map(board => board = "");
        boxes.forEach(box => {
            box.classList.remove('nought');
            box.classList.remove('cross');
        })
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

    return {changeState, getBoardState, resetBoardState, findWinner}
})();

const player1 = player('o', "player1");
player1.changeTurn();
const player2 = player('x', "player2");

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
        const winner = gameBoard.findWinner();

        if(player1.getSymbol() === winner){
            setTimeout(function() {
                //alert(`The winner is ${player1.getName()}`)
                player1.increaseScore()
                gameBoard.resetBoardState();
            }, 0)
            
        }
        else if (player2.getSymbol() === winner){
            setTimeout(function() {
                //alert(`The winner is ${player2.getName()}`)
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
    });
});