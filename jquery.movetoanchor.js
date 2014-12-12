/*
 *  jQuery Boilerplate - v3.3.2
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "movetoanchor",
			defaults = {
				durationLimit: 500,
				speed: 4,
				easing: 'easeOutSine'
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.$element = $(this.element);

				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;

				this.init();
		}

		Plugin.prototype = {
			init: function () {
				this.attachEvents();
			},
			attachEvents: function() {
				this.$element.on('click', this.move.bind(this));
			},
			move: function(e) {
				e.preventDefault();

				var $target = $(this.$element.attr('href'));
				var distance = Math.abs($target.offset().top - this.$element.offset().top);
				
				$('body, html').animate({
					scrollTop: $target.offset().top
				},{
					duration: (distance > this.settings.durationLimit) ? distance / this.settings.speed : this.settings.durationLimit, 
					easing: this.settings.easing
				});
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
			return this;
		};

})( jQuery, window, document );