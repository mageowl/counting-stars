import BaseScene from "../baseScene.js";
import Player from "./player.js";

/**
 * @typedef EnemyConfig
 *
 * @property {BaseScene} scene Scene to attach to.
 * @property {number} x X position
 * @property {number} y Y position
 */

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
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
		super(config.scene, config.x, config.y, config.sprite);
		this.config = config;

		this.hp = config.hp;
		this.invul = false;

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
	};

	update() {}

	damage = (dm, _this, obj2) => {
		if (obj2) obj2.explode();
		if (!this.invul) {
			this.hp -= dm;
			if (this.hp <= 0) {
				this.destroy();
			}
		}
	};
}
