define(function(require) {

    var Protoplast = require('protoplast');

    var EditorModel = Protoplast.Model.extend({
        
        content: ''
        
    });

    return EditorModel;
});