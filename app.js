var life = [];
var ROWS;// = 50;
var COLUMNS;// = 50;
var interval;
var CELLWIDTH = 15;

$(function() {
  COLUMNS = Math.floor($(window).width() / CELLWIDTH) - 5;
  ROWS = Math.floor(($(window).height() - $(".container").offset().top) / CELLWIDTH) - 1;

  initLife();
  blinker();
  startLife();
});

function resurrect(row, col) {
  life[row][col].alive = true;
  life[row][col].kill = false;
  $(life[row][col].elem).addClass("alive");
}

function initLife() {
  var container = $(".container");
  container.css({
    width: COLUMNS * CELLWIDTH + "px"
  });
  console.log(ROWS, COLUMNS);

  var cellHtml = '<div class="cell"></div>';

  forEachCell(function(row, col) {
    if(life[row] == undefined)
      life[row] = [];

    var cell = {
      elem: $(cellHtml),
      alive: false,
      kill: true
    };

    container.append(cell.elem);
    cell.elem.on("click", { row: row, col: col }, cellClick);
    life[row][col] = cell;
  });
}

function nextGeneration() {
  forEachCell(function(row, col) {
    var cell = life[row][col];
    var aliveNeighbours = countAliveNeighbours(row, col);

    if(cell.alive && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
      cell.kill = true;
    } else if(cell.alive) {
      cell.kill = false;
    } else if(!cell.alive && (aliveNeighbours == 3)) {
      cell.kill = false;
    } else {
      cell.kill = true;
    }
  });

  liveGeneration();
}

function countAliveNeighbours(y, x) {
  var row = life[y];
  var count = 0;

  if(isAlive(y-1, x-1)) ++count; // UL
  if(isAlive(y-1, x))   ++count; // UU
  if(isAlive(y  , x-1)) ++count; // LL
  if(isAlive(y+1, x-1)) ++count; // DL
  if(isAlive(y+1, x))   ++count; // DD
  if(isAlive(y+1, x+1)) ++count; // DR
  if(isAlive(y  , x+1)) ++count; // RR
  if(isAlive(y-1, x+1)) ++count; // UR

  return count;
}

function isAlive(y, x) {
  return y != -1 && x!= -1 && y != ROWS && x != COLUMNS && life[y][x].alive;
}

function isDead(y, x) {
  return y != -1 && x!= -1 && y != ROWS && x != COLUMNS && !life[y][x].alive;
}

function liveGeneration() {
  forEachCell(function(row, col) {
    var cell = life[row][col];

    if(cell.kill && cell.alive) {
      cell.elem.removeClass("alive");
      cell.alive = false;
    }
    else if(!cell.kill && !cell.alive) {
      cell.elem.addClass("alive");
      cell.alive = true;
    }

    cell.kill = false;
  });

  forEachCell(function(y, x) {
    addRoundedCorners(y, x);
  });
}

function addRoundedCorners(y, x) {
  var elem = $(life[y][x].elem);

  elem.toggleClass("round-top-left", (isDead(y-1, x-1) && isDead(y-1, x) && isDead(y , x-1)));
  elem.toggleClass("round-top-right", (isDead(y-1, x) && isDead(y-1, x+1) && isDead(y , x+1)));
  elem.toggleClass("round-bottom-right", (isDead(y, x+1) && isDead(y+1, x+1) && isDead(y+1 , x)));
  elem.toggleClass("round-bottom-left", (isDead(y+1, x) && isDead(y+1, x-1) && isDead(y , x-1)));
}

function cellClick(event) {
  resurrect(event.data.row, event.data.col);

  addRoundedCorners(event.data.row, event.data.col);
}

function startLife() {
  clearInterval(interval);
  nextGeneration();
  interval = setInterval(nextGeneration, $(".interval").val());
}

function forEachCell(block) {
  for(var row = 0; row < ROWS; ++row ) {
    for(var col = 0; col < COLUMNS; ++col ) {
      block(row, col);
    }
  }
}
