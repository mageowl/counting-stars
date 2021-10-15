export default class SpawnPoint extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y);
		config.scene.spawnPt = this;

		config.scene.add.existing(this);
	}
}
