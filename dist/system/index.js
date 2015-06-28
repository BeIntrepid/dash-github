System.register(['./pipes/pipes', './components/singleValueComponent/GitSingleValueComponent'], function (_export) {
  'use strict';

  var registerPipes;
  return {
    setters: [function (_pipesPipes) {
      registerPipes = _pipesPipes;
    }, function (_componentsSingleValueComponentGitSingleValueComponent) {
      _export('GitSingleValueComponent', _componentsSingleValueComponentGitSingleValueComponent.GitSingleValueComponent);
    }],
    execute: function () {

      registerPipes.registerPipes();
    }
  };
});