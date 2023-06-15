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
    private me: PlayerSprite;
    private tileMap: TilemapManager;
    private tileMapLevels: tiles.TileMapData[];
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
        this.onOverlaps();
    }

    private setupPlayer(): void {
        info.setLife(3)
        this.me = new PlayerSprite(assets.image`me right`, this);
        scene.cameraFollowSprite(this.me.sprite);
    }

    private setupScene(): void {
        this.tileMap = new TilemapManager(this.tileMapLevels[this.level], this.me);
        this.tileMap.buildLevel();
        // GH2
        this.tilesToAnimate = tiles.getTilesByType(assets.tile`torch`);
        // end GH2
    }

    private onUpdates(): void {
        game.onUpdate(function(): void {
            // player movement updates
            this.me.handleXMovement();
            this.me.handleYMovement();
            //sword tracking update
            this.me.sword.playerTracking();
        });
    }

    private onUpdateIntervals(): void {
        // bat spawning
        game.onUpdateInterval(2000, function(): void {
            let bat = new EnemySprite(assets.image`bat`);
            bat.positionBat(this.me.sprite);
            bat.handleMovement(this.me.sprite);
        })

        // GH2
        //torch flicker
        game.onUpdateInterval(200, function(): void {
            this.torchFlicker();
        })
        // end GH2
    }

    private onOverlaps(): void {
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(me: Sprite, bat: Sprite): void {
            // GH1 
            if(me.overlapsWith(this.me.shield.sprite)) {
                return;
            }
            // end GH1
            info.changeLifeBy(-1)
            pause(2000)
        })

        sprites.onOverlap(SpriteKind.Sword, SpriteKind.Enemy, function(sword: Sprite, bat: Sprite): void {
            if(this.me.attacking){
                info.changeScoreBy(100)
                bat.destroy()
            }
        })

        // GH1
        sprites.onOverlap(SpriteKind.Shield, SpriteKind.Enemy, function(shield: Sprite, enemy: Sprite): void {
            tilesAdvanced.followUsingPathfinding(enemy, this.me.sprite, 0);
            let x_vel : number;
            if(shield.image.equals(assets.image`shield left`)) {
                x_vel = -100;
            } else {
                x_vel = 100;
            }
            for(let i = 0; i < 10; i++) {
                enemy.vx = x_vel;
                pause(10);
            }
            pause(500);
            tilesAdvanced.followUsingPathfinding(enemy, this.me.sprite, 50);
        });
        // end GH1
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