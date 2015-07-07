System.register(['dash-component', 'dash-transform', 'linq-es6'], function (_export) {
    'use strict';

    var BaseComponent, transform, Enumerable, ImageGrid;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_dashComponent) {
            BaseComponent = _dashComponent.BaseComponent;
        }, function (_dashTransform) {
            transform = _dashTransform;
        }, function (_linqEs6) {
            Enumerable = _linqEs6['default'];
        }],
        execute: function () {
            ImageGrid = (function (_BaseComponent) {
                function ImageGrid() {
                    _classCallCheck(this, ImageGrid);

                    _BaseComponent.call(this);
                    this.caption = 'PushEvents in last call';
                    this.imageUrls = [];
                }

                _inherits(ImageGrid, _BaseComponent);

                ImageGrid.prototype.activate = function activate(model) {
                    var _this = this;

                    _BaseComponent.prototype.activate.call(this, model);

                    var lib = new transform.TransformLibrary();

                    this.stream = new transform.Stream(lib.getPipeWrapped('getGithubEventsAsJson'));

                    this.stream.build();

                    this.stream.subscribe(function (o) {
                        _this.imageUrls = Enumerable(o).select(function (e) {
                            return e.actor.avatar_url;
                        }).toArray();
                    });

                    this.stream.start({ interval: 3000 });
                };

                ImageGrid.prototype.detached = function detached() {
                    this.stream.stop();
                };

                return ImageGrid;
            })(BaseComponent);

            _export('ImageGrid', ImageGrid);
        }
    };
});