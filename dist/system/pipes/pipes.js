System.register(['dash-transform', '../githubResponseCache', 'linq-es6'], function (_export) {
    'use strict';

    var transform, responses, Enumerable;

    _export('registerPipes', registerPipes);

    function registerPipes() {
        var callGithubEvents = new transform.FunctionFilter('callGithubEvents', function () {
            var p = new Promise(function (res, rej) {

                res(JSON.stringify(responses[0]));
                return;

                fetch('https://api.github.com/events').then(function (i) {
                    i.text().then(function (tin) {
                        res(tin);
                    });
                });
            });
            return p;
        });

        var toJson = new transform.FunctionFilter('toJson', function (inputObj, input) {
            return JSON.parse(input);
        });

        var jsonGithubEventsToCount = new transform.FunctionFilter('jsonGithubEventsToCount', function (inputObj, input) {
            return Enumerable(input).where(function (e) {
                return e.type == 'PushEvent';
            }).count();
        });

        var pipe = new transform.Pipe('githubEventsToCount');

        pipe.add(callGithubEvents).add(toJson).add(jsonGithubEventsToCount);

        var lib = new transform.TransformLibrary();

        lib.registerPipe(pipe);
    }

    return {
        setters: [function (_dashTransform) {
            transform = _dashTransform;
        }, function (_githubResponseCache) {
            responses = _githubResponseCache.responses;
        }, function (_linqEs6) {
            Enumerable = _linqEs6['default'];
        }],
        execute: function () {}
    };
});