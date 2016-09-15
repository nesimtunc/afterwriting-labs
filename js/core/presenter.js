define(function(require) {

    var p = require('protoplast');
    
    /**
     * @alias Presenter
     */
    var Presenter = p.extend({

        $meta: {
            constructors: [p.constructors.autobind]
        },
        
        init: {
            injectInit: true,
            value: function() {}
        }
        
    });

    return Presenter;
});
