'use strict';

angular
    .module('myApp.user.widgets',[])
    .directive('userPicker', userPicker);

function userPicker() {
    return {
        restrict: 'E',
        scope: {
            'users': '=',
            'model': '='
        },
        link: function($scope, $element, $attrs, $controls){
            //$scope.model='test';

            function formatUser (user) {
                if (user.loading) return user.name;
                //console.log(user);
                //if (!user.id) { return user.name; }

                var markup = "<img src='"+user.element.dataset.avatarUrl+"' /> <div>"+user.text+"</div>";
                //
                //if (repo.loading) return repo.text;
                //
                //var markup = "<div class='select2-result-repository clearfix'>" +
                //    "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
                //    "<div class='select2-result-repository__meta'>" +
                //    "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
                //
                //if (repo.description) {
                //    markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
                //}
                //
                //markup += "<div class='select2-result-repository__statistics'>" +
                //    "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
                //    "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
                //    "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
                //    "</div>" +
                //    "</div></div>";

                return markup;
            }

            function formatState (state) {
                if (!state.id) { return state.name; }
                var $state = $(
                    '<span style="float: left"><img src="state.avatar_url" class="img-flag" height="10" /> ' + state.name + '</span>'
                );
                return $state;
            };

            angular.element($element[0].querySelector('select')).select2({
                //placeholder: "Select a State",
                //allowClear: true,
                placeholderOption: 'first',
                escapeMarkup: function (markup) { return markup; }, // let our custom formatter work,
                templateResult:formatUser
            })
        },
        templateUrl: 'components/user-picker.directive.html'
    };
}