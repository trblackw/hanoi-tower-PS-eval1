const discSet1 = document.querySelector("#disc-1");
const discSet2 = document.querySelector("#disc-2");
const discSet3 = document.querySelector("#disc-3");
const submitButton = document.querySelector("button");
const startPegInput = document.querySelector("input[name=start]");
const endPegInput = document.querySelector("input[name=end]");

var Board = function() {
  var set = [[5, 4, 3, 2, 1], [], []];
  var moves = {
    count: 0
  };

  var incrementMoves = function() {
    moves.count = moves.count + 1;
  };

  var checkAvailableMoves = function(peg) {
    var selectedPeg = set[peg - 1];
    var topDisc = Number(selectedPeg) || Number(selectedPeg[selectedPeg - 1]);
    var availableMoves = [];
    if (selectedPeg.length === 0) {
      availableMoves = set.filter(arr => arr.length > 0);
    } else {
      availableMoves = set.filter(arr => {
        if (Number(arr) > topDisc || Number(arr[arr.length - 1]) > topDisc) {
          return arr;
        }
      });
    }
    return availableMoves;
  };

  var printBoard = function() {
    //prints board horizontally
    var horizontal = function() {
      return set.map(row => row);
    };
    //prints board vertically
    var vertical = function() {
      return set[0].map((x, row) => set.map(y => x[row]));
    };

    return {
      horizontal,
      vertical
    };
  };

  var moveDisc = function(startPeg, endPeg) {
    //check to make sure peg is in valid range
    if (startPeg > 3 || (endPeg > 3 && (startPeg > 0 && endPeg > 0))) {
      return "invalid move!";
    }
    var pegToMove = set[startPeg - 1];
    var pegToReceive = set[endPeg - 1];

    //  var complete =
    //    set.filter(peg => peg !== pegToReceive).filter(arr => arr.length === 0)
    //      .length === 2;

    //check to make sure disc to stack on top is smaller than the disc below it
    if (
      pegToReceive[pegToReceive.length - 1] < pegToMove[pegToMove.length - 1]
    ) {
      alert(
        "invalid move, the disc you're trying to stack on top is larger than the one below it"
      );
    } else if (complete) {
      alert(`Congrats! You won in ${moves.count} moves`);
    } else {
      var discToMove = pegToMove.pop();
      pegToReceive.push(discToMove);
      incrementMoves();
      var complete =
        set.filter(peg => peg !== pegToReceive).filter(arr => arr.length === 0)
          .length === 2;
      return complete
        ? alert(`Congrats! You won in ${moves.count} moves`)
        : null;
      console.log(moves);
    }
  };

  return {
    print: printBoard,
    move: moveDisc,
    check: checkAvailableMoves,
    stats: {
      set,
      moves
    }
  };
};

var board = Board();

// submitButton.addEventListener("click", () => {
//   board.move(startPegInput.value, endPegInput.value);
//   const discs = [...document.querySelectorAll(".discs")];
//   // console.log(discs[endPegInput.value - 1]);
//   discs[endPegInput.value - 1].innerHTML = board.stats.set[
//     endPegInput.value - 1
//   ]
//     .map(disc => `<span>${disc}</span>`)
//     .join("");

//   (startPegInput.value = ""), (endPegInput.value = "");
// });

var [firstPeg, secondPeg, thirdPeg] = board.stats.set;

//winning run
board.move(1, 2);
board.move(1, 3);
board.move(2, 3);
board.move(1, 2);
board.move(3, 1);
board.move(3, 2);
board.move(1, 2);
board.move(1, 3);
board.move(2, 3);
board.move(2, 1);
board.move(3, 1);
board.move(2, 3);
board.move(1, 2);
board.move(1, 3);
board.move(2, 3);
board.move(1, 2);
board.move(3, 1);
board.move(3, 2);
board.move(1, 2);
board.move(3, 1);
board.move(2, 3);
board.move(2, 1);
board.move(3, 1);
board.move(3, 2);
board.move(1, 2);
board.move(1, 3);
board.move(2, 3);
board.move(1, 2);
board.move(3, 1);
board.move(3, 2);
board.move(1, 2);

//make copies to not mutate state
var firstPegCopy = firstPeg.slice(0);
var secondPegCopy = secondPeg.slice(0);
var thirdPegCopy = thirdPeg.slice(0);

discSet1.innerHTML = firstPegCopy
  .reverse()
  .map(disc => {
    return `<span>${disc}</span>`;
  })
  .join("");
discSet2.innerHTML = secondPegCopy
  .reverse()
  .map(disc => {
    return `<span>${disc}</span>`;
  })
  .join("");
discSet3.innerHTML = thirdPegCopy
  .reverse()
  .map(disc => {
    return `<span>${disc}</span>`;
  })
  .join("");
