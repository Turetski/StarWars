angular.module("SW-directives",[])
  .directive("swPerson",function(){
    return { 
      restrict: "E",
      templateUrl: "source/main/sw-person.html"
    }
  });
