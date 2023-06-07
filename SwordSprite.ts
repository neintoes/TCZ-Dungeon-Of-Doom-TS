class SwordSprite extends BaseSprite {

    private playerSprite: PlayerSprite;

    constructor(weaponImage: Image, playerSprite: PlayerSprite) {
        super(weaponImage, SpriteKind.Sword);
        this.playerSprite= playerSprite;
        this.sprite.setFlag(SpriteFlag.GhostThroughWalls, true);
        this.sprite.scale = 1.5;
    }

    public playerTracking(): void {
        if(this.playerSprite.sprite.image.equals(assets.image`me left`)) {
            this.sprite.setPosition(this.playerSprite.sprite.x - 10, this.playerSprite.sprite.y - 6)
            if (!this.playerSprite.attacking) {
                this.sprite.setImage(assets.image`sword left`);
            }
        } else {
            this.sprite.setPosition(this.playerSprite.sprite.x + 10, this.playerSprite.sprite.y - 6)
            if(!this.playerSprite.attacking){
                this.sprite.setImage(assets.image`sword right`);
            }
        }
    }

    public swing(): void {
        if(this.playerSprite.sprite.image.equals(assets.image`me left`)) {
            animation.runImageAnimation(this.sprite, assets.animation`swing left`, 50, false);
        } else {
            animation.runImageAnimation(this.sprite, assets.animation`swing right`, 50, false);
        }
    }

}
