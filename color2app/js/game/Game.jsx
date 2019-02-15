import {UI, StyleSheet, styleRule, registerStyle} from "ui/UI";
import {Board} from "./Board";



class GameStyle extends StyleSheet {
    @styleRule
    game = {
        display: "flex",
        height: "100%",
        width: "100%",
        ">:first-child": {
            flex: 1,
        }
    }
}


@registerStyle(GameStyle)
export class Game extends UI.Element {
    getDefaultOptions() {
        return {
            rows: 4,
            columns: 4,
        }
    }

    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.game);
    }

    generatePairs() {
        const pairs = [];
        const cells = [];
        for (let i = 0; i < this.options.rows; i += 1) {
            for (let j = 0; j < this.options.columns; j += 1) {
                cells.push([i, j]);
            }
        }
        while (cells.length) {
            const pairIndex = 1 + parseInt(Math.random() * (cells.length - 1));
            pairs.push([cells[0], cells[pairIndex]]);
            cells.splice(pairIndex, 1);
            cells.splice(0, 1);
        }
        return pairs;
    }

    render() {
        const {rows, columns} = this.options;

        return <Board pairs={this.generatePairs()} rows={rows} columns={columns}/>;
    }
}