namespace SpriteKind {
    export const Sword: any = SpriteKind.create();
    //GH 1
    export const Shield: any = SpriteKind.create();
    //end GH 1 
    // GH3
    export const Effect: any = SpriteKind.create();
    // end GH3
}

class GameManager {
    public level: number = 0;
    public playerSprite: PlayerSprite;
    private tileMap: TilemapManager;
    private tileMapLevels: tiles.TileMapData[];
    private overlapManager: OverlapManager;
    public gravity: number = 8;
    // GH2
    private torchFrame: number = 0;
    private tilesToAnimate: tiles.Location[];
    // end GH2

    constructor(tilemapsToLoad: tiles.TileMapData[]) {
        this.tileMapLevels = tilemapsToLoad;
        this.setupPlayer();
        this.setupScene();
        this.onUpdates();
        this.onUpdateIntervals();
        this.overlapManager = new OverlapManager(this);
    }

    private setupPlayer(): void {
        info.setLife(3)
        this.playerSprite = new PlayerSprite(assets.image`me right`, this);
        scene.cameraFollowSprite(this.playerSprite.sprite);
    }

    private setupScene(): void {
        this.tileMap = new TilemapManager(this.tileMapLevels[this.level], this.playerSprite);
        this.tileMap.buildLevel();
        // GH2
        this.tilesToAnimate = tiles.getTilesByType(assets.tile`torch`);
        // end GH2
    }

    private onUpdates(): void {
        game.onUpdate(function(): void {
            // player movement updates
            this.playerSprite.handleXMovement();
            this.playerSprite.handleYMovement();
            //sword tracking update
            this.playerSprite.sword.playerTracking();
        });
    }

    private onUpdateIntervals(): void {
        // bat spawning
        game.onUpdateInterval(2000, function(): void {
            let bat = new EnemySprite(assets.image`bat`);
            bat.positionBat(this.playerSprite.sprite);
            bat.handleMovement(this.playerSprite.sprite);
        })

        // GH2
        //torch flicker
        game.onUpdateInterval(200, function(): void {
            this.torchFlicker();
        })
        // end GH2
    }

    // GH2
    private torchFlicker(): void {
        let anim = assets.animation`torch flicker`;
        this.tilesToAnimate.forEach(function (tile: tiles.Location) {
            tiles.setTileAt(tile, anim.get(this.torchFrame));
        });
        this.torchFrame += 1;
        if (this.torchFrame == anim.length - 1) {
            this.torchFrame = 0;
        }
    }
    // end GH2
}