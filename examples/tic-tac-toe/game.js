let board = [null, null, null, null, null, null, null, null, null];
let current_player = "X";
let game_over = false;
let winner = null;
let screen_width = 800;
let screen_height = 600;
let board_x = 250;
let board_y = 100;
let cell_size = 150;
function get_cell(row, col) {
  return board[((row * 3) + col)];
}
function set_cell(row, col, value) {
  board[((row * 3) + col)] = value;
}
function check_winner() {
  for (let row of range(3)) {
    let c0 = get_cell(row, 0);
    let c1 = get_cell(row, 1);
    let c2 = get_cell(row, 2);
    if ((((c0 != null) && (c0 == c1)) && (c1 == c2))) {
      return c0;
    }
  }
  for (let col of range(3)) {
    let c0 = get_cell(0, col);
    let c1 = get_cell(1, col);
    let c2 = get_cell(2, col);
    if ((((c0 != null) && (c0 == c1)) && (c1 == c2))) {
      return c0;
    }
  }
  let d1 = get_cell(0, 0);
  let d2 = get_cell(1, 1);
  let d3 = get_cell(2, 2);
  if ((((d1 != null) && (d1 == d2)) && (d2 == d3))) {
    return d1;
  }
  d1 = get_cell(0, 2);
  d2 = get_cell(1, 1);
  d3 = get_cell(2, 0);
  if ((((d1 != null) && (d1 == d2)) && (d2 == d3))) {
    return d1;
  }
  return null;
}
function is_board_full() {
  for (let i of range(9)) {
    let row = (i / 3);
    let col = (i % 3);
    if ((get_cell(row, col) == null)) {
      return false;
    }
  }
  return true;
}
function draw_board() {
  clear();
  for (let i of range(4)) {
    let x = (board_x + (i * cell_size));
    draw_line(x, board_y, x, (board_y + (3 * cell_size)));
  }
  for (let i of range(4)) {
    let y = (board_y + (i * cell_size));
    draw_line(board_x, y, (board_x + (3 * cell_size)), y);
  }
}
function draw_x(row, col) {
  let x = (board_x + (col * cell_size));
  let y = (board_y + (row * cell_size));
  let margin = 20;
  draw_line((x + margin), (y + margin), ((x + cell_size) - margin), ((y + cell_size) - margin));
  draw_line(((x + cell_size) - margin), (y + margin), (x + margin), ((y + cell_size) - margin));
}
function draw_o(row, col) {
  let x = ((board_x + (col * cell_size)) + (cell_size / 2));
  let y = ((board_y + (row * cell_size)) + (cell_size / 2));
  let radius = ((cell_size / 2) - 20);
  draw_circle(x, y, radius);
}
function draw_game() {
  draw_board();
  for (let row of range(3)) {
    for (let col of range(3)) {
      let cell = get_cell(row, col);
      if ((cell == "X")) {
        draw_x(row, col);
      }
      if ((cell == "O")) {
        draw_o(row, col);
      }
    }
  }
}
function update() {
  // pass
}
function draw() {
  draw_game();
}
function init() {
  // pass
}
init();
