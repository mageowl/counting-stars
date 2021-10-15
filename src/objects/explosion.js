export default class Explosion extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, "explosion");

		config.scene.add.existing(this);

		this.play("explode")
			.on("animationcomplete", this.destroy)
			.setFlipX(config.flip);
	}
}
