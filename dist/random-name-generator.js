(function(){
angular.module('random-name-generator',[])
.service('nameGenerator',function($q,$http){
  this.initialize = function(p){
    this.path = p;
  }

  this.generateName = function(in1,in2,gender){
    var deferred = $q.defer();
    if(this.path!=undefined){
      deferred.resolve($http.get(this.path+'?nocache'+new Date().getTime()).then(function(response){
        var temp1 =[],temp2 =[];
        if(gender=="male"){
          for(var i=0;i<response.data.firstNames.male.length;i++)
          if(response.data.firstNames.male[i].charAt(0)==in1.toUpperCase())temp1.push(response.data.firstNames.male[i]);
        }else if(gender=="female"){
          for(var i=0;i<response.data.firstNames.female.length;i++)
          if(response.data.firstNames.female[i].charAt(0)==in1.toUpperCase())temp1.push(response.data.firstNames.female[i]);
        }
        for(var i=0;i<response.data.lastNames.length;i++)if(response.data.lastNames[i].charAt(0)==in2.toUpperCase())temp2.push(response.data.lastNames[i]);
        return temp1[Math.floor(Math.random()*(temp1.length))]+" "+temp2[Math.floor(Math.random()*(temp2.length))];
      },function(error){
        console.log("Path does not exist");
      }));
    }else{
      deferred.reject("Path is not defined.");
    }
    return deferred.promise;
  }
});
})();
