import Enemy from "../enemy.js";

const speed = 75;

export default class Bombr extends Enemy {
	static state = {
		FLY: "bombr-fly",
		DIVE: "bombr-dive",
		RESPAWN: "bombr-spawn"
	};

	constructor(config) {
		super({ ...config, sprite: "bombr", hp: 10 });

		this.play({ key: "bombr-fly", repeat: -1 }).body.setAllowGravity(false);

		this.startX = config.x;
		this.startY = config.y;
		this.dir = 1;

		this.state = Bombr.state.FLY;
	}

	update() {
		if (this.state === Bombr.state.FLY && this.body) {
			if (this.x > this.startX + 64) this.dir = -1;
			else if (this.x < this.startX - 64) this.dir = 1;
			this.setVelocityX(speed * this.dir);

			if (
				this.player.x > this.x - 16 &&
				this.player.x < this.x + 16 &&
				this.player.y > this.y + 8 &&
				this.player.y < this.y + 128
			) {
				this.play({ key: "bombr-dive", repeat: -1 }, true);
				this.state = Bombr.state.DIVE;
				this.setVelocity(0, -100).body.setAllowGravity(true);
				this.levelCollider.collideCallback = this.explode;
			}
		}
	}

	explode = () => {
		this.levelCollider.collideCallback = null;
		this.play("bombr-explode", true).once(
			"animationcomplete",
			function () {
				this.x = this.startX;
				this.y = this.startY;
				this.state = Bombr.state.RESPAWN;
				this.play("bombr-spawn")
					.once(
						"animationcomplete",
						function () {
							this.state = Bombr.state.FLY;
						},
						this
					)
					.body.setAllowGravity(false);
			},
			this
		);
	};
}
