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

 /* Template Name: Map Overlay */

get_header(); ?>



<div class="wrap" id="map">
	
	<div id="primary" class="content-area">

		<main id="main" class="site-main" role="main">

			<div class="map-block">

				<div class="map-overlay">
					<!-- North America -->
						<div class="map-point" id="pawcatuck" data-contentid="1">
						</div>
						<div class="map-point" id="somerset" data-contentid="2">
						</div>
						<div class="map-point" id="fulton" data-contentid="3">
						</div>
						<div class="map-point" id="gloucester" data-contentid="4">
						</div>
						<div class="map-point" id="ringwood" data-contentid="5">
						</div>
					<!-- Europe -->
						<div class="map-point" id="dusseldorf" data-contentid="6">
						</div>
						<div class="map-point" id="west-midlands" data-contentid="7">
						</div>
						<div class="map-point" id="vantaa" data-contentid="8">
						</div>
						<div class="map-point" id="ecublens" data-contentid="9">
						</div>
					<!-- Asia -->
						<div class="map-point" id="shanghai" data-contentid="10">
						</div>
						<div class="map-point" id="suzhou" data-contentid="11">
						</div>
						<div class="map-point" id="selangor" data-contentid="12">
						</div>
						<!-- <div class="map-point" id="" data-contentid="13">
						</div> -->
				</div> <!-- .map-overlay -->
				<div class="locale-blocks">

					<div class="locale initial">
						<h2 class="locale-title">Global locales</h2>
						<p class="locale-details">Hover for more info</p>
					</div><!-- #locale-header -->
					
				<!-- North America -->

					<div class="locale pawcatuck" id="locale-1">
						<h2 class="locale-title">Pawcatuck, CT</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Manufacturing</li>
							<li>Sales &amp; Service</li>
							<li>Representation</li>
						</ul>
					</div><!-- #pawcatuck -->
					
					<div class="locale somerset" id="locale-2">
						<h2 class="locale-title">Somerset, NJ</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Sales Representation</li>
						</ul>
					</div><!-- #somerset -->
					
					<div class="locale fulton" id="locale-3">
						<h2 class="locale-title">Fulton, NY</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Manufacturing</li>
							<li>Sales &amp; Service</li>
							<li></li>
						</ul>
					</div><!-- #fulton -->
					
					<div class="locale gloucester" id="locale-4">
						<h2 class="locale-title">Gloucester, MA</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Manufacturing</li>
							<li>Sales &amp; Service</li>
						</ul>
					</div><!-- #gloucester -->
					
					<div class="locale ringwood" id="locale-5">
						<h2 class="locale-title">Ringwood, NJ</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Sales Representation</li>
						</ul>
					</div><!-- #ringwood -->

				<!-- Europe -->
					
					<div class="locale dusseldorf" id="locale-6">
						<h2 class="locale-title">Dusseldorf, Germany</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li>Sales Representation</li>
						</ul>
					</div><!-- #dusseldorf -->
					
					<div class="locale west-midlands" id="locale-7">
						<h2 class="locale-title">West Midlands, Great Britain</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #west-midlands -->
					
					<div class="locale vantaa" id="locale-8">
						<h2 class="locale-title">Vantaa, Finland</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #vantaa -->
					
					<div class="locale ecublens" id="locale-9">
						<h2 class="locale-title">Ecublens, Switzerland</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #ecublens -->

				<!-- Asia -->
					
					<div class="locale shanghai" id="locale-10">
						<h2 class="locale-title">Shanghai, China</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #shanghai -->
					
					<div class="locale suzhou-city" id="locale-11">
						<h2 class="locale-title">Suzhou City, China</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #suzhou-city -->
					
					<div class="locale selangor" id="locale-12">
						<h2 class="locale-title">Selangor Darul Ehsan, Malaysia</h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div><!-- #selangor -->
				
				<!-- sample -->
					
					<!-- <div class="locale " id="locale-27">
						<h2 class="locale-title"></h2>
						<p class="locale-details"></p>
						<ul class="locale-details">
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div> --><!-- # -->

				</div><!-- .locales -->
			</div><!-- .map-block -->

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