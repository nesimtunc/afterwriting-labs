define(function(require) {
   
    var Protoplast = require('p');
    
    var Cache = Protoplast.extend({

        values: null,

        triggers: null,
        
        $create: function() {
            this.values = {};
            this.triggers = {};
        },
        
        add_trigger: function(host, consumer) {
            this.triggers[host] = this.triggers[host] || [];
            this.triggers[host].push(consumer);
        },

        purge: function(name) {
            var queue = this.triggers[name] || [], new_queue;
            delete this.values[name];
            while (queue.length) {
                new_queue = [];
                queue.forEach(function(dependency) {
                    delete this.values[dependency];
                    new_queue = new_queue.concat(this.triggers[dependency] || []);
                }, this);
                queue = new_queue;
            }
        },
        
        has: function(name) {
            return this.values.hasOwnProperty(name);
        },
        
        get: function(name) {
            return this.values[name];
        },
        
        set: function(name, value) {
            return this.values[name] = value;
        }

    });
    
    return Cache;
    
});