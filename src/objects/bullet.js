import Explosion from "./explosion.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, "playerBullet");
		this.config = config;

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.body.setAllowGravity(false);
		this.setVelocityX(config.speed * config.direction);

		config.scene.physics.add.collider(this, config.scene.level, this.explode);
	}

	explode = () => {
		new Explosion({
			scene: this.config.scene,
			x: this.x,
			y: this.y,
			flip: this.config.direction == -1
		});
		this.destroy();
	};
}
