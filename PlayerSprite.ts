class PlayerSprite extends BaseSprite {

    private gameManager: GameManager;
    private sword: SwordSprite;
    private jumpCount: number;
    public attacking: boolean;

    constructor(playerImage: Image, gameManager: GameManager) {
        super(playerImage, SpriteKind.Player);
        this.jumpCount = 0;
        this.gameManager = gameManager;
        this.registerSword();
        this.registerControls();
    }

    private registerSword() {
        this.sword = new SwordSprite(assets.image`sword right`, this);
        game.onUpdate(function(): void {
            this.sword.playerTracking();
        });
    }

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

    private handle_x_movement(): void {
        if (controller.left.isPressed()) {
            this.sprite.vx -= 10;
            this.sprite.setImage(assets.image`me left`);
        } else if (controller.right.isPressed()) {
            this.sprite.vx += 10;
            this.sprite.setImage(assets.image`me right`);
        }
        this.sprite.vx *= 0.9;
    }

    private handle_y_movement() {
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

        game.onUpdate(function () {
            this.handle_x_movement();
            this.handle_y_movement();
        });
    }
}
