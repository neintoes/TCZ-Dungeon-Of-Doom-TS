// GH2
class TilemapTorches {

    private frame: number = 0;
    private tilesToAnimate: tiles.Location[] = [];

    constructor() {
        this.tilesToAnimate = tiles.getTilesByType(assets.tile(`torch`));
        console.log(this.tilesToAnimate.length)
    }

    public flicker(): void {
        let anim = assets.animation`torch flicker`;
        this.tilesToAnimate.forEach(function (tile: tiles.Location) {
            tiles.setTileAt(tile, anim.get(this.frame));
        });
        this.frame += 1;
        if (this.frame == anim.length - 1) {
            this.frame = 0;
        }
    }
}
// end GH2