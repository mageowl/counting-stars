import Enemy from "../enemy.js";

const speed = 75;

export default class Bombr extends Enemy {
	static state = {
		FLY: { anim: "bombr-fly", repeat: true },
		DIVE: { anim: "bombr-dive", repeat: true },
		RESPAWN: { anim: "bombr-spawn", repeat: false },
		EXPLODE: { anim: "bombr-explode", repeat: false }
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
		this.play(
			{ key: this.state.anim, repeat: this.state.repeat ? -1 : 0 },
			true
		);

		if (this.state === Bombr.state.FLY) {
			if (this.x > this.startX + 64) this.dir = -1;
			else if (this.x < this.startX - 64) this.dir = 1;
			this.setVelocityX(speed * this.dir).setFlipX(this.dir === -1);

			if (
				this.player.x > this.x - 8 &&
				this.player.x < this.x + 8 &&
				this.player.y > this.y + 8 &&
				this.player.y < this.y + 128
			) {
				this.state = Bombr.state.DIVE;
				this.setVelocity(0, -100).body.setAllowGravity(true);
				this.levelCollider.collideCallback = this.explode;
			}
		}
	}

	explode = () => {
		this.levelCollider.collideCallback = null;
		this.state = Bombr.state.EXPLODE;
		this.invul = true;
		this.once(
			"animationcomplete",
			function () {
				this.x = this.startX;
				this.y = this.startY;
				this.state = Bombr.state.RESPAWN;
				this.once(
					"animationcomplete",
					function () {
						this.state = Bombr.state.FLY;
						this.invul = false;
					},
					this
				).body.setAllowGravity(false);
			},
			this
		);
	};
}
