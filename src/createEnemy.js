import Bombr from "./objects/enemies/bombr.js";

/**
 * Create an enemy from type string
 *
 * @static
 * @param {string} type Type of enemy
 * @param {EnemyConfig} config
 * @return {Enemy}
 * @memberof Enemy
 */
export default function createEnemy(type, config) {
	return new { bombr: Bombr }[type](config);
}
