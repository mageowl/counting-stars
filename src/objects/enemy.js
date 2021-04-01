import BaseScene from "../baseScene.js";
import Charecter from "./charecter.js";
import Player from "./player.js";

/**
 * @typedef EnemyConfig
 *
 * @property {BaseScene} scene Scene to attach to.
 * @property {number} x X position
 * @property {number} y Y position
 */

export default class Enemy extends Charecter {
	/**
	 * Player object.
	 * @type {Player}
	 *
	 * @memberof Enemy
	 */
	player = null;

	/**
	 * Level collider object
	 * @type {Phaser.Physics.Arcade.Collider}
	 *
	 * @memberof Enemy
	 */
	levelCollider = null;

	/**
	 * Creates an Enemy.
	 * @param {EnemyConfig} config
	 * @memberof Enemy
	 */
	constructor(config) {
		super(config);
		this.config = config;

		this.playerDamage = this.config.damage;
		this.canDamage = 10;

		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);

		config.scene.regesterUpdate(this);
		config.scene.playerCallbacks.push(this.onPlayerCreated);

		this.levelCollider = config.scene.physics.add.collider(
			this,
			config.scene.level
		);
	}

	onPlayerCreated = (player) => {
		this.player = player;

		this.bulletCollider = this.config.scene.physics.add.overlap(
			this,
			player.bullets,
			this.damage.bind(null, 10)
		);

		this.playerCollider = this.config.scene.physics.add.overlap(
			this,
			player,
			this.playerCollisionCB
		);
	};

	playerCollisionCB = () => {
		if (this.canDamage === 0)
			this.player.setVelocityY(-300).damage(this.playerDamage);
		this.canDamage = 10;
	};

	update() {
		if (this.canDamage > 0) this.canDamage--;
	}
}
