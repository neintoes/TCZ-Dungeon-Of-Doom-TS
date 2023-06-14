namespace SpriteKind {
    export const Sword: any = SpriteKind.create();
    //GH 1
    export const Shield: any = SpriteKind.create();
    //end GH 1 
}

class GameManager {
    public level: number = 0;
    private me: PlayerSprite;
    private tileMap: TilemapManager;
    private tileMapLevels: tiles.TileMapData[];
    public gravity: number = 8;


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
        game.onUpdateInterval(2000, function(): void {
            let bat = new EnemySprite(assets.image`bat`);
            bat.positionBat(this.me.sprite);
            bat.handleMovement(this.me.sprite);
        })
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
}