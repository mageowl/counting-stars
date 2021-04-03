import Player from "./player.js";

export class Key extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Player object
	 * @type {Player}
	 *
	 * @memberof Door
	 */
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

		this.setFrame(0).setOrigin(0, 1).body.setAllowGravity(false);

		config.scene.playerCallbacks.push(this.onPlayerCreated);
	}

	onPlayerCreated = (player) => {
		this.player = player;
		this.config.scene.physics.add.overlap(player, this, this.onCollect);
	};

	onCollect = () => {
		this.destroy();
		this.player.keysCollected.push(this.config.id);
	};
}

export class Door extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Player object
	 * @type {Player}
	 *
	 * @memberof Door
	 */
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

		this.setOrigin(0, 1).setPushable(false).body.setAllowGravity(false);

		config.scene.playerCallbacks.push(this.onPlayerCreated);
	}

	onPlayerCreated = (player) => {
		this.player = player;
		this.config.scene.physics.add.collider(player, this, this.onOpen);
		this.config.scene.physics.add.collider(
			player.bullets,
			this,
			this.explodeBullet
		);
	};

	onOpen = () => {
		if (this.player.keysCollected.includes(this.config.id)) {
			this.destroy();
			this.player.keysCollected.splice(
				this.player.keysCollected.indexOf(this.config.id),
				1
			);
		}
	};

	explodeBullet = (bullet) => {
		bullet.explode();
	};
}
