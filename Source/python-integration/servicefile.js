"use strict";
var app = angular.module('myhomeservice',[])

app.factory("apiFactory",['$http',function($http){

	var API = {}

	API.countword = function(data){
		return $http.post("/countword",{"data":data})
	};

	return API

}])