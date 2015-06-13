/* jshint -W117 */
var app = angular.module('flapperNews', ['ui.router','angularMoment']);
/* jshint +W117 */

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
     templateUrl: 'partial-home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/partial-posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope','posts', function($scope, posts){
  $scope.posts = posts.posts;
  $scope.order = '-upvotes';
  
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
      time: new Date()
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
  $scope.decrementUpvotes = function(post) {
    posts.downvote(post);
  };
  $scope.setOrder = function (order) {
    if (order === $scope.order){
      if (order[0] === '-'){
        $scope.order = order.substr(1,order.length);
      }
      else {
        $scope.order = '-'.concat(order);
      }
    }
    else {
      $scope.order = order;
    }
  };
}]);

app.factory('posts', [ '$http', function($http){
  var o = {
    posts: []
  };
  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      /* jshint -W117 */
      angular.copy(data, o.posts);
      /* jshint +W117 */
    });
  };
  o.create = function(post) {
    return $http.post('/posts', post).success(function(data){
      o.posts.push();
    });
  };
  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function() {
        post.upvotes += 1;
      });
  };
  o.downvote = function(post) {
    return $http.put('/posts/' + post._id + '/downvote')
      .success(function(){
        post.upvotes -= 1;
      });
  };
  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
      .success(function(data){
        comment.upvotes += 1;
      });
  };
  return o;
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
function($scope, posts, post){
  $scope.post = post;
  
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post._id, {
      body: $scope.body,
      author: 'user',
      time: new Date()
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
  };
}]);