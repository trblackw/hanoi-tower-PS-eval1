const discSet1 = document.querySelector("#disc-1");
const discSet2 = document.querySelector("#disc-2");
const discSet3 = document.querySelector("#disc-3");
const submitButton = document.querySelector("button");
const startPegInput = document.querySelector("input[name=start]");
const endPegInput = document.querySelector("input[name=end]");

const Board = () => {
  const set = [[5, 4, 3, 2, 1], [], []];
  const moves = {
    count: 0
  };

  const incrementMoves = () => {
    moves.count = moves.count + 1;
  };

  const checkAvailableMoves = peg => {
    const selectedPeg = set[peg - 1];
    const topDisc = Number(selectedPeg) || Number(selectedPeg[selectedPeg - 1]);
    const availableMoves = [];
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

  const printBoard = () => {
    //prints board horizontally
    const horizontal = () => {
      return set.map(row => row);
    };
    //prints board vertically
    const vertical = () => {
      return set[0].map((x, row) => set.map(y => x[row]));
    };

    return {
      horizontal,
      vertical
    };
  };

  const moveDisc = (startPeg, endPeg) => {
    //check to make sure peg is in valid range
    if (startPeg > 3 || (endPeg > 3 && (startPeg > 0 && endPeg > 0))) {
      return "invalid move!";
    }
    const pegToMove = set[startPeg - 1];
    const pegToReceive = set[endPeg - 1];

    //check to make sure disc to stack on top is smaller than the disc below it
    if (
      pegToReceive[pegToReceive.length - 1] < pegToMove[pegToMove.length - 1]
    ) {
      alert(
        "invalid move, the disc you're trying to stack on top is larger than the one below it"
      );
    } else {
      const discToMove = pegToMove.pop();
      pegToReceive.push(discToMove);
      incrementMoves();
      // const reduceComplete = pegToReceive.reduce((arr, disc) => {
      //   let i = 0;
      //   if (disc === 5) {
      //     arr.push(disc);
      //     i++;
      //   }
      //   return arr;
      // }, []);
      // console.log(reduceComplete);
      // console.log(pegToReceive);
      const complete =
        set.filter(peg => peg !== pegToReceive).filter(arr => arr.length === 0)
          .length === 2;
      return complete
        ? alert(`Congrats! You won in ${moves.count} moves`)
        : null;
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

const board = Board();

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

const [firstPeg, secondPeg, thirdPeg] = board.stats.set;

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
// board.move(1, 2);

//make copies to not mutate state
const firstPegCopy = firstPeg.slice(0);
const secondPegCopy = secondPeg.slice(0);
const thirdPegCopy = thirdPeg.slice(0);

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
