function clearLife() {
  forEachCell(function(row, col) {
    life[row][col].alive = false;
    life[row][col].kill = true;
    $(life[row][col].elem).removeClass("alive");
  });
}

function blinker() {
  var y = Math.floor(ROWS / 2);
  var x = Math.floor(COLUMNS / 2);

  resurrect(y-1, x);
  resurrect(y, x);
  resurrect(y+1, x);

  forEachCell(function(y, x) {
    addRoundedCorners(y, x);
  });
}

function cross() {
  var y = Math.floor(ROWS / 2);
  var x = Math.floor(COLUMNS / 2);

  resurrect(y-1, x);
  resurrect(y, x);
  resurrect(y+1, x);

  resurrect(y, x-1);
  resurrect(y, x+1);

  forEachCell(function(y, x) {
    addRoundedCorners(y, x);
  });
}

function glider() {
  var y = Math.floor(ROWS / 2);
  var x = Math.floor(COLUMNS / 2);

  resurrect(y, x-1);
  resurrect(y, x);
  resurrect(y, x+1);
  resurrect(y-2, x);
  resurrect(y-1, x+1);

  forEachCell(function(y, x) {
    addRoundedCorners(y, x);
  });
}
