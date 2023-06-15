// GH3
class DashEffect extends BaseSprite {

    private playerSprite: PlayerSprite;

    constructor(image: Image, playerSprite: PlayerSprite) {
        super(image, SpriteKind.Effect);
        this.playerSprite = playerSprite;
        this.sprite.setFlag(SpriteFlag.Invisible, true);
    }

    public dashAnim(): void {
        this.sprite.setFlag(SpriteFlag.Invisible, false);
        while(Math.abs(this.playerSprite.sprite.vx) > 100) {
            this.sprite.setPosition(this.playerSprite.sprite.x, this.playerSprite.sprite.y);
            if(this.playerSprite.sprite.vx > 0) {
                this.sprite.setImage(assets.image`dash right`)
            } else {
                this.sprite.setImage(assets.image`dash left`)
            }
            pause(10)
        }
        this.sprite.setFlag(SpriteFlag.Invisible, true);
    }
}
// end GH3
