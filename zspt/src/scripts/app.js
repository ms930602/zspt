'use strict';

/**
 * @ngdoc overview
 * @name Ms
 * @description
 * # Ms
 *
 * Main module of the application.
 */
var app = angular.module('mxsoft', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'mxsDirective',
    'mx.msCtrl'
  ]);

app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/mxsoft/home');
  $stateProvider
    .state('mxsoft',{
      url: '/mxsoft',
      views: {
        '': {
          templateUrl: 'views/root.html'
        },
        'top@mxsoft': {
          templateUrl: 'views/baseinfo/top.html'
        },
        'menu@mxsoft': {
          templateUrl: 'views/baseinfo/menu.html'
        },
        'bottom@mxsoft': {
          templateUrl: 'views/baseinfo/bottom.html'
        }
      }
    })
    .state('mxsoft.home',{
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl'
    })
    .state('mxsoft.department',{
        url: '/department',
        templateUrl: 'views/department/department.html',
        controller: 'depCtrl'
    })
    ;
});

app.controller('rootCtrl',function($scope,TipService){
  $scope.tipService = TipService;
});

/**
 * 提示框数据
 */
app.factory('TipService', ['$timeout', function($timeout) {
  return {
    message : null,
    target: null,
    type : null,
    title: '主页',
    where: [{sref:'mxsoft.home',title:'主页信息'}],
    setRouter : function(title,where){
      this.title = title;
      this.where = where;
    },
    setMessage : function(msg,type,target){

      this.message = msg;
      this.type = type;
      this.target = target;

      //提示框显示最多3秒消失
      var _self = this;
      $timeout(function(){
        _self.clear();
      },3000);
    },
    clear : function(){
      this.message = null;
      this.type = null;
      this.target = null;
    }
  };
}]);