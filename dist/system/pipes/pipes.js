System.register(['dash-transform', '../githubResponseCache', 'linq-es6'], function (_export) {
    'use strict';

    var transform, responses, Enumerable;

    _export('registerPipes', registerPipes);

    function registerPipes() {

        var lib = new transform.TransformLibrary();

        var callGithubEvents = lib.registerFilter(new transform.FunctionFilter('callGithubEvents', function () {
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
        }));

        var toJson = lib.registerFilter(new transform.FunctionFilter('toJson', function (inputObj, input) {
            return JSON.parse(input);
        }));

        var jsonGithubEventsToCount = lib.registerFilter(new transform.FunctionFilter('jsonGithubEventsToCount', function (inputObj, input) {
            return Enumerable(input).where(function (e) {
                return e.type == 'PushEvent';
            }).count();
        }));

        var getGithubEventsAsJson = new transform.Pipe('getGithubEventsAsJson');
        getGithubEventsAsJson.add(callGithubEvents).add(toJson);
        lib.registerPipe(getGithubEventsAsJson);

        var pipe = new transform.Pipe('githubEventsToCount');

        pipe.add(lib.getPipeWrapped('getGithubEventsAsJson')).add(jsonGithubEventsToCount);

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