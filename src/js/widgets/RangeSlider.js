class RangeSlider {
	constructor(el, opts) {

		if (!el) throw new Error('Element doesn\'t exist');

		let $el = $(el),
			$handle = [],
			instance;

		let options = {
			create: function( event, ui ) {
				instance = ui;
				$el.addClass('isInited');
			}
		};

		if (opts) {
			for (let key in opts) {
				options[key] = opts[key];
			}
		}


		$el.slider(options);

		this.el = $el;
		this.isInited = false;
		this.options = options;
		this.instance = instance;

	}
}