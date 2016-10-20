(function(){
angular.module('random-name-generator',[])
.service('nameGenerator',function($q,$http){
  var self = this;
  self.initialize = function(p){
    self.path = p;
    $http.get(self.path, { headers: { 'Cache-Control' : 'no-cache' } }).then(function(response){
      self.names = response.data;
    });
  }

  self.generateName = function(in1,in2,gender){
    var deferred = $q.defer();
    if(self.path!=undefined){
      deferred.resolve($http.get(self.path, { headers: { 'Cache-Control' : 'no-cache' } })).then(function(response){
        self.names = response.data
        var temp1 =[],temp2 =[];
        if(gender=="male"){
          for(var i=0;i<response.data.firstNames.male.length;i++)
          if(response.data.firstNames.male[i].charAt(0)==in1.toUpperCase())temp1.push(response.data.firstNames.male[i]);
        }else if(gender=="female"){
          for(var i=0;i<response.data.firstNames.female.length;i++)
          if(response.data.firstNames.female[i].charAt(0)==in1.toUpperCase())temp1.push(response.data.firstNames.female[i]);
        }
        for(var i=0;i<response.data.lastNames.length;i++)if(response.data.lastNames[i].charAt(0)==in2.toUpperCase())temp2.push(response.data.lastNames[i]);
        if (temp1.length<1) {
          for(var i=0;i<response.data.firstNames.male.length;i++)temp1.push(response.data.firstNames.male[i]);
        }
        if (temp2.length<1) {
          for(var i=0;i<response.data.lastNames.length;i++)temp2.push(response.data.lastNames[i]);
        }
        return temp1[Math.floor(Math.random()*(temp1.length))]+" "+temp2[Math.floor(Math.random()*(temp2.length))];
      },function(error){
        console.log("Path does not exist");
      }));
    }else{
      deferred.reject("Path is not defined.");
    }
    return deferred.promise;
  }

  self.checkNickName = function(nickname) {
    var firstName = nickname.split(" ")[0];
    var lastName = nickname.split(" ")[1];
    var valid = [false, false];

    for (var i = 0; i < self.names.firstNames.male.length; i++) if (self.names.firstNames.male[i] == firstName) valid[0] = true;
    for (var i = 0; i < self.names.lastNames.length; i++) if (self.names.lastNames[i] == lastName) valid[1] = true;
    if (valid[0]&&valid[1]){
      return true;
    } else {
      return false;
    }
  }
});
})();
