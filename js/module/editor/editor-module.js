define(function(require) {

    var Protoplast = require('protoplast'),
        EditorModel = require('module/editor/model/editor-model'),
        EditorController = require('module/editor/controller/editor-controller');

    var EditorModule = Protoplast.extend([Protoplast.Dispatcher], {
        
        context: null,
        
        editorModel: null,
        
        editorController: null,
        
        $create: function() {
            this.context = Protoplast.Context.create();

            this.editorModel = EditorModel.create();
            this.editorController = EditorController.create();
            
            this.context.register('editor-model', this.editorModel);
            this.context.register('editor-controller', this.editorController);
            
            this.context.build();
        },

        use: function(view) {
            this.context.register(view);
        }

    });

    return EditorModule;
});