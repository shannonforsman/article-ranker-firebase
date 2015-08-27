var app = angular.module("redditApp", ['angularMoment', 'ngAnimate']);
  app.run(function(amMoment) {
    amMoment.changeLocale('de');
});

var link = 'https://desolate-ocean-9111.herokuapp.com/'

app.controller("RedditInfoController", function($scope, $http){
  $scope.list = []
  $http.get(link + 'articles').
  then(function(response) {
    $scope.list = response.data
  }, function(response) {
    console.log(response)
  });
  $scope.votes = 0
  $scope.upVote = function(id) {
    $scope.list[id].votes = parseInt($scope.list[id].votes, 10) + 1
    $http.put(link + 'articles', {'id': id, 'upvote': true})
  }
  $scope.downVote = function(id) {
    $scope.list[id].votes = parseInt($scope.list[id].votes, 10) - 1
    $http.put(link + 'articles', {'id': id, 'upvote': false})
  }
  $scope.submit = function(title, author, imgUrl, description) {
    var obj = {}
    $scope.showDetails = ! $scope.showDetails
    obj['title'] = title
    obj['author'] = author
    obj['imgUrl'] = imgUrl
    obj['description'] = description
    obj['date'] = new Date()
    obj['votes'] = 0
    obj['id'] = $scope.list.length
    obj['comments'] = []

    $http.post(link + 'articles', obj).
    then(function(response) {
      $scope.list = response.data
    }, function(response) {
      console.log(response)
    });
    $scope.title = ''
    $scope.author = ''
    $scope.imgUrl = ''
    $scope.description = ''
  }
  $scope.commentSubmit = function(author, text, id, post) {
    var obj = {}
    post.addComment = ! post.addComment
    obj['author'] = author
    obj['text'] = text
    $scope.list[id].comments.push(obj)
    $http.put(link + 'comments', {'id': id, 'comments': obj}).
    then(function(response) {
      console.log(response)
      $scope.list[id] = response.data
    })
  }
  $scope.author = ''
  $scope.text = ''
})
