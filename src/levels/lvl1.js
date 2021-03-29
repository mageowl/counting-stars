import BaseScene from "../baseScene.js";

export default class Level1 extends BaseScene {
	preload() {
		super.preload();
		this.load.tilemapTiledJSON("level", "tilemaps/export/level1.json");
	}
}
