import Level1 from "./levels/lvl1.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 700 }
		}
	},
	scene: Level1,
	render: {
		pixelArt: true
	}
});
