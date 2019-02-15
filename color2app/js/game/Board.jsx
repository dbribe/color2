import {UI, StyleSheet, styleRule, registerStyle} from "ui/UI";
import {Tile} from "./Tile";



export class BoardStyle extends StyleSheet {
    @styleRule
    board = {
        display: "flex",
        flexDirection: "column",
    }
}


const COLORS = [
    "#3F51B5",
    "#2196F3",
    "#4CAF50",
    "#9C27B0",
    "#673AB7",
    "#F44336",
    "#CDDC39",
    "#795548",
];


@registerStyle(BoardStyle)
export class Board extends UI.Element {
    getDefaultOptions() {
        return {
            rows: 4,
            columns: 4,
        }
    }

    constructor(...args) {
        super(...args);
        this.colorIndex = 0;
    }

    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.board);
    }

    m(row, column) {
        return this["matrix" + column + "on" + row];
    }

    render() {
        let matrixChildren = [];
        this.tiles = [];

        for (let row = 0; row < this.options.rows; row += 1) {
            let rowChildren = [];
            for (let column = 0; column < this.options.columns; column += 1) {
                const tile = this["matrix" + column + "on" + row] = <Tile board={this} hiddenTile={true}/>;
                rowChildren.push(tile);
                this.tiles.push(tile);
            }
            matrixChildren.push(<div style={{display: "flex", flex: "1", width: "100%", flexDirection: "row"}}>{rowChildren}</div>);
        }

        let colorsIndex = 0;

        for (const pair of this.options.pairs) {
            this.m(...pair[0]).options.color = COLORS[colorsIndex];
            this.m(...pair[1]).options.color = COLORS[colorsIndex];
            this.m(...pair[0]).options.pair = this.m(...pair[1]);
            this.m(...pair[1]).options.pair = this.m(...pair[0]);
            colorsIndex++;
        }

        return matrixChildren;
    }

    flipTiles() {
        const visibleTiles = this.tiles.filter(tile => !tile.options.hiddenTile);
        const tilesColors = visibleTiles.map(tile => ({color: tile.options.color, key: Math.random()}));
        tilesColors.sort((a, b) => a.key - b.key);
        while (tilesColors.length) {
            const pairIndex = tilesColors.findIndex((tileColor, index) => index && tilesColors[0].color === tileColor.color);
            visibleTiles[0].options.pair = visibleTiles[pairIndex];
            visibleTiles[pairIndex].options.pair = visibleTiles[0];
            visibleTiles[0].flip(tilesColors[0].color);
            visibleTiles[pairIndex].flip(tilesColors[0].color);
            visibleTiles.splice(pairIndex, 1);
            visibleTiles.splice(0, 1);
            tilesColors.splice(pairIndex, 1);
            tilesColors.splice(0, 1);
        }
    }

    onMount() {
        this.addListener("tileClicked", tile => {
            console.warn(tile);
            if (tile.options.color === COLORS[this.colorIndex] && tile.options.pair === this.lastTile) {
                tile.hide();
                this.lastTile.hide();
            }
            this.lastTile = tile;
        });

        setInterval(() => this.flipTiles(), 5000);
    }
}