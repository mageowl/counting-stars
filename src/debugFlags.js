/**
 * @typedef DebugFlags
 * @property {boolean} physics Use arcade physics debug.
 * @property {boolean} exposeGameObj Expose the Phaser Game.
 * @property {boolean} logDamage Log the damage in the console.
 */

/** @type {DebugFlags} */
const debugFlags = {
	physics: false,
	exposeGameObj: false,
	logDamage: false
};

export default debugFlags;
