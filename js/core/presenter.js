define(function(require) {

    var Protoplast = require('protoplast');
    
    /**
     * @alias Presenter
     */
    var Presenter = Protoplast.Model.extend([Protoplast.Dispatcher], {

        $meta: {
            constructors: [Protoplast.constructors.autobind]
        },
        
        init: {
            injectInit: true,
            value: function() {}
        }
        
    });

    return Presenter;
});
