define(['utils/chef/chef', 'utils/chef/recipe'], function(Chef, Recipe) {

    describe('chef', function() {

        var EncodedContent, Content, Words, WordsCount,
            content_getter, words_getter;

        beforeEach(function() {

            content_getter = sinon.stub();
            words_getter = sinon.stub();

            Content = Recipe.extend({
                $create: function() {
                    this.value = 'default';
                },
                value: {
                    set: function(value) {
                        this.content = value;
                    },
                    get: function() {
                        content_getter();
                        return this.content;
                    }
                }
            });

            EncodedContent = Recipe.extend({
                content: {
                    type: Content
                },
                value: {
                    set: function(value) {
                        this.encoded = value;
                        this.content = value.toLowerCase();
                    },
                    get: function() {
                        return this.encoded;
                    }
                }
            });

            Words = Recipe.extend({
                content: {
                    type: Content
                },
                value: {
                    get: function() {
                        words_getter();
                        return this.content.split(' ');
                    }
                }
            });

            WordsCount = Recipe.extend({
                words: {
                    type: Words
                },
                value: {
                    get: function() {
                        return this.words.length;
                    }
                }
            });
        });

        it('default values', function() {
            var script = Chef.create();
            script.add('content', Content);

            chai.assert.equal(script.get('content'), 'default');
        });

        it('basic setter and getter', function() {
            var script = Chef.create();
            script.add('content', Content);

            script.set('content', 'test');
            chai.assert.equal(script.get('content'), 'test');
        });

        it('computed getters', function() {
            var script = Chef.create();
            script.add('content', Content);
            script.add('words', Words);

            script.set('content', 'foo bar');
            chai.assert.lengthOf(script.get('words'), 2);
        });

        it('two computed getters', function() {
            var script = Chef.create();
            script.add('content', Content);
            script.add('words', Words);
            script.add('words.count', WordsCount);

            script.set('content', 'foo bar');
            chai.assert.equal(script.get('words.count'), 2);
        });

        it('missing dependencies', function() {
            var script = Chef.create();
            script.add('content', Content);
            script.add('words.count', WordsCount);

            script.set('content', 'foo bar');
            chai.assert.equal(script.get('words.count'), 2);
        });

        it('setters', function() {
            var script = Chef.create();
            script.add('content', Content);
            script.add('content.encoded', EncodedContent);

            script.set('content.encoded', 'FOO BAR');
            chai.assert.equal(script.get('content'), 'foo bar');
        });

        it('getters are cached', function() {
            var script = Chef.create();
            script.add('content', Content);

            script.set('content', 'test');
            script.get('content');
            script.get('content');

            sinon.assert.calledOnce(content_getter);
        });

        it('cached is clear when the value is set', function() {
            var script = Chef.create();
            script.add('content', Content);
            script.add('words', Words);

            script.set('content', 'foo bar');
            sinon.assert.notCalled(words_getter);

            script.get('words');
            script.get('words');

            sinon.assert.calledOnce(words_getter);

            script.set('content', 'foo foo bar');
            sinon.assert.calledOnce(words_getter);

            script.get('words');
            script.get('words');

            chai.assert.lengthOf(script.get('words'), 3);
            sinon.assert.calledTwice(words_getter);
        });

        it('binding', function() {

            var trigger = sinon.stub();

            var Trigger = Recipe.extend({

                content: {
                    type: Content,
                    bind: function() {
                        trigger(this.content);
                    }
                }

            });

            var script = Chef.create();
            script.add('main.content', Content);
            script.add('trigger', Trigger);

            sinon.assert.notCalled(trigger);
            script.set('main.content', 'test');

            sinon.assert.called(trigger);
            sinon.assert.calledWith(trigger, 'test');
        });

        it('use case', function() {

            var Fountain = Recipe.extend({

                value: {
                    set: function(value) {
                        this.fountain = value;
                    },
                    get: function() {
                        return this.fountain;
                    }
                }

            });

            var Tokens = Recipe.extend({

                value: {
                    set: function(value) {
                        this.tokens = value;
                    },
                    get: function() {
                        return this.tokens;
                    }
                }

            });

            var Lines = Recipe.extend({

                tokens: {
                    type: Tokens
                },

                value: {
                    get: function() {
                        return this.tokens.filter(function(token) {
                            return token;
                        })
                    }
                }

            });

            var PrintConfig = Recipe.extend({

                $create: function() {
                    this.lines_per_page = 5
                },

                value: {
                    set: function(value) {
                        this.config = value;
                    },
                    get: function() {
                        return this.config;
                    }
                }

            });

            var PagesStats = Recipe.extend({

                lines: {
                    type: Lines
                },

                config: {
                    type: PrintConfig
                },

                value: {
                    get: function() {
                        return this.lines.length / this.config.lines_per_page;
                    }
                }

            });

            var FountainParser = Recipe.extend({

                tokens: {
                    type: Tokens
                },

                fountain: {
                    type: Fountain,
                    bind: function() {
                        this.tokens = this.fountain.split('\n');
                    }
                }

            });

            var script = Chef.create();
            script.add('config.print', PrintConfig);
            script.add('fountain', Fountain);
            script.add('tokens', Tokens);
            script.add('lines', Lines);
            script.add('stats.pages', PagesStats);
            script.add('parser.fountain', FountainParser);

            script.set('fountain', 'line 1\n\nline 2\nline 3');
            script.set('config.print', {lines_per_page: 3});

            chai.assert(script.get('stats.pages'), 1);
        });

    });
});