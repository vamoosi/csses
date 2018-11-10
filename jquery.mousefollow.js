/*
 * mousefollow v0.1.0
 * author 1224100678@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function($, window, document, undefined){
	// å®šä¹‰MouseFollowæž„é€ å‡½æ•°
	var mouseFollow = function(el, opt){
		var _ = this;
		_.el = el,
		_.defaults = {
			className: 'js-follow',  // æ’å…¥çš„divçš„class
			html: '',                // æ’å…¥çš„html
			speed: 200,              // æ·¡å‡ºé€Ÿåº¦
			x: 20,                   // è·ç¦»é¼ æ ‡çš„æ°´å¹³è·ç¦»
			y: 20                    // è·ç¦»é¼ æ ‡çš„åž‚ç›´è·ç¦»
		},
		_.settings = $.extend({}, _.defaults, opt);
	}

	// å®šä¹‰MouseFollowçš„æ–¹æ³•
	mouseFollow.prototype = {
		// åˆå§‹åŒ–
		init: function() {
			var _ = this;
			_.addDOM();
			_.mouseEnter();
			_.mouseMove();
			_.mouseOut();
		},

		// æ’å…¥DOM
		addDOM: function(){
			var _ = this;
			if (!$('.'+_.settings.className).length) {
				$('body').append('<div class="'+_.settings.className+'" style="position: fixed; top: 100%; display: none;"></div>');
			}
		},

		// é¼ æ ‡ç§»å…¥æ’å…¥HTML
		mouseEnter: function() {
			var _ = this;
			_.el.mouseenter(function() {
				$('.'+_.settings.className).html(_.settings.html).fadeIn(_.settings.speed);
			});
		},

		// é¼ æ ‡ç§»åŠ¨æ”¹å˜ä½ç½®
		mouseMove: function() {
			var _ = this;
			var _class = _.settings.className,
				_html = _.settings.html,
				_speed = _.settings.speed,
				_x = _.settings.x,
				_y = _.settings.y;

			_.el.mousemove(function(event) {
				event = event || window.event;
				var x = event.clientX;
				var y = event.clientY;
				var setCssX = function() {
					if ( x + _x + $('.'+_class).width() < $(window).width() ) {
						$('.'+_class).css({
							left: x + _x,
							right: 'auto'
						});
					} else {
						$('.'+_class).css({
							left: 'auto',
							right: $(window).width() - x + _x -10
						});
					}
				}
				var setCssY = function(){
					if ( y + _y + $('.'+_class).height() < $(window).height() ) {
						$('.'+_class).css({
							top: y + _y,
							bottom: 'auto'
						});
					} else {
						$('.'+_class).css({
							top: 'auto',
							bottom: $(window).height() - y + _y - 20
						});
					}				
				}
				setCssX();
				setCssY();
			});
		},

		// é¼ æ ‡ç§»å‡ºåˆ é™¤
		mouseOut: function() {
			var _ = this;
			_.el.mouseleave(function() {
				$('.'+_.settings.className).hide();
			});
		}
	}

	$.fn.mousefollow = function(option){
		// åˆ›é€ MouseFollowå®žä½“
		var mousefollow = new mouseFollow(this, option);
		// è°ƒç”¨å…¶æ–¹æ³•
		return mousefollow.init();
	}
})(jQuery, window, document);
