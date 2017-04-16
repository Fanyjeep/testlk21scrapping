(function(){
	angular.module('app',[
		'ui.router'
	])
	.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/movies');
        $stateProvider
        .state('movies', {
            url: '/movies',
            templateUrl: 'views/movies.html',
            controller: 'MoviesCtrl'
        })
        .state('play', {
            url: '/play/:data',
            templateUrl: 'views/video.html',
            controller: 'PlayCtrl'
        })
        
    })
    .controller('PlayCtrl',function($scope,$http,$window,$state,$sce){
       $scope.url = $state.params.data;
       console.log($scope.url)
    })

    .controller('MoviesCtrl',function($scope,$http,$window,$state,$sce){
        $scope.datas = [];
        var page = 1;
        $http({
            method : "GET",
            url : "https://lamoovie.com/ganool/nonton.php?type=latest&page=1",
            headers:{
                'X-Requested-With':'com.nonton.layar21',
		'Access-Control-Allow-Origin': '*'
            }
        }).then(function(response) {
            console.log(response.data.result);
            $scope.datas = response.data.result;
        }, function(error) {
            // $scope.myWelcome = response.statusText;
        });

        $scope.loadPage = function(){
            page += 1;
            $http({
                method : "GET",
                url : "https://lamoovie.com/ganool/nonton.php?type=latest&page="+page,
                headers:{
                    'X-Requested-With':'com.nonton.layar21',
		    'Access-Control-Allow-Origin': '*'
                }
            }).then(function(response) {
                for (var i = 0; i < response.data.result.length; i++) {
                    $scope.datas.push(response.data.result[i]);
                };
            }, function(error) {
                // $scope.myWelcome = response.statusText;
            });
        }

        $scope.open = function(data){
            var src = S(data.video_url).between('|', '|').s;
            $http({
                method : "GET",
                url : "https://lk21.me/"+src,
                
            }).then(function(response) {
                var res = response.data.replace(/\s/g, "");
                var movieUrl = S(res).between("movie_url='", "'").s;
                var url = $state.href('play',{data:movieUrl});
                window.open(url,'_blank');
            }, function(error) {
                // $scope.myWelcome = response.statusText;
            });
        }
    });
})();
