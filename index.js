var pgnFile = ``
var eventStr = ''
var questionHeader = document.createElement('h1')
questionHeader.innerText = 'Insert the details to start the recording of the game'
var eventV = document.createElement('input')
eventV.placeholder = 'Whats the event?'
var btn = document.createElement('button')
var date = new Date()
btn.innerText = 'Confirm'
var testOBJ = `
    <p></p>
`
document.body.append(questionHeader, eventV,btn)
btn.addEventListener('click', e => {
    eventStr = eventV.value
})

var dateString = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getUTCDate()}`

var whiteInput = document.createElement('input')
whiteInput.placeholder = 'Who is white?'
var blackInput = document.createElement('input')
blackInput.placeholder = 'Who is black?'
var btn2 = document.createElement('button')
btn2.innerText = 'Confirm'
document.body.append(whiteInput, blackInput, btn2)
var whiteString = ''
var blackString = ''


btn2.addEventListener('click', f => {
    whiteString = whiteInput.value
    blackString = blackInput.value
    makeFinalRecordButton()
})
var btn3 = document.createElement('button')


function makeFinalRecordButton() {
    btn3.innerText = 'Start recording!'
    btn3.style = 'display: block'
    document.body.append(btn3)
}

var moves = []

var move = document.createElement('input')
var btn4 = document.createElement('button')
move.placeholder = 'Your Move here'
btn4.innerText = 'Click to record'
var btn5 = document.createElement('button')
btn5.innerText = 'End Recording'


btn3.addEventListener('click', g => {
    document.body.innerHTML = ''
    document.body.append(move,btn4, btn5)    
})

btn4.addEventListener('click', h => {
    moves.push(move.value)
    move.value = ''
})

var winString = ''

var opt1 = document.createElement('button')
var opt2 = document.createElement('button')
var movesStr = '1. '


btn5.addEventListener('click', i => {
    document.body.innerHTML = ''
    var bh1 = document.createElement('h1')
    bh1.innerText = 'How did the game end'
    var bbtn1 = document.createElement('button')
    var bbtn2 = document.createElement('button')    
    bbtn1.innerText = 'Victory'
    bbtn2.innerText = 'Draw'
    var moveNum = 1
    var iterationNum = 1
    var isNum = true
    for (var i = 0; i < moves.length; i++) {
        if (iterationNum < 3) {
            movesStr+= moves[i] + ' '
            iterationNum++
        } else {
            i--
            moveNum++
            iterationNum = 1
            movesStr += `${moveNum}. `
        }
    }
    document.body.append(bh1,bbtn1,bbtn2)
    bbtn1.addEventListener('click', e => {
        document.body.innerHTML = ''
        var ch1 = document.createElement('h1')
        var cbtn1 = document.createElement('button')
        var cbtn2 = document.createElement('button')
        cbtn1.innerText = 'White'
        cbtn2.innerText = 'Black'
        ch1.innerText = 'Who won?'
        document.body.append(ch1,cbtn1,cbtn2)
        cbtn1.addEventListener('click', f => {
            winString = '1-0'
            makePgnFile()
        })
        cbtn2.addEventListener('click', f => {
            winString = '0-1'
            makePgnFile()
        })
    })
    bbtn2.addEventListener('click', e => {
        winString = '1/2-1/2'
        makePgnFile()
    })
    
})



function makePgnFile() {
    document.body.innerHTML = ''
    pgnFile = `
    [Event "${eventStr}"]
    [Site "Sagle, Idaho"]
    [Date "${dateString}"]
    [Round "1"]
    [White "${whiteString}"]
    [Black "${blackString}"]
    [Result "${winString}"]

    ${movesStr}
`

    var blob = new Blob(
        [`${pgnFile}`],
        {type: "text/plain"}
    )

    var url = window.URL.createObjectURL(blob)
    var anchor = document.createElement('a')
    anchor.href = url
    anchor.innerText = 'Download Game'
    anchor.download = 'game.pgn'
    document.body.append(anchor)
}