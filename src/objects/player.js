import Bullet from "./bullet.js";
import Charecter from "./charecter.js";

const speed = 150;
const jumpHeight = 350;

export default class Player extends Charecter {
	keysCollected = [];

	/**
	 * Creates a Player GameObject.
	 * @param {object} config Config object.
	 * @param {Phaser.Scene} config.scene Scene to add to.
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @memberof Player
	 */
	constructor(config) {
		super({ ...config, sprite: "player", hp: 100 });
		this.config = config;

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);
		config.scene.regesterUpdate(this);

		this.keys = config.scene.input.keyboard.createCursorKeys();
		this.bullets = config.scene.add.group();

		this.reloadTime = 0;
		this.invul = false;

		this.setDepth(1).setOrigin(0.5, 1);
	}

	update() {
		this.setVelocityX(
			(-this.keys.left.isDown + this.keys.right.isDown) * speed
		);

		if (this.keys.left.isDown || this.keys.right.isDown) {
			this.setFlipX(this.keys.left.isDown);
			this.anims.play({ key: "player-run", repeat: -1 }, true);
		} else this.anims.play({ key: "player-idle", repeat: -1 }, true);

		if (this.keys.up.isDown && this.body.onFloor()) {
			this.setVelocityY(-jumpHeight);
		} else if (!this.body.onFloor()) {
			this.play("player-jump", true).setFrame(this.body.velocity.y > 0 ? 7 : 6);
		}

		if (this.keys.space.isDown) {
			if (this.reloadTime > 0) this.reloadTime--;
			else {
				this.bullets.add(
					new PlayerBullet(
						{
							scene: this.config.scene,
							x: this.x + (3 * this.flipX ? -1 : 1),
							y: this.y - 7
						},
						this.flipX ? -1 : 1
					)
				);
				this.reloadTime = 10;
			}
		} else this.reloadTime = 0;
	}
}

class PlayerBullet extends Bullet {
	constructor(config, direction) {
		super({ ...config, speed: 800, direction });
	}
}
