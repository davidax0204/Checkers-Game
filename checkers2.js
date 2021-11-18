class Checker 
{
    constructor(color, isKing)
    {
        this.color=color,
        this.isKing=isKing
    }
}

const board = new Array(64).fill(null)
let piecesWithOptionToKill = []

let targetIndex=-1
const countRows = 8
const countCols = 8
let isRedTurn = true
let redScore =12
let blackScore=12
let playerPieces
const forbiddenCell = true
let killerList = []

let selectedPiece = 
{
    indexOfBoardPiece: -1,
    isKing: false,
    canIKill:false,
    stepNumber:0,
    didIkilled:false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}


function givePiecesEventListeners()
{
    if (isRedTurn)
    {
        for (let i=0; i<redsPieces.length; i++)
        {
            //if (killerList.length===0)
            {
                redsPieces[i].addEventListener('click', getPlayerPieces)
            }

        }
    }
    else
    {
        for (let i=0; i<blacksPieces.length; i++)
        {
            blacksPieces[i].addEventListener('click',getPlayerPieces)
        }
    }
}
function checkPieces()
{
    if (isRedTurn)
    {
        for (let i=0; i<redsPieces.length; i++)
        {
            redsPieces[i].addEventListener('click', getPlayerPieces)
        }
    }
    else
    {
        for (let i=0; i<blacksPieces.length; i++)
        {
            blacksPieces[i].addEventListener('click',getPlayerPieces)
        }
    }
}

function getPlayerPieces()
{
    if (isRedTurn)
    {
        playerPieces=redsPieces
    }
    else
    {
        playerPieces=blacksPieces
    }
    removeCellOnClick()
    resetBorders()
}

function removeCellOnClick()
{
    for (let i=0; i<cells.length; i++)
    {
        cells[i].removeAttribute('onclick')
    }
}

function resetBorders()
{
    for (let piece=0; piece<playerPieces.length; piece++)
    {
        //playerPieces[piece].style.border = "1px solid white"
        playerPieces[piece].classList.add('border-reset')
        playerPieces[piece].classList.remove('selected-piece-border')
    }
    resetSelectedPieceProperties()
    getSelectedPiece()
}

function resetSelectedPieceProperties() {
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
    selectedPiece.canIKill=false
    //selectedPiece.stepNumber=0
    selectedPiece.didIkilled=false
}

function getSelectedPiece()
{
    //let col = parseInt(event.target.offsetParent.cellIndex)
    //let row = parseInt(event.target.offsetParent.attributes[0].nodeValue)
    let x = event.target;
    let col;
    let row;
    if (x.tagName=="P")
    {
        col = parseInt(event.target.offsetParent.getAttribute("colId"))
        row = parseInt(event.target.offsetParent.getAttribute("rowId"))
    } 
    else if (x.tagName=="TD")
    {
       col = parseInt(event.target.getAttribute("colId"))
       row = parseInt(event.target.getAttribute("rowId"))
    }

    let pieceIndex = indexFinder(row,col)
    if (killerList.length===0)
    {
        selectedPiece.indexOfBoardPiece = pieceIndex
        isPieceKing()
    }
    else
    {
        if (killerList.indexOf(pieceIndex)!==-1)
        {
            selectedPiece.indexOfBoardPiece = pieceIndex
            isPieceKing()
        }

    }
}

function isPieceKing()
{
    //let clickedPiece =  document.getElementById(selectedPiece.id)
    if (board[selectedPiece.indexOfBoardPiece].isKing===true)
    {
        selectedPiece.isKing=true
    }
    else
    {
        selectedPiece.isKing=false
    }
    getAvailableSpaces()
}

function getAvailableSpaces()
{
    if (board[selectedPiece.indexOfBoardPiece + 7]===null)
    {
        selectedPiece.seventhSpace=true
    }
    if (board[selectedPiece.indexOfBoardPiece + 9]===null)
    {
        selectedPiece.ninthSpace=true
    }
    if (board[selectedPiece.indexOfBoardPiece - 7]===null)
    {
        selectedPiece.minusSeventhSpace=true
    }
    if (board[selectedPiece.indexOfBoardPiece - 9]===null)
    {
        selectedPiece.minusNinthSpace=true
    }
    checkAvailableJumpSpaces(true)
}

