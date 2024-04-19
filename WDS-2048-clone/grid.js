const grid_size = 4;
const cell_size = 20;
const cell_gap = 2;

export default class Grid {
    #cells

    constructor (gridElement) {
        gridElement.style.setProperty("--grid-size", grid_size)
        gridElement.style.setProperty("--cell-size", `${cell_size}vmin`)
        gridElement.style.setProperty("--cell-gap", `${cell_gap}vmin`)
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % grid_size,
                Math.floor(index / grid_size)
            )
        })
    }

    get cells() {
        return this.#cells
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
          cellGrid[cell.y] = cellGrid[cell.y] || []
          cellGrid[cell.y][cell.x] = cell
          return cellGrid
        }, [])
      }
    
      get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
          cellGrid[cell.x] = cellGrid[cell.x] || []
          cellGrid[cell.x][cell.y] = cell
          return cellGrid
        }, [])
      }

    get #emptycells() {
        return this.#cells.filter(cell => cell.tile == null)
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptycells.length)
        return this.#emptycells[randomIndex]
    }
}

class Cell {
    #cellElement
    #x
    #y
    #tile
    #mergeTile

    constructor (cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get tile() {
        return this.#tile
    }

    set tile(value) {
        this.#tile = value
        if (value == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    get mergeTile() {
        return this.#mergeTile
    }

    set mergeTile(value) {
        this.#mergeTile = value
        if (value == null) return
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }

    canAccept(tile) {
        return (
            this.tile == null ||
            (this.mergeTile == null && this.tile.value === tile.value))
    }

    mergeTiles() {
        if(this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove()
        this.mergeTile = null
    }
}

function createCellElements(gridElement) {
    const cells = [];
    for (let i = 0; i < grid_size * grid_size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push("cell");
        gridElement.append(cell);
    }
    return cells;
}