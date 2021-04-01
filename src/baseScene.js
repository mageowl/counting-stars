import createEnemy from "./createEnemy.js";
import { Key, Door } from "./objects/key-door.js";
import Player from "./objects/player.js";
import SpawnPoint from "./objects/spawnPoint.js";

export default class BaseScene extends Phaser.Scene {
	/**
	 * Spawn point.
	 * @type {SpawnPoint}
	 *
	 * @memberof BaseScene
	 */
	spawnPt = null;

	playerCallbacks = [];
	updates = [];

	preload() {
		this.load.setBaseURL("./assets/");

		this.load.aseprite(
			"player",
			"art/player/sheet.png",
			"art/player/sheet.json"
		);
		this.load.aseprite(
			"explosion",
			"art/explosion/sheet.png",
			"art/explosion/sheet.json"
		);
		this.load.aseprite(
			"bombr",
			"art/enemies/bombr/sheet.png",
			"art/enemies/bombr/sheet.json"
		);

		this.load.image("grassTileset", "art/tileset/grass.png");
		this.load.image("door", "art/tileset/door.png");
		this.load.image("playerBullet", "art/bullet.png");

		this.load.spritesheet("objects", "art/tileset/objects.png", {
			frameWidth: 16,
			frameHeight: 16,
			endFrame: 15
		});

		// this.load.tilemapTiledJSON("level", "tilemaps/export/levelX.json");
	}

	create() {
		this.anims.createFromAseprite("player");
		this.anims.createFromAseprite("explosion");
		this.anims.createFromAseprite("bombr");

		this.map = this.add.tilemap("level");
		this.map.addTilesetImage("grass", "grassTileset");

		this.level = this.map
			.createLayer("level", "grass")
			.setCollisionByProperty({ collide: true });

		this.levelObjects = this.add.group();
		this.map
			.getObjectLayer("objects")
			.objects.forEach(async ({ type, x, y, name }) => {
				switch (type) {
					case "spawn":
						this.levelObjects.add(new SpawnPoint({ x, y, scene: this }));
						break;

					case "key":
						this.levelObjects.add(
							new Key({ x, y, scene: this, id: name.slice(3) })
						);
						break;
					case "door":
						this.levelObjects.add(
							new Door({ x, y, scene: this, id: name.slice(4) })
						);
						break;

					case "enemy":
						this.levelObjects.add(
							createEnemy(name.slice(0, -1), { x, y, scene: this })
						);
						break;
				}
			});

		this.player = new Player({
			scene: this,
			x: this.game.config.width / 2,
			y: this.game.config.height / 2
		}).setPosition(this.spawnPt.x, this.spawnPt.y);

		this.physics.add.collider(this.player, this.level);

		this.playerCallbacks.forEach((pc) => pc(this.player));

		this.cameras.main
			.setZoom(2)
			.startFollow(this.player, false, 0.5, 0.5)
			.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
	}

	update() {
		this.updates.forEach((o) => o.update());
	}

	regesterUpdate(object) {
		this.updates.push(object);
	}
}