function checkAvailableJumpSpaces(normalMode) 
{
    selectedPiece.canIKill=false
    if (isRedTurn) 
    {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null && board[selectedPiece.indexOfBoardPiece + 7] !==null 
            && board[selectedPiece.indexOfBoardPiece + 7].color==="black") 
        {
            selectedPiece.fourteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null && board[selectedPiece.indexOfBoardPiece + 9] !==null
            &&  board[selectedPiece.indexOfBoardPiece + 9].color==="black") 
        {
            selectedPiece.eighteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null  && board[selectedPiece.indexOfBoardPiece - 7] !==null
            &&  board[selectedPiece.indexOfBoardPiece - 7].color==="black" && selectedPiece.stepNumber>0) 
        {
            selectedPiece.minusFourteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null && board[selectedPiece.indexOfBoardPiece -9] !==null
            &&  board[selectedPiece.indexOfBoardPiece - 9].color==="black" && selectedPiece.stepNumber>0) 
        {
            selectedPiece.minusEighteenthSpace = true;
            selectedPiece.canIKill=true;
        }
    } 
    else 
    {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null && board[selectedPiece.indexOfBoardPiece + 7] !== null
            && board[selectedPiece.indexOfBoardPiece + 7].color==="red" ) 
        {
            selectedPiece.fourteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null && board[selectedPiece.indexOfBoardPiece + 9] !== null
            && board[selectedPiece.indexOfBoardPiece + 9].color==="red" ) 
        {
            selectedPiece.eighteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null  && board[selectedPiece.indexOfBoardPiece - 7] !== null 
            && board[selectedPiece.indexOfBoardPiece - 7].color==="red")
        {
            selectedPiece.minusFourteenthSpace = true;
            selectedPiece.canIKill=true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null & board[selectedPiece.indexOfBoardPiece - 9] !== null
            && board[selectedPiece.indexOfBoardPiece - 9].color==="red")
        {
            selectedPiece.minusEighteenthSpace = true;
            selectedPiece.canIKill=true;
        }
    }
    checkPieceConditions(normalMode)
}
function checkPieceConditions(normalMode)
{
   if (normalMode)
    {
        if (selectedPiece.isKing)
        {
            givePieceBorder()
        }
        else
        {
            if (isRedTurn)
            {
                selectedPiece.minusSeventhSpace=false
                selectedPiece.minusNinthSpace=false
                if (selectedPiece.stepNumber===0)
                {
                    selectedPiece.minusFourteenthSpace=false
                    selectedPiece.minusEighteenthSpace=false
                    selectedPiece.canIKill=false
                }
            }
            else
            {
                selectedPiece.seventhSpace=false
                selectedPiece.ninthSpace=false
                if (selectedPiece.stepNumber===0)
                {
                    selectedPiece.fourteenthSpace=false
                    selectedPiece.eighteenthSpace=false
                    selectedPiece.canIKill=false
                }
            }
            givePieceBorder()
        }
    }

}

function givePieceBorder()
{
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace ||
        selectedPiece.minusSeventhSpace ||  selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace)
    {
        // cells[selectedPiece.indexOfBoardPiece].firstChild.classList.add('selected-piece-border')
        cells[selectedPiece.indexOfBoardPiece].firstChild.classList.remove('border-reset')
        cells[selectedPiece.indexOfBoardPiece].firstChild.classList.add('selected-piece-border')
        //cells[selectedPiece.indexOfBoardPiece].firstChild.style.border="3px solid blue"
        giveCellsClick()
    }
    else
    {
        return
    }
}

