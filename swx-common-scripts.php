<?php
/**
 * @package Randgroup\Plugins\R_Common_Scripts
 * @version 1.6
 */
namespace Randgroup\Plugins\R_Common_Scripts;

/*
Plugin Name:  Randgroup Common Scripts
Plugin URI: https://www.randgroup.com/custom-wordpress-development/plugins
Description: Add box equal heights, on hover box, create quiz
Author: Chris Bautista
Version: 0.1
Author URI: http://codespud.ca
 */

defined('ABSPATH') or die('No script kiddies please!');

if (!class_exists('Randgroup\Plugins\R_Common_Scripts')) {

	class R_Common_Scripts {

		function __construct($param = null) {

			$this->admin_hooks();
			$this->frontend_hooks();

		} // construct

		/**
		 * Administration Functions
		 *
		 */
		function admin_hooks() {

		} // admin hooks

		/**
		 * Clientside functions /Public Facing
		 * @return  void
		 *
		 **/
		function frontend_hooks() {

			add_action('wp_enqueue_scripts', array($this, 'frontend_init_scripts'));
			add_action('wp_enqueue_scripts', array($this, 'frontend_init_styles'));

		} // frontend hooks

		/**
		 * On activation tasks
		 * @param none
		 * @return none
		 *
		 */
		function on_activate() {

			add_action('admin_notices', array('R_Common_Scripts', 'activate_notice_success'));

		} // on_activate

		function activate_notice_success() {
			?>
		    <div class="notice notice-success is-dismissible">
		        <p><?php echo _e('Activation Done!', 'swx-common-scripts'); ?></p>
		    </div>
		    <?php
}
		/**
		 * On deactivation tasks
		 * @param none
		 * @return none
		 *
		 */
		function on_deactivate() {

		} // on_deactivate

		function frontend_init_scripts($where = 'frontend') {
			wp_register_script('quiz-js', plugins_url('/assets/js/quiz.js', __FILE__), array('jquery', 'jquery-ui-core', 'jquery-form'), null, true);

			// For either a plugin or a theme, you can then enqueue the script:
			wp_enqueue_script('jquery-form');
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('quiz-js');
		}

		function frontend_init_styles() {
			wp_enqueue_style('bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
			wp_enqueue_style('quiz-css', plugins_url('/assets/css/quiz.css', __FILE__));
		}

	}

	/**
	 * Initialize Plugin
	 */

	$rcs = new R_Common_Scripts();
	register_activation_hook(__FILE__, array('R_Common_Scripts', 'on_activate'));

}
