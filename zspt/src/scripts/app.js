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
    'ngAnimate',
    'mxsDirective'
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
        templateUrl: 'views/home/home.html'
    })
    .state('mxsoft.department',{
        url: '/department',
        templateUrl: 'views/department/department.html'
    })
    ;
});