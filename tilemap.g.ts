// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level":
            case "level2":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2], TileScale.Sixteen);
            case "level1":
            case "level1":return tiles.createTilemap(hex`1400140003030304030303030203030303030303030303030303030303030303020303030303030303030303030303030202020202020203030203030303030303030302030303030303030303030303020202020304030303030403030303040303030303030303030303030303030303030303030303030303040302020202020202020303030303030303030303030303030303030303030303030302020202020202030403030303030303030303030303030303030303030303030303030403030303030403030303030303030303030303030303030303030303030303030303030302020202020202020202030303030303030303030303030303030303030303030403030304030303030303030304030303030303030303030303030303030303030303030303030303030302020202020202030303030303020202020202020303030303030303030303030303030303030303030104030303030403030303030303040303030303030303030303030303030303030303030303030202020202020202020202020202020202020202`, img`
........2...........
........2...........
....2222222..2......
...2............2222
....................
....................
22222222............
.............2222222
....................
....................
....................
.....2222222222.....
....................
....................
....................
2222222......2222222
....................
....................
....................
22222222222222222222
`, [myTiles.transparency16,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "player spawn":
            case "tile4":return tile4;
            case "floor":
            case "tile5":return tile5;
            case "wall":
            case "tile6":return tile6;
            case "torch":
            case "tile7":return tile7;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
