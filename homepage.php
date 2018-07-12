<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Davis_Standard
 * @since 1.0
 * @version 1.0
 */

 /* Template Name: Homepage */

get_header(); ?>

<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">


			<div class="latest-posts">
				<h3>Latest</h3>
				<?php echo do_shortcode("[post_grid id='375']"); ?>
			</div>
			
			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/page/content', 'page' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;

			endwhile; // End of the loop.

			?>

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();