function giveCellsClick()
{
    if (selectedPiece.seventhSpace)
    {
        cells[selectedPiece.indexOfBoardPiece+7].setAttribute("onclick","makeMove(7)")
    }
    if (selectedPiece.ninthSpace)
    {
        cells[selectedPiece.indexOfBoardPiece+9].setAttribute("onclick","makeMove(9)")
    }
    if (selectedPiece.fourteenthSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) 
    {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

function makeMove(number)
{
    //board[selectedPiece.indexOfBoardPiece]=null
    //document.getElementById(selectedPiece.pieceId).remove()
    //cells[selectedPiece.indexOfBoardPiece].innerHTML = ""
    cells[selectedPiece.indexOfBoardPiece].removeEventListener("click", getPlayerPieces)
    let cel= cells[selectedPiece.indexOfBoardPiece];
    while(cel.firstChild){
        cel.removeChild(cel.lastChild);
    } 

    if (isRedTurn)
    {
        if (selectedPiece.isKing)
        {
            let p = document.createElement('p')
            p.classList.add('red-piece')
            p.classList.add('king')
            cells[selectedPiece.indexOfBoardPiece + number].appendChild(p)
            //cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king"></p>`;
            redsPieces = document.getElementsByClassName('red-piece')
        }
        else
        {
            let p = document.createElement('p')
            p.classList.add('red-piece') 
            cells[selectedPiece.indexOfBoardPiece + number].appendChild(p)
            //cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece"></p>`;
            redsPieces = document.getElementsByClassName('red-piece')
        }
    }
    else
    {
        if(selectedPiece.isKing)
        {
            let p = document.createElement('p')
            p.classList.add('black-piece')
            p.classList.add('king')
            cells[selectedPiece.indexOfBoardPiece + number].appendChild(p)
            //cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king"></span>`;
            blacksPieces = document.getElementsByClassName('black-piece')
        }
        else
        {
            let p = document.createElement('p')
            p.classList.add('black-piece')
            cells[selectedPiece.indexOfBoardPiece + number].appendChild(p)
            //cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece"></span>`;
            blacksPieces = document.getElementsByClassName('black-piece')
        }
    }

    let indexOfPiece = selectedPiece.indexOfBoardPiece
    targetIndex=indexOfPiece+number;
    if (number === 14 || number === -14 || number === 18 || number === -18)
    {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } 
    else 
    {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece)
{
    let backData = {}
    backData.isKing = selectedPiece.isKing;
    backData.seventhSpace = selectedPiece.seventhSpace
    backData.ninthSpace = selectedPiece.ninthSpace
    backData.fourteenthSpace = selectedPiece.fourteenthSpace
    backData.eighteenthSpace = selectedPiece.eighteenthSpace
    backData.minusSeventhSpace = selectedPiece.minusSeventhSpace
    backData.minusNinthSpace = selectedPiece.minusNinthSpace
    backData.minusFourteenthSpace = selectedPiece.minusFourteenthSpace
    backData.minusEighteenthSpace = selectedPiece.minusEighteenthSpace
    backData.canIKill=selectedPiece.canIKill
    backData.stepNumber=selectedPiece.stepNumber
    backData.didIkilled=selectedPiece.didIkilled


    board[modifiedIndex]=board[indexOfBoardPiece]
    //board[indexOfBoardPiece]=null
    if (isRedTurn && board[selectedPiece.indexOfBoardPiece].color==="red" && modifiedIndex >=57)
    {
        cells[modifiedIndex].firstChild.classList.add("king")
        board[modifiedIndex].isKing=true
    }
    if (isRedTurn===false && board[selectedPiece.indexOfBoardPiece].color==="black" && modifiedIndex <=7)
    {
        cells[modifiedIndex].firstChild.classList.add("king")
        board[modifiedIndex].isKing=true
    }
    if (removePiece)
    {
        selectedPiece.didIkilled=true
        board[removePiece]=null
        if (isRedTurn && board[selectedPiece.indexOfBoardPiece].color==="red")
        {
            cells[removePiece].innerHTML =""
            blackScore--
        }
        if (isRedTurn===false && board[selectedPiece.indexOfBoardPiece].color==="black")
        {
            cells[removePiece].innerHTML=""
            redScore--
        }
    }
    board[indexOfBoardPiece]=null
    resetSelectedPieceProperties()
    if (removePiece)
    {
        selectedPiece.didIkilled=true
        selectedPiece.stepNumber = backData.stepNumber

    }
    removeCellOnClick()
    removeEventListeners()
}

function removeEventListeners() 
{
    if (isRedTurn) 
    {
        for (let i = 0; i < redsPieces.length; i++) 
        {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } 
    else 
    {
        for (let i = 0; i < blacksPieces.length; i++) 
        {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

function checkForWin() 
{
    if (blackScore === 0) 
    {
        redTurnText.classList.remove('not-active-player-text')
        blackTurnText.innerText= ""
        redTurnText.innerText = "RED WINS!";
    }   

    else if (redScore === 0) 
    {
        blackTurnText.classList.remove('not-active-player-text')
        redTurnText.innerText= ""
        blackTurnText.innerText = "BLACK WINS!";
    }
    selectedPiece.stepNumber++
    func1(targetIndex)
    if ((selectedPiece.canIKill===false) || (selectedPiece.stepNumber===1 && selectedPiece.canIKill && selectedPiece.didIkilled==false))
    {
        changePlayer();
    }
    else
    {
        let backData = {}
        backData.isKing = selectedPiece.isKing;
        backData.seventhSpace = selectedPiece.seventhSpace
        backData.ninthSpace = selectedPiece.ninthSpace
        backData.fourteenthSpace = selectedPiece.fourteenthSpace
        backData.eighteenthSpace = selectedPiece.eighteenthSpace
        backData.minusSeventhSpace = selectedPiece.minusSeventhSpace
        backData.minusNinthSpace = selectedPiece.minusNinthSpace
        backData.minusFourteenthSpace = selectedPiece.minusFourteenthSpace
        backData.minusEighteenthSpace = selectedPiece.minusEighteenthSpace
        backData.canIKill=selectedPiece.canIKill
        backData.stepNumber=selectedPiece.stepNumber
        backData.didIkilled=selectedPiece.didIkilled
        backData.indexOfBoardPiece=selectedPiece.indexOfBoardPiece
        killerList=[]
        func2()
        selectedPiece.isKing = backData.isKing;
        selectedPiece.seventhSpace = backData.seventhSpace
        selectedPiece.ninthSpace = backData.ninthSpace
        selectedPiece.fourteenthSpace = backData.fourteenthSpace
        selectedPiece.eighteenthSpace = backData.eighteenthSpace
        selectedPiece.minusSeventhSpace = backData.minusSeventhSpace
        selectedPiece.minusNinthSpace = backData.minusNinthSpace
        selectedPiece.minusFourteenthSpace = backData.minusFourteenthSpace
        selectedPiece.minusEighteenthSpace = backData.minusEighteenthSpace
        selectedPiece.canIKill=backData.canIKill
        selectedPiece.stepNumber=backData.stepNumber
        selectedPiece.didIkilled=backData.didIkilled
        selectedPiece.indexOfBoardPiece=backData.indexOfBoardPiece

        cells[selectedPiece.indexOfBoardPiece].addEventListener('click',getPlayerPieces)   
    }
    
}
function func1(targetIndex)
{   
    selectedPiece.indexOfBoardPiece=targetIndex

    checkAvailableJumpSpaces(false)

}
function func2()
{
    if (isRedTurn)
    {
        for (let index=0; index<board.length; index++)
        {
            if ((board[index] instanceof Checker) &&  board[index].color=="red")
            {
                resetSelectedPieceProperties()
                func1(index)
                if (selectedPiece.canIKill && (!(selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace)))
                {
                    killerList.push(index)
                }
            }
        }
    }
    else
    {
        for (let index=0; index<board.length; index++)
        {
            if ((board[index] instanceof Checker) && board[index].color=="black")
            {
                resetSelectedPieceProperties()
                func1(index)
                if (selectedPiece.canIKill && (!(selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace)))
                {
                    killerList.push(index)
                }
            }
        }
    }
    resetSelectedPieceProperties()
}

function changePlayer() 
{
    if (isRedTurn) 
    {
        isRedTurn = false;
        blackTurnText.classList.remove('not-active-player-text')
        redTurnText.classList.add('not-active-player-text')
    } 
    else 
    {
        isRedTurn = true;
        redTurnText.classList.remove('not-active-player-text')
        blackTurnText.classList.add('not-active-player-text')

    }
    selectedPiece.stepNumber=0
    killerList=[]
    func2()

    givePiecesEventListeners();
}


// function piecesThatCanKillFinder ()
// {
//     if (isRedTurn)
//     {
//         for (let i=0; i<board.length; i++)
//         {
//             if (board[i].color==="red")
//             {
//                 board[i].
//             }
//         }
//     }
// }


function indexFinder(row,col)
{
    return row*countRows+col
}

function checkerColorFidnerByRow (row)
{
    if (row<4) {return "red"}
    else {return "black"}
}

function visualInitializationHTNL()
{
    let table = document.createElement('table')
    for (let iRow=0; iRow<countRows; iRow++)
    {
        let row = document.createElement('tr')
        for (let iCol=0; iCol<countCols; iCol++)
        {
            let col = document.createElement('td')
            col.setAttribute('rowId',iRow)
            col.setAttribute('colId',iCol)
            row.appendChild(col)

            let checker =board[indexFinder(iRow,iCol)]
            if (checker!==null && checker!==forbiddenCell)
            {
                let piece = document.createElement('p')
                let colorClass = checker.color==="red"?'red-piece':'black-piece'
                piece.classList.add(colorClass)
                piece.setAttribute("pieceColor",checker.color==="red"?'red':'black')
                col.appendChild(piece)
            }
            else
            {
                if (iRow===3)
                {
                    let checkerIndex = indexFinder(3,iCol)
                    if (checkerIndex%2===0)
                    {
                        continue
                    }
                }
                if (iRow===4)
                {
                    let checkerIndex2 = indexFinder(4,iCol)
                    if (checkerIndex2%2!==0)
                    {
                        continue
                    }
                }
                col.classList.add('emptyCell')
            }
        }
        table.appendChild(row)
    }
    document.body.appendChild(table)

    let redText = document.createElement('div')
    redText.classList.add('red-turn-text')
    redText.id="redTurnText"
    redText.innerText="Red Turn"
    document.body.appendChild(redText)

    let blackText = document.createElement('div')
    blackText.classList.add('black-turn-text')
    blackText.classList.add('not-active-player-text')
    blackText.id="blackTrunText"
    blackText.innerText="Black Turn"
    document.body.appendChild(blackText)
}

function boardInitialization()
{ 
    for (let iRow=0; iRow<countRows; iRow++)
    {
        for (let iCol=0; iCol<countCols; iCol++)
        {
            let checkerColor = checkerColorFidnerByRow(iRow)
            let checker = new Checker(checkerColor,false);
            let checkerIndex = indexFinder(iRow,iCol)
            if (iRow===0 || iRow===2 || iRow===6)
            {
                if (iCol%2===1)
                {
                    board[checkerIndex]=checker
                }
            }
            if (iRow===1 || iRow===5 || iRow===7)
            {
                if (iCol%2===0)
                {
                    board[checkerIndex]=checker
                }
            }
        }
    }
    for (let iRow=0; iRow<countRows; iRow++)
    {
        if (iRow%2===0)
        {
            for (let iCol=0; iCol<countCols; iCol+=2)
            {
                let forbiddenCellIndex = indexFinder(iRow,iCol)
                board[forbiddenCellIndex]=forbiddenCell
            }
        }
        else
        {
            for (let iCol=1; iCol<countCols; iCol+=2)
            {
                let forbiddenCellIndex2 = indexFinder(iRow,iCol)
                board[forbiddenCellIndex2]=forbiddenCell
            }
        }
    }
}

boardInitialization()
visualInitializationHTNL()

let cells = document.querySelectorAll('td')
let redsPieces = document.querySelectorAll("[pieceColor='red']")
let blacksPieces = document.querySelectorAll("[pieceColor='black']")
let redTurnText = document.getElementById('redTurnText')
let blackTurnText = document.getElementById('blackTrunText')

givePiecesEventListeners()