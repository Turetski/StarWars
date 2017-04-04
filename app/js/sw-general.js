angular.module("SW-general",["ngRoute"])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: "/source/main/index.html",
        controller: "sw-main-controller",
        controllerAs: "mainCtrl"
      })
      .when('/show/:id',{
        templateUrl: "/source/cv/index.html",
        controller: "sw-cv-controller",
        controllerAs: "cvCtrl"
      })
      .otherwise({redirectTo:'/'});
  })
  .factory('httpq', function($http, $q){
    return{
        get: function(){
            var deffered = $q.defer();
            $http.get.apply(null, arguments)
                .then(deffered.resolve)
                .catch(deffered.resolve);
                return deffered.promise;
       }
    }
  })
  .filter("galleryFilter",function(){
    return function(persons, filter){
      var result = [],
          len = persons.length,
          gender = '';
      if(filter=='all') return persons;
      for(var i = 0; i<len; i++){
        gender = persons[i].gender;
        if( (gender==filter) ||(filter=="other" && gender!="male" && gender !="female") ) result.push(persons[i]);
      }
      return result;
    }
  })
  ;