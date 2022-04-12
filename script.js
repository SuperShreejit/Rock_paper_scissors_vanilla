const selectionBtns = document.querySelectorAll("[data-selection]");
const computerScore = document.querySelector("[data-computer-score]");
const computerScoresHistory = document.querySelector("[data-computer-scores]");
const userScore = document.querySelector("[data-user-score]");
const userScoreHistory = document.querySelector("[data-user-scores]");
const SELECTIONS = [
  {
    name: "rock",
    emoji: '✊',
    beats: "scissors"
  },
  {
    name: "paper",
    emoji: '✋',
    beats: "rock"
  },
  {
    name:"scissors",
    emoji: '✌',
    beats: "paper"
  }
];

selectionBtns.forEach(selectionBtn => {
  selectionBtn.addEventListener("click", e => {
    const selectionName = selectionBtn.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
   makeSelection(selection);
  });
});

function makeSelection(selection){
  const computerSelection = randomSelection();
  const isUserWinner = iswinner(selection,computerSelection);
  const isComputerWinner = iswinner(computerSelection,selection);

  displayResult(computerSelection,isComputerWinner,isUserWinner,computerScoresHistory);
  displayResult(selection,isUserWinner,isComputerWinner,userScoreHistory);
  if(isUserWinner) incrementScore(userScore);
  if(isComputerWinner) incrementScore(computerScore);
}

function randomSelection() {
  const random = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[random];
}

function iswinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function displayResult(selection, winner, opponentWinner, history){
  const div = document.createElement('div');
  div.innerText = selection.emoji;
  div.classList.add('emoji');
  if(!winner && opponentWinner){
    div.classList.add('loser');
  }
  else if(winner){
    div.classList.add("winner");
  }
   history.appendChild(div);
}

function incrementScore(scoreSpan){
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

  