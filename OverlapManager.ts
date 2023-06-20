class OverlapManager {

    constructor(gameManager: GameManager) {
        this.registerOverlaps();
    }

    private registerOverlaps(): void {

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (playerSprite: Sprite, bat: Sprite): void {
            // GH1 
            if (playerSprite.overlapsWith(playerSprite.data.shield.sprite)) {
                return;
            }
            // end GH1
            info.changeLifeBy(-1)
            pause(2000)
        })

        sprites.onOverlap(SpriteKind.Sword, SpriteKind.Enemy, function (sword: Sprite, bat: Sprite): void {
            // if (this.playerSprite.attacking) {
            if (sword.data.playerSprite.attacking) {
                info.changeScoreBy(100)
                bat.destroy()
            }
        })

        // GH1
        sprites.onOverlap(SpriteKind.Shield, SpriteKind.Enemy, function (shield: Sprite, enemy: Sprite): void {
            tilesAdvanced.followUsingPathfinding(enemy, shield.data.playerSprite.sprite, 0);
            let x_vel: number;
            if (shield.image.equals(assets.image`shield left`)) {
                x_vel = -100;
            } else {
                x_vel = 100;
            }
            for (let i = 0; i < 10; i++) {
                enemy.vx = x_vel;
                pause(10);
            }
            pause(500);
            tilesAdvanced.followUsingPathfinding(enemy, shield.data.playerSprite.sprite, 50);
        });
        // end GH1
    }
}