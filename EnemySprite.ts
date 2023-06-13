class EnemySprite extends BaseSprite {
    
    constructor(enemyImage: Image) {
        super(enemyImage, SpriteKind.Enemy);
        this.createSprite();
        this.sprite.data = this;
    }

    public positionBat(playerSprite: Sprite): void {
        tiles.placeOnRandomTile(this.sprite, assets.tile`wall`)
        if (spriteutils.distanceBetween(this.sprite, playerSprite) < 180){
            this.positionBat(playerSprite)
        }
    }

    public handleMovement(playerSprite: Sprite) {
        tilesAdvanced.followUsingPathfinding(this.sprite, playerSprite, 50)
        animation.runImageAnimation(this.sprite, assets.animation`bat right`, 100, true)
    }
}