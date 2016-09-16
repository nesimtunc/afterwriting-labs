define(function(require) {

    var p = require('protoplast');

    /**
     * @alias Addon
     */
    var Addon = p.extend({

        $meta: {
            constructors: [p.constructors.autobind],
            addon: true
        },

        /**
         * @type {AddonApi}
         */
        _api: null,
        
        api: {
            set: function(api) {
                this._api = api;
                this.init();
            },
            get: function() {
                return this._api;
            }
        },

        init: function() {}
    });

    return Addon;
});
