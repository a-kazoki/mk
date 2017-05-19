/*global $, angular, FB, console, language, lang, apiurl, initMap*/
// mainApp js
var mainApp = angular.module("mainApp", ["ngSanitize"]);


//homeCtrl js
mainApp.controller("homeCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    // language is AR or EN
    console.log(language);
    //intial points of map
    $scope.latitude = 30.059368;
    $scope.longitude = 31.204958;
    // get about api
    $http({
        method: "GET",
        url: apiurl + "/Api/About/GetAllAbout?Lang=" + language
    })
        .then(function (response) {
            console.log(response.data);
            if (response.data.AboutList.length === 0) {
                $scope.aboutpara = "Sorry server error /r/n عفوا تعذر الاتصال بالخادم";
            } else {
                $scope.aboutparas = response.data.AboutList;
                console.log($scope.aboutparas);
            }

        }, function (reason) {
            $scope.abouterror = reason.data;
            console.log(reason.data);
        });
    // branches api
    $http({
        method: "GET",
        url: apiurl + "/Api/Branches/GetAllBranches?PageIndex=0&Lang=" + language + "&Count=1000"
    })
        .then(function (response) {
            console.log(response.data);
            $scope.allbranches = response.data;
            if (response.data.AllBranches.length === 0 || response.data.IsSuccess === "false") {
                $scope.aboutpara = "Sorry server error /r/n عفوا تعذر الاتصال بالخادم";
            } else {
                $scope.mybranches = response.data.AllBranches;
            }
        }, function (reason) {
            $scope.brancherror = reason.data;
            console.log(reason.data);
        });
    //select branch
    $scope.selectbranch = function () {
        console.log($scope.selectedbranch);
        $scope.latitude = $scope.selectedbranch.GeoLocation.substring(0, $scope.selectedbranch.GeoLocation.search(","));
        $scope.longitude = $scope.selectedbranch.GeoLocation.substring($scope.selectedbranch.GeoLocation.search(",") + 1);
        console.log($scope.latitude);
        console.log($scope.longitude);
    };
    // get news api
    $http({
        method: "GET",
        url: apiurl + "/Api/News/GetNewsList?Lang=" + language + "&count=10&PageIndex=0"
    })
        .then(function (response) {
            console.log(response.data);
            if (response.data.IsSuccess) {
                $scope.allnews = response.data.AllNews;
            } else {
                $scope.errorallnews = "Sorry server error /r/n عفوا تعذر الاتصال بالخادم";
            }
        }, function (reason) {
            $scope.forgeterror = reason.data;
            console.log(reason.data);
        });
    // feedback
    $scope.feedback = function () {
        var data = JSON.stringify({
            "Body" : "Name: " + $scope.feedname + "<br>Email: " + $scope.feedemail + "<br>mobile: " + $scope.feedno + "<br>Message: " + $scope.feedmsg,
            "Subject" : "Feedback From Website user",
            "TO" : "ahmedammarsalah@gmail.com"
        });
        $scope.feedname = "";
        $scope.feedemail = "";
        $scope.feedno = "";
        $scope.feedmsg = "";
        $http({
            method: "POST",
            url: "http://yakensolution.cloudapp.net/SendEmail/Api/SendMail/SendMail",
            data: data
        });
    };
}]);

//aboutCtrl js
mainApp.controller("aboutCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    // language is AR or EN
    console.log(language);
    // get about api
    $http({
        method: "GET",
        url: apiurl + "/Api/About/GetAllAbout?Lang=" + language
    })
        .then(function (response) {
            console.log(response.data);
            if (response.data.AboutList.length === 0) {
                $scope.aboutpara = "Sorry server error /r/n عفوا تعذر الاتصال بالخادم";
            } else {
                $scope.aboutparas = response.data.AboutList;
                console.log($scope.aboutparas);
            }

        }, function (reason) {
            $scope.abouterror = reason.data;
            console.log(reason.data);
        });
}]);

//careerCtrl js
mainApp.controller("careerCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";
    // language is AR or EN
    console.log(language);
    // get Careers
    $http({
        method: "GET",
        url: apiurl + "/Api/Careers/GetCareersList"
    })
        .then(function (response) {
            console.log(response.data);
            $scope.jobs = response.data.AllCareers;
        }, function (reason) {
            console.log(reason.data);
        });
    // select job to apply for
    $scope.selectjob = function (jobID, jobTitle) {
        $scope.applyjobid = jobID;
        $scope.applyjobtitle = jobTitle;
    };
    //send job email
    $scope.sendmail = function () {
        var data = JSON.stringify({
            "Body" : "Job ID: " + $scope.applyjobid + "<br>Job Title: " + $scope.applyjobtitle + "<br>Applicant Name: " + $scope.applyname + "<br>Applicant Email: " + $scope.applyemail + "<br>Cover letter: " + $scope.applymsg + "<br>Mobile Number: " + $scope.applymob,
            "Subject" : "HR Job ID:" + $scope.applyjobid + "(" + $scope.applyjobtitle + ")",
            "TO" : "ahmedammarsalah@gmail.com"
        });
        $('.bs-example2-modal').modal("hide");
        $http({
            method: "POST",
            url: "http://yakensolution.cloudapp.net/SendEmail/Api/SendMail/SendMail",
            data: data
        });
    };
}]);