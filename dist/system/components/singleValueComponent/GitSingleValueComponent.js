System.register(['dash-component', 'dash-transform'], function (_export) {
    'use strict';

    var BaseComponent, transform, GitSingleValueComponent;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_dashComponent) {
            BaseComponent = _dashComponent.BaseComponent;
        }, function (_dashTransform) {
            transform = _dashTransform;
        }],
        execute: function () {
            GitSingleValueComponent = (function (_BaseComponent) {
                function GitSingleValueComponent() {
                    _classCallCheck(this, GitSingleValueComponent);

                    _BaseComponent.call(this);
                    this.caption = 'PushEvents in last call';
                    this.value = 'NaDa';
                }

                _inherits(GitSingleValueComponent, _BaseComponent);

                GitSingleValueComponent.prototype.activate = function activate(model) {
                    var _this = this;

                    _BaseComponent.prototype.activate.call(this, model);

                    var lib = new transform.TransformLibrary();

                    this.stream = new transform.Stream(lib.getPipeWrapped('githubEventsToCount'));

                    this.stream.subscribe(function (o) {
                        _this.value = o;
                    });

                    this.stream.start({ interval: 3000 });
                };

                GitSingleValueComponent.prototype.detached = function detached() {
                    this.stream.stop();
                };

                return GitSingleValueComponent;
            })(BaseComponent);

            _export('GitSingleValueComponent', GitSingleValueComponent);
        }
    };
});