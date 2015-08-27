var app = angular.module("redditApp", ['angularMoment', 'ngAnimate', 'firebase']);
  app.run(function(amMoment) {
    amMoment.changeLocale('de');
});

app.controller("RedditInfoController", function($scope, $http, $firebaseArray){

  var data = new Firebase('https://article-ranker.firebaseio.com/posts')
  $scope.posts = $firebaseArray(data)
  $scope.votes = 0

  $scope.upVote = function(post) {
    post.votes ++
    $scope.posts.$save(post)
  }
  $scope.downVote = function(post) {
    post.votes --
    $scope.posts.$save(post)
  }
  $scope.submit = function(title, author, imgUrl, description) {
    var obj = {}
    $scope.showDetails = ! $scope.showDetails
    var date = new Date()
    obj['title'] = title
    obj['author'] = author
    obj['imgUrl'] = imgUrl
    obj['description'] = description
    obj['date'] = date.toString()
    obj['votes'] = 0
    //
    $scope.title = ''
    $scope.author = ''
    $scope.imgUrl = null
    $scope.description = ''

    $scope.posts.$add(obj)
  }

  $scope.commentSubmit = function(author, text, post) {
    var obj = {}
    post.addComment = ! post.addComment

    obj['author'] = author
    obj['text'] = text
    console.log(post)
    if (post.comments === undefined) {
      post.comments = []
    }
    post.comments.push(obj)
    $scope.posts.$save(post)
    post.author = ''
    post.text = ''
  }
  $scope.showComments = function(post) {
    post.showComment = ! post.showComment
    $scope.posts.$save(post)
  }
  $scope.addComments = function(post) {
    post.addComment = ! post.addComment
    $scope.posts.$save(post)
  }
})
