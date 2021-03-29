export class Key extends Phaser.Physics.Arcade.Sprite {
	player = null;

	/**
	 * Creates a Key GameObject.
	 * @param {object} config Config object.
	 * @param {Phaser.Scene} config.scene Scene to add to.
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @memberof Key
	 */
	constructor(config) {
		super(config.scene, config.x, config.y, "objects");
		this.config = config;

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.body.setAllowGravity(false);
		this.setFrame(0).setOrigin(0, 1);

		config.scene.playerCallbacks.push(this.onPlayerCreated);
	}

	onPlayerCreated = (player) => {
		this.player = player;
		this.config.scene.physics.add.overlap(player, this, this.onCollect);
	};

	onCollect = () => {
		this.destroy();
		this.player.keysCollected++;
	};
}

export class Door extends Phaser.Physics.Arcade.Sprite {
	player = null;

	/**
	 * Creates a Door GameObject.
	 * @param {object} config Config object.
	 * @param {Phaser.Scene} config.scene Scene to add to.
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @memberof Door
	 */
	constructor(config) {
		super(config.scene, config.x, config.y, "door");
		this.config = config;

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		this.setFrame(0)
			.setOrigin(0, 1)
			.setPushable(false)
			.body.setAllowGravity(false);

		config.scene.playerCallbacks.push(this.onPlayerCreated);
	}

	onPlayerCreated = (player) => {
		this.player = player;
		this.config.scene.physics.add.collider(player, this, this.onOpen);
	};

	onOpen = () => {
		if (this.player.keysCollected > 0) {
			this.destroy();
			this.player.keysCollected--;
		}
	};
}