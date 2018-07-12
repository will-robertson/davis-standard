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

 /* Template Name: Landing Page */

get_header(); ?>

<div class="wrap">
  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

      <?php
      while ( have_posts() ) : the_post();

        get_template_part( 'template-parts/page/content', 'page' );

        // If comments are open or we have at least one comment, load up the comment template.
        if ( comments_open() || get_comments_number() ) :
          comments_template();
        endif;

      endwhile; // End of the loop.

      $cat_count = get_category( 'ID OR ROW OBJECT' );
      echo $cat_count->count;

      ?>

      <?php $catquery = new WP_Query( 'cat=0&posts_per_page=6' ); ?>
          <?php while($catquery->have_posts()) : $catquery->the_post(); ?>
          <li class="related-section">
            <img src="http://localhost/davis-standard-dev/wp-content/uploads/2018/04/placeholder_600.png" class="related-image">
            <div class="related-sub-section">
              <h3 class="related-title"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h3>
              <ul class="related-content">
                <li class="related-text"><?php the_content(); ?></li>
              </ul><!-- .related-content -->
            </div><!-- .related-sub-section -->
            <a href="<?php the_permalink() ?>" class="related-more" rel="bookmark">Read On &gt;</a>
          </li><!-- related-section -->
          <?php endwhile; ?> 
        </ul><!-- .related-block -->
      </div><!-- .related -->
      <?php wp_reset_postdata(); ?>

    </main><!-- #main -->
  </div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();
