export default class Charecter extends Phaser.Physics.Arcade.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.sprite);

		this.hp = config.hp;
		this.invul = false;
	}

	damage = (dm, _this, obj2) => {
		if (obj2) obj2.explode();
		if (!this.invul) {
			console.log(this.hp, dm);
			this.hp -= dm;
			if (this.hp <= 0) {
				this.destroy();
			}
		}
		return this;
	};
}
