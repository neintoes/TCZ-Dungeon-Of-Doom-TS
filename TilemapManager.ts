class TilemapManager {
    public tileMap: tiles.TileMapData;
    public player: PlayerSprite;

    constructor(tileMap: tiles.TileMapData, player: PlayerSprite) {
        this.tileMap = tileMap;
        this.player = player;
    }

    private placePlayer(): void {
        tiles.placeOnRandomTile(this.player.sprite, assets.tile`player spawn`);
        tiles.setTileAt(this.player.sprite.tilemapLocation(), assets.tile`wall`);
    }

    public buildLevel(): void {
        tiles.setCurrentTilemap(this.tileMap)
        this.placePlayer();
    }
}