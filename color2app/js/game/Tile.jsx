import {UI, StyleSheet, registerStyle, styleRule} from "ui/UI";



const generateHex = () => {
    return "0123456789ABCDEF"[parseInt(Math.random() * 16)];
};

const generateColor = () => {
    return [..."000000"].map(generateHex).join``;
};

class TileStyle extends StyleSheet {
    @styleRule
    tile = {
        flex: 1,
        margin: "4px",
        opacity: 1,
        transform: "scale(1)",
        transitionProperty: "opacity scale",
        transition: ".3s ease-out",

        perspective: "1000px",
        ">:first-child": {
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.8s ease",
            transformStyle: "preserve-3d",
        },
        ">*>*": {
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
        },
        ">*>:nth-child(2)": {
            transform: "rotateY(180deg)",
        }
    };

    @styleRule
    hidden = {
        opacity: 0,
        transform: "scale(.8)",
        ">:first-child": {
            transition: "none",
        },
    };

    @styleRule
    flip = {
        ">:first-child": {
            transform: "rotateY(180deg)",
        }
    }
}


@registerStyle(TileStyle)
export class Tile extends UI.Element {
    extraNodeAttributes(attr) {
        super.extraNodeAttributes(attr);
        attr.addClass(this.styleSheet.tile);
        if (this.options.hiddenTile) {
            attr.addClass(this.styleSheet.hidden);
        }
    }

    hide() {
        this.updateOptions({hiddenTile: true});
    }

    flip(color) {
        this.updateOptions({color, oldColor: this.options.color, flip: true});
    }

    render() {
        if (!this.options.oldColor) {
            this.options.oldColor = this.options.color;
        }
        if (this.options.flip) {
            this.options.flip = false;
            this.options.flipAmount = (~~this.options.flipAmount) + 180;
            this.options.swap = !this.options.swap;
        }
        const styleFace = !this.options.swap ? {background: this.options.color} : {background: this.options.oldColor};
        const styleBack = this.options.swap ? {background: this.options.color} : {background: this.options.oldColor};
        return [
            <div style={{transform: `rotateY(${~~this.options.flipAmount}deg)`}}>
                <div style={styleFace}/>
                <div style={styleBack}/>
            </div>
        ]
    }

    onMount() {
        this.addClickListener(() => this.options.board.dispatch("tileClicked", this));
    }
}