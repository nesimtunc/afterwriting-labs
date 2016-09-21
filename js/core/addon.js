define(function(require) {

    var p = require('protoplast');

    /**
     * @alias Addon
     */
    var Addon = p.Object.extend({

        $meta: {
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
        }
    });

    return Addon;
});
