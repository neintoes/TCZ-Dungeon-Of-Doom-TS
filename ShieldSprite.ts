// GH1
class ShieldSprite extends BaseSprite {
    public playerSprite: PlayerSprite;

    constructor(shieldImage: Image, playerSprite: PlayerSprite) {
        super(shieldImage, SpriteKind.Shield);
        this.playerSprite = playerSprite;
        this.sprite.setFlag(SpriteFlag.Invisible, true);
        this.sprite.setFlag(SpriteFlag.GhostThroughSprites, true);
    }
}
// end GH1
