var blogApp = angular.module('blogApp',['ui.router']);

blogApp.run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

blogApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                '':{
                    templateUrl:'templates/homepage.html'
                },
                'pageHead@index':{
                    templateUrl:'templates/pagehead.html'
                }
            }
        })
})


































//var blogApp = angular.module("blogApp",["ui.router"]);
//
//blogApp.run(function($rootScope,$state,$stateParams){
//    $rootScope.$state = $state;
//    $rootScope.$stateParams = $stateParams;
//});
//
//blogApp.config(function($stateProvider,$urlRouterProvider){
//    $urlRouterProvider.otherwise("/index");
//    $stateProvider.state("index",{
//        url:"/index",
//        views:{
//            '':{
//                templateUrl:"templates/homepage.html"
//            },
//            'pageHead@index':{
//                templateUrl:"templates/pagehead.html"
//            }
//        }
//    });
//});