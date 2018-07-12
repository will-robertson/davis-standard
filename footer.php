<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Davis_Standard
 * @since 1.0
 * @version 1.2
 */

?>

		</div><!-- #content -->

		<footer id="colophon" class="site-footer" role="contentinfo">
			<div class="wrap footer-widgets">
				<?php get_template_part( 'template-parts/footer/footer', 'widgets' );?>
			</div>
			<div class="footer-menus">
				<div class="wrap">
					<?php if ( has_nav_menu( 'social' ) ) : ?>
						<div class="site-info">
							<p>&copy; Davis Standard <?php echo date("Y"); ?>. All rights reserved</p>
						</div><!-- .site-info -->
						<nav class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Social Links Menu', 'twentyseventeen' ); ?>">
							<?php
								wp_nav_menu( array(
									'theme_location' => 'social',
									'menu_class'     => 'social-links-menu',
									'depth'          => 1
								) );
							?>
						</nav><!-- .social-navigation -->
					<?php endif;

					get_template_part( 'template-parts/footer/site', 'info' );
					?>
				</div><!-- .wrap -->
			</div><!-- .footer-menus -->
		</footer><!-- #colophon -->
	</div><!-- .site-content-contain -->
</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>
