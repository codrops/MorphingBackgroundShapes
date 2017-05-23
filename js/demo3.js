/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	// Helper vars and functions.
	const extend = function(a, b) {
		for( let key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};

	// from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = function(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
	};

	const TiltObj = function(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.DOM = {};
		this.DOM.img = this.el.querySelector('.content__img');
		this.DOM.title = this.el.querySelector('.content__title');
		this._initEvents();
	}

	TiltObj.prototype.options = {
		movement: {
			img : { translation : {x: -40, y: -40} },
			title : { translation : {x: 20, y: 20} },
		}
	};

	TiltObj.prototype._initEvents = function() {
		this.mouseenterFn = (ev) => {
			anime.remove(this.DOM.img);
			anime.remove(this.DOM.title);
		};
		
		this.mousemoveFn = (ev) => {
			requestAnimationFrame(() => this._layout(ev));
		};
		
		this.mouseleaveFn = (ev) => {
			requestAnimationFrame(() => {
				anime({
					targets: [this.DOM.img, this.DOM.title],
					duration: 1500,
					easing: 'easeOutElastic',
					elasticity: 400,
					translateX: 0,
					translateY: 0
				});
			});
		};

		this.el.addEventListener('mousemove', this.mousemoveFn);
		this.el.addEventListener('mouseleave', this.mouseleaveFn);
		this.el.addEventListener('mouseenter', this.mouseenterFn);
	};

	TiltObj.prototype._layout = function(ev) {
		// Mouse position relative to the document.
		const mousepos = getMousePos(ev);
		// Document scrolls.
		const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
		const bounds = this.el.getBoundingClientRect();
		// Mouse position relative to the main element (this.DOM.el).
		const relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

		// Movement settings for the animatable elements.
		const t = {
			img: this.options.movement.img.translation,
			title: this.options.movement.title.translation,
		};
			
		const transforms = {
			img : {
				x: (-1*t.img.x - t.img.x)/bounds.width*relmousepos.x + t.img.x,
				y: (-1*t.img.y - t.img.y)/bounds.height*relmousepos.y + t.img.y
			},
			title : {
				x: (-1*t.title.x - t.title.x)/bounds.width*relmousepos.x + t.title.x,
				y: (-1*t.title.y - t.title.y)/bounds.height*relmousepos.y + t.title.y
			}
		};
		this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform = 'translateX(' + transforms.img.x + 'px) translateY(' + transforms.img.y + 'px)';
		this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform = 'translateX(' + transforms.title.x + 'px) translateY(' + transforms.title.y + 'px)';
	};

	const DOM = {};
	DOM.svg = document.querySelector('.morph');
	DOM.shapeEl = DOM.svg.querySelector('polygon');
	DOM.contentElems = Array.from(document.querySelectorAll('.content-wrap'));
	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	DOM.footer = document.querySelector('.content--related');
	const contentElemsTotal = DOM.contentElems.length;
	const shapes = [
		{
			points: '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
			scaleX: .8,
			scaleY: .9,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			points: '983.4,101.6 983.4,668.4 416.6,668.4 416.6,101.9 416.6,101.9 416.6,101.9',
			scaleX: .7,
			scaleY: .7,
			rotate: 90,
			tx: -100,
			ty: 100,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			points: '890.9,54.3 1081.8,385 890.9,715.7 509.1,715.7 318.2,385 509.1,54.3',
			scaleX: 1,
			scaleY: 1,
			rotate: -45,
			tx: 0,
			ty: -50,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			points: '983.4,101.6 779,385 983.4,668.4 416.6,668.4 611,388 416.6,101.9',
			scaleX: 1,
			scaleY: 1,
			rotate: 145,
			tx: 100,
			ty: -50,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			points: '983.4,101.6 1255,385 983.4,668.4 416.6,668.4 157,368 416.6,101.9',
			scaleX: .7,
			scaleY: .7,
			rotate: -70,
			tx: -50,
			ty: 50,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			points: '983.4,101.6 983.4,668.4 416.6,668.4 416.6,101.9 416.6,101.9 416.6,101.9',
			scaleX: 1.2,
			scaleY: 1.2,
			rotate: 20,
			tx: 0,
			ty: 0,
			fill: {
				color: 'none',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				points: {
					duration: 500,
					easing: 'easeOutExpo'
				},
				svg: {
					duration: 1500,
					easing: 'easeOutElastic'
				}
			}
		}
	];
	let step;

	const initShapeEl = function() {
		anime.remove(DOM.svg);
		anime({
			targets: DOM.svg,
			duration: 1,
			easing: 'linear',
			scaleX: shapes[0].scaleX,
			scaleY: shapes[0].scaleY,
			translateX: shapes[0].tx+'px',
			translateY: shapes[0].ty+'px',
			rotate: shapes[0].rotate+'deg'
		});
	};

	const createScrollWatchers = function() {
		DOM.contentElems.forEach((el,pos) => {
			const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
			pos = pos ? pos : contentElemsTotal;
			const watcher = scrollMonitor.create(scrollElemToWatch,-350);
			
			watcher.enterViewport(function() {
				step = pos;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					duration: shapes[pos].animation.points.duration,
					easing: shapes[pos].animation.points.easing,
					elasticity: shapes[pos].animation.points.elasticity || 0,
					points: shapes[pos].points,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing
					}
				});

				anime.remove(DOM.svg);
				anime({
					targets: DOM.svg,
					duration: shapes[pos].animation.svg.duration,
					easing: shapes[pos].animation.svg.easing,
					elasticity: shapes[pos].animation.svg.elasticity || 0,
					scaleX: shapes[pos].scaleX,
					scaleY: shapes[pos].scaleY,
					translateX: shapes[pos].tx+'px',
					translateY: shapes[pos].ty+'px',
					rotate: shapes[pos].rotate+'deg'
				});
			});

			watcher.exitViewport(function() {
				const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

				if( idx <= contentElemsTotal && step !== idx ) {
					step = idx;
					anime.remove(DOM.shapeEl);
					anime({
						targets: DOM.shapeEl,
						duration: shapes[idx].animation.points.duration,
						easing: shapes[idx].animation.points.easing,
						elasticity: shapes[idx].animation.points.elasticity || 0,
						points: shapes[idx].points,
						fill: {
							value: shapes[idx].fill.color,
							duration: shapes[idx].fill.duration,
							easing: shapes[idx].fill.easing
						}
					});

					anime.remove(DOM.svg);
					anime({
						targets: DOM.svg,
						duration: shapes[idx].animation.svg.duration,
						easing: shapes[idx].animation.svg.easing,
						elasticity: shapes[idx].animation.svg.elasticity || 0,
						scaleX: shapes[idx].scaleX,
						scaleY: shapes[idx].scaleY,
						translateX: shapes[idx].tx+'px',
						translateY: shapes[idx].ty+'px',
						rotate: shapes[idx].rotate+'deg'
					});
				}
			});
		});
	};

	const init = function() {
		imagesLoaded(document.body, () => {
			initShapeEl();
			createScrollWatchers();
			Array.from(document.querySelectorAll('.content--layout')).forEach(el => new TiltObj(el));
			// Remove loading class from body
			document.body.classList.remove('loading');
		});
	}

	init();
};