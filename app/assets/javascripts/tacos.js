app.service('TacoService', function($http) {
function fromJSON(json) {
  var taco = _.omit(json, '_id');
  taco.id = json.id || json._id;
  return taco;
}

this.getTacos = function() {
  return $http.get('/tacos').then(function(result) {
    return _.map(result.data, fromJSON);
  });
};

this.createTaco = function(json) {
  return $http({
    method: 'POST',
    url: '/tacos',
    data: json
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

app.controller('TacosCtrl', function(TacoService) {
var tc = this;

// Load the list of tacos we already have
TacoService.getTacos().then(function(tacos) {
  tc.tacos = tacos;
}).catch(function(err) {
  tc.listError = err.message || err.statusText;
});

// Create a default taco for new tacos
var defaultTaco = {
  meat: 'chicken',
  rice: false,
  salsa: false,
  notes: ''
};
tc.newTaco = _.clone(defaultTaco);

tc.createTaco = function() {
  tc.createError = null;
  tc.creatingTaco = true;
  TacoService.createTaco(tc.newTaco).then(function(taco) {
    tc.tacos.push(taco);
    tc.newTaco = _.clone(defaultTaco);
  }).catch(function(err) {
    tc.createError = err.message || err.statusText;
  }).finally(function() {
    tc.creatingTaco = false;
  })
};

tc.deleteTaco = function(taco) {
  tc.deleteError = null;
  TacoService.deleteTaco(taco.id).then(function() {
    var index = _.indexOf(tc.tacos, taco);
    tc.tacos.splice(index, 1);
  }).catch(function(err) {
    tc.deleteError = err.message || err.statusText;
  });
};
});
