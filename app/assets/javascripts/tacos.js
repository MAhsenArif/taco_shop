app.service('TacoService', function($http) {
  function fromJSON(json) {
    var val = json;
    return val.data;
  }

  this.handleErrorObject = function(err) {
    var error = fromJSON(err);

    if (error && error.errors) {
      return error.errors[0].message;
    }

    return err.statusText;
  }

  this.getTacos = function() {
    return $http.get('/tacos').then(function(result) {
      return fromJSON(result.data);
    });
  };

  this.createTaco = function(json) {
    data = new Object();
    data.taco = json;

    return $http({
      method: 'POST',
      url: '/tacos',
      data: data
    }).then(function(result) {
      return fromJSON(result.data);
    });
  };

  this.deleteTaco = function(id) {
    return $http({
      method: 'DELETE',
      url: '/tacos/' + id
    });
  };
});

function generateTacosList(tc, tacos) {
  var tacoStruct = new Object();
  var tacoList = [];

  for (i = 0; i < tacos.length; i++) {
    tacoStruct = new Object();
    if(tacos[i].id) {
      tacoStruct.id = tacos[i].id;
      tacoStruct.meat = tacos[i].attributes.meat;
      tacoStruct.rice = tacos[i].attributes.rice;
      tacoStruct.salsa = tacos[i].attributes.salsa;
      tacoStruct.notes = tacos[i].attributes.notes;

      tacoList.push(tacoStruct);
    }
  }

  tc.tacos = tacoList;
}

function pushNext(tc, taco) {
  var tacoStruct = new Object();

  if(taco.id) {
    tacoStruct.id = taco.id;
    tacoStruct.meat = taco.attributes.meat;
    tacoStruct.rice = taco.attributes.rice;
    tacoStruct.salsa = taco.attributes.salsa;
    tacoStruct.notes = taco.attributes.notes;

    tc.tacos.push(tacoStruct);
  }
}

app.controller('TacosCtrl', function(TacoService) {
  var tc = this;

  // Load the list of tacos we already have
  TacoService.getTacos().then(function(tacos) {
    generateTacosList(tc, tacos);
  }).catch(function(err) {
    tc.listError = TacoService.handleErrorObject(err);
  });

  // Create a default taco for new tacos
  var defaultTaco = {
    meat: 'chicken',
    rice: false,
    salsa: false,
    notes: ''
  };
  tc.newTaco = _.clone(defaultTaco);
  tc.other = false;

  tc.createTaco = function() {
    tc.createError = null;
    tc.creatingTaco = true;
    TacoService.createTaco(tc.newTaco).then(function(taco) {
      pushNext(tc, taco);
      tc.newTaco = _.clone(defaultTaco);
      tc.other = false;
    }).catch(function(err) {
      tc.createError = TacoService.handleErrorObject(err);
    }).finally(function() {
      tc.creatingTaco = false;
    })
  };

  tc.deleteTaco = function(taco) {
    tc.deleteError = null;
    TacoService.deleteTaco(taco.id).then(function() {
      var index = tc.tacos.findIndex(x => x.id == taco.id)
      tc.tacos.splice(index, 1);
    }).catch(function(err) {
      tc.deleteError = TacoService.handleErrorObject(err);
    });
  };

  tc.clearOther = function() {
    tc.other = false;
  }

  tc.setOther = function() {
    tc.other = true;
    tc.newTaco.meat = null;
  }
});
