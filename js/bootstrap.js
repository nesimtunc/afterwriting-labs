define(['dependencies', 'protoplast', 'core/model/app-model'], function(_, p, AppModel) {

    var Bootstrap = p.extend({
        
        context: null,

        appModel: null,

        pub: {
            inject: 'pub'
        },

        init: function(addons) {

            this.appModel = AppModel.create();
            this.appModel.env = "dev";

            this.context = p.Context.create();
            this.context.register('app-model', this.appModel);
            
            addons.forEach(function(Addon) {
                if (!Addon.name) {
                    throw new Error('Please specify addon name');
                }
                this.context.register(Addon.name, Addon.create());
            }, this);

            this.context.register(this);
            this.context.build();

            this.pub('app/init');
        },
        
        __deprecated__init: function(modules) {

            this.addons = [];
            this.modules = Array.prototype.splice.call(modules, 0);

            var context = p.Context.create();

            context.register('core', this);

            this.modules.forEach(function(module) {
                if (!module.$meta.addon) {
                    context.register(module.name, module);
                }
                else {
                    this.addons.push(module);
                }
            }, this);

            var addonApi = AddonApi.create();
            context.register('addonApi', addonApi);
            context.register('bootstrap', this);
            this.context = context;
            context.build();
            
            this.modules.forEach(function(module) {
                if (module.windup && typeof (module.windup) === 'function') {
                    module.windup();
                }
            });
            
            this.addons.forEach(function(addon) {
                addon.api = addonApi;
            });
            
            this.context._objects.layout.initLayout();
        }
    });

    return Bootstrap.create();
});