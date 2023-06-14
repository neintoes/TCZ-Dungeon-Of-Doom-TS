class PlayerSprite extends BaseSprite {

    private gameManager: GameManager;
    private jumpCount: number;
    public sword: SwordSprite;
    // GH1
    public shield: ShieldSprite;
    // end GH1
    public attacking: boolean;

    constructor(playerImage: Image, gameManager: GameManager) {
        super(playerImage, SpriteKind.Player);
        this.jumpCount = 0;
        this.gameManager = gameManager;
        this.registerSword();
        this.registerControls();
        // GH1
        this.registerShield();
        // end GH1
    }

    private registerSword(): void {
        this.sword = new SwordSprite(assets.image`sword right`, this);
    }

    // GH1
    private registerShield(): void {
        this.shield = new ShieldSprite(assets.image`shield right`, this)
    }
    // end GH1

    private jump(): void {
        if(this.jumpCount < 2){
            this.sprite.vy = -175;
            this.jumpCount += 1;
        }
    }

    private attack(): void {
        timer.background(function(): void {
            this.triggerAttacking();
        });
        this.sword.swing();
    }

    private throttleAttack(): void {
        timer.throttle("attack", 750, function(): void {
            this.attack();
        });
    }

    private triggerAttacking(): void {
        this.attacking = true;
        pause(250);
        this.attacking = false;
    }

    // GH1
    private triggerDefending(): void {
        this.sword.sprite.setFlag(SpriteFlag.Invisible, true);
        this.shield.sprite.setFlag(SpriteFlag.Invisible, false);
        this.shield.sprite.setFlag(SpriteFlag.GhostThroughSprites, false);
        pause(500)
        this.sword.sprite.setFlag(SpriteFlag.Invisible, false);
        this.shield.sprite.setFlag(SpriteFlag.Invisible, true);
        this.shield.sprite.setFlag(SpriteFlag.GhostThroughSprites, true);
    }

    private defend(): void {
        timer.background(function(): void {
            this.triggerDefending();
        });
        this.shield.sprite.setPosition(this.sprite.x, this.sprite.y);
        if(this.sprite.image.equals(assets.image`me left`)) {
            this.shield.sprite.setImage(assets.image`shield left`);
        } else {
            this.shield.sprite.setImage(assets.image`shield right`);
        }
    }
    // end GH1

    public handleXMovement(): void {
        if (controller.left.isPressed()) {
            this.sprite.vx -= 10;
            this.sprite.setImage(assets.image`me left`);
        } else if (controller.right.isPressed()) {
            this.sprite.vx += 10;
            this.sprite.setImage(assets.image`me right`);
        }
        this.sprite.vx *= 0.9;
    }

    public handleYMovement() {
        this.sprite.vy += this.gameManager.gravity;
        if (this.sprite.isHittingTile(CollisionDirection.Bottom)) {
            this.sprite.vy = 0
            this.jumpCount = 0
        }
    }

    private registerControls(): void {
        controller.up.onEvent(ControllerButtonEvent.Pressed, function (): void {
            this.jump();
        })

        controller.A.onEvent(ControllerButtonEvent.Pressed, function(): void {
            this.throttleAttack();
        })

        // GH1
        controller.B.onEvent(ControllerButtonEvent.Pressed, function(): void {
            this.defend();
        })
        // end GH1
    }
}
