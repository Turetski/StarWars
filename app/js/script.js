angular.module("SWApp",["SW-directives", "SW-general"])
  .controller("sw-main-controller",function(httpq){
    var gallery = this;
    gallery.filter = "all";
    gallery.persons = [];
    function setIds(){
      var len = gallery.persons.length;
      for(var i =0; i<len; i++){
        gallery.persons[i].id = parseInt(gallery.persons[i].url.match(/\d+/)[0],10);
      }
    }
    (function getPage(num){  // эта рекурсивная функция создает промисы до тех пор пока не выкачает данные всех персонажей
      httpq.get("http://swapi.co/api/people/?page="+num)
        .then(function(result){
          gallery.persons = gallery.persons.concat(result.data.results);
          setIds();
          if(!result.data.next) return ;
          getPage(num+1);
        })
        .catch(function(){
              console.log('loading error');
        });
    })(1);  
    gallery.setFilter = function(filter) {
      gallery.filter = filter;
    }
  })
  .controller("sw-cv-controller",function(httpq,$routeParams){
    var cv = this;
    cv.person={};
    httpq.get("http://swapi.co/api/people/"+ $routeParams.id)
      .then(function(result){
        cv.person = result.data;
        httpq.get(cv.person.homeworld)
          .then(function(result){ 
            cv.person.homeworld = result.data.name;
          })
          .catch(function(){
                  console.log('loading error');
          });
      })
      .catch(function(){
              console.log('loading error');
      });
  })
  ;