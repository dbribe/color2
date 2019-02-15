import {UI, Link, registerStyle, StyleSheet, styleRule} from "ui/UI";
import {Game} from "./game/Game";



class IndexPageStyle extends StyleSheet {
    @styleRule
    container = {
        height: "500px",
        width: "500px",
        display: "flex"
    };
}


@registerStyle(IndexPageStyle)
export class IndexPage extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(this.styleSheet.container);
    }

    render() {
        return [
            <Game />
        ];
    }
}