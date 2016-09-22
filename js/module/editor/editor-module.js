define(function(require) {

    var Protoplast = require('protoplast'),
        EditorModel = require('module/editor/model/editor-model'),
        FountainEditorView = require('module/editor/view/fountain-editor'),
        EditorController = require('module/editor/controller/editor-controller');

    var EditorModule = Protoplast.Object.extend({
        
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
        
        getEditorView: function() {
            var editorView = FountainEditorView.create();
            this.context.register(editorView);
            return editorView;
        }
        
    });

    return EditorModule;
});