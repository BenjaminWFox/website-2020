(function(){
  angular.module('values', [
  ]);
})();

(function(){
	'use strict';
	angular.module('values')

	.directive('resize', ['$window', function ($window) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs){
            scope.width = $window.innerWidth;
            function onResize(){
                // uncomment for only fire when $window.innerWidth change   
                // if (scope.width !== $window.innerWidth)
                {
                    scope.width = $window.innerWidth;
                    console.log(document.getElementById('nav').clientHeight);
                    document.getElementById('body').style.paddingTop = document.getElementById('nav').clientHeight + 'px';
                    scope.$digest();
                    console.log('resising');
                }
            };

            function cleanUp() {
                angular.element($window).off('resize', onResize);
            }

            angular.element($window).on('resize', onResize);
            angular.element($window).on('load', onResize);
            scope.$on('$destroy', cleanUp);

    }
}])
	.controller('ValueItemCtrl', ['$scope', 'AppData', function($scope, AppData){
		/*$scope.isItemSelected = function(p_item) {
			console.log('running');
			if($scope.$parent.currentPhase.chosenValues.indexOf(p_item) !== -1) {
				console.log('in if');
				return true;
			}
		}*/
	}])
	.controller('ValuesCtrl', ['$scope', 'AppData', function($scope, AppData){
		$scope.phaseOne = new appPhase(1, 15, false);
		$scope.phaseTwo = new appPhase(2, 10, true);
		$scope.phaseThree = new appPhase(3, 6, true);
		$scope.phaseFour = new appPhase(4, 3, true);

		$scope.appPhases = [$scope.phaseOne, $scope.phaseTwo, $scope.phaseThree, $scope.phaseFour]

		$scope.currentPhase = $scope.appPhases[0];

		$scope.valuesArray = AppData.values;
		$scope.totalValues = $scope.valuesArray.length;
		$scope.selectedArray = new Array(0);
		$scope.totalValuesSelected = $scope.selectedArray.length;

		$scope.allowSelection = true;

		$scope.addSelectedItem = function(p_item) {
			if($scope.allowSelection) {
				if(typeof p_item.selected === 'undefined' || typeof p_item.selected === null) {
					p_item.selected = false;
				}

				if($scope.currentPhase.chosenValues.indexOf(p_item) === -1) {
					if($scope.currentPhase.chosenValues.length < $scope.currentPhase.requiredSelections || 
						$scope.currentPhase.exactSelectionsRequired === false) {
						$scope.currentPhase.chosenValues.push(p_item);
						p_item.selected = !p_item.selected;
					}

				} else {
					$scope.currentPhase.chosenValues.splice($scope.currentPhase.chosenValues.indexOf(p_item), 1);
					p_item.selected = !p_item.selected;
				}

				console.log('addSelectedItem', p_item.label, p_item.selected);

				$scope.totalValuesSelected = $scope.currentPhase.chosenValues.length;
			}
		}

		$scope.showNextStep = function() {
			console.log('showNextStep');

			if($scope.currentPhase.chosenValues.length === $scope.currentPhase.requiredSelections || 
					$scope.currentPhase.exactSelectionsRequired === false &&
					$scope.currentPhase.chosenValues.length >= $scope.currentPhase.requiredSelections) {
				return true;
			}
		}

		$scope.gotoNextStep = function() {
			console.log('gotoNextStep');

			$scope.valuesArray = $scope.currentPhase.chosenValues.sort(function(a, b){
				var nameA = a.label.toUpperCase(); // ignore upper and lowercase
				var nameB = b.label.toUpperCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}

				// names must be equal
				return 0;
			});


			if($scope.currentPhase.phaseNumber > 1) {
				
				var previousPhase = $scope.currentPhase.phaseNumber - 1;
				
				for(var i=0;i<$scope.currentPhase.chosenValues.length;++i) {
					var indexCheck = $scope.appPhases[previousPhase-1].chosenValues.indexOf($scope.currentPhase.chosenValues[i]);
					if( indexCheck !== -1) {
						$scope.appPhases[previousPhase-1].chosenValues.splice(indexCheck, 1);
						/*console.log('Found match', $scope.currentPhase.chosenValues[i])*/
					}
				}
			}

			if($scope.currentPhase.phaseNumber < $scope.appPhases.length) {
				$scope.currentPhase = $scope.appPhases[$scope.currentPhase.phaseNumber];
				$scope.resetSelected();	
			} else if ($scope.currentPhase.phaseNumber === $scope.appPhases.length) {
				$scope.allowSelection = false;
				$scope.resetSelected();
			}
		}

		$scope.resetSelected = function() {
			console.log('resetSelected');

			$scope.totalValuesSelected = 0;
			for(var i = 0;i<$scope.valuesArray.length;++i) {
				$scope.valuesArray[i].selected = false;
			}
		}

		function appPhase(p_phaseNumber, p_requiredSelections, p_exactSelectionsRequired) {
			this.phaseNumber = p_phaseNumber;
			this.requiredSelections = p_requiredSelections;
			this.exactSelectionsRequired = p_exactSelectionsRequired;
			this.chosenValues = new Array(0);
		}
	}])

	.value('AppData', {
		'values': [
			{label:'Acceptance'},
			{label:'Accomplishment'},
			{label:'Accountability'},
			{label:'Accuracy'},
			{label:'Achievement'},
			{label:'Acquisition'},
			{label:'Adventure'},
			{label:'Alignment'},
			{label:'Altruism'},
			{label:'Ambition'},
			{label:'Amusement'},
			{label:'Assertion'},
			{label:'Assistance'},
			{label:'Attractiveness'},
			{label:'Authenticity'},
			{label:'Awareness'},
			{label:'Balance'},
			{label:'Beauty'},
			{label:'Being the Best'},
			{label:'Belonging'},
			{label:'Blissfulness'},
			{label:'Boldness'},
			{label:'Calmness'},
			{label:'Carefulness'},
			{label:'Caution'},
			{label:'Challenge'},
			{label:'Charity'},
			{label:'Cheerfulness'},
			{label:'Childrearing'},
			{label:'Clear-mindedness'},
			{label:'Commitment'},
			{label:'Community'},
			{label:'Compassion'},
			{label:'Competitiveness'},
			{label:'Comprehending'},
			{label:'Conformity'},
			{label:'Connection'},
			{label:'Consciousness'},
			{label:'Conscientiousness'},
			{label:'Consideration'},
			{label:'Consistency'},
			{label:'Constancy'},
			{label:'Contentment'},
			{label:'Continuous Improvement'},
			{label:'Control'},
			{label:'Cooperation'},
			{label:'Correctness'},
			{label:'Courage'},
			{label:'Courtesy'},
			{label:'Creativity'},
			{label:'Curiosity'},
			{label:'Danger'},
			{label:'Daring'},
			{label:'Decisiveness'},
			{label:'Delight'},
			{label:'Democracy'},
			{label:'Dependability'},
			{label:'Determination'},
			{label:'Development'},
			{label:'Devoutness'},
			{label:'Dignity'},
			{label:'Diligence'},
			{label:'Directness'},
			{label:'Discipline'},
			{label:'Discovery'},
			{label:'Discretion'},
			{label:'Discrimination'},
			{label:'Diversity'},
			{label:'Dynamism'},
			{label:'Economy'},
			{label:'Education'},
			{label:'Effectiveness'},
			{label:'Efficiency'},
			{label:'Elegance'},
			{label:'Emotional Wellbeing'},
			{label:'Empathy'},
			{label:'Encouragement'},
			{label:'Energy'},
			{label:'Enjoyment'},
			{label:'Enlightenment'},
			{label:'Entertainment'},
			{label:'Enthusiasm'},
			{label:'Environment'},
			{label:'Equality'},
			{label:'Excellence'},
			{label:'Ethics/Ethicalness'},
			{label:'Excellence'},
			{label:'Excitement'},
			{label:'Experience'},
			{label:'Expertise'},
			{label:'Exploration'},
			{label:'Expressiveness'},
			{label:'Exquisiteness'},
			{label:'Fairness'},
			{label:'Faith'},
			{label:'Fame'},
			{label:'Family'},
			{label:'Family-orientedness'},
			{label:'Feeling Good'},
			{label:'Fidelity'},
			{label:'Fitness'},
			{label:'Fluency'},
			{label:'Focus'},
			{label:'Freedom'},
			{label:'Friendship'},
			{label:'Fun'},
			{label:'Generosity'},
			{label:'Goodness'},
			{label:'Grace'},
			{label:'Gratitude'},
			{label:'Growth'},
			{label:'Happiness'},
			{label:'Hard Work'},
			{label:'Harmony'},
			{label:'Health'},
			{label:'Helping Society'},
			{label:'Holiness'},
			{label:'Honesty'},
			{label:'Honor'},
			{label:'Hope'},
			{label:'Humility'},
			{label:'Imagination'},
			{label:'Improvement'},
			{label:'Independence'},
			{label:'Influence'},
			{label:'Information'},
			{label:'Ingenuity'},
			{label:'Inner Harmony'},
			{label:'Inner Peace'},
			{label:'Innovation'},
			{label:'Inquisitiveness'},
			{label:'Insightfulness'},
			{label:'Inspiration'},
			{label:'Instruction'},
			{label:'Integrity'},
			{label:'Intellectual Status'},
			{label:'Intelligence'},
			{label:'Intuition'},
			{label:'Inventiveness'},
			{label:'Joy'},
			{label:'Justice'},
			{label:'Kindness'},
			{label:'Knowledge'},
			{label:'Laughter'},
			{label:'Leadership'},
			{label:'Learning'},
			{label:'Legacy'},
			{label:'Love'},
			{label:'Loyalty'},
			{label:'Magnificence'},
			{label:'Making a Difference'},
			{label:'Mastery'},
			{label:'Merit'},
			{label:'Merriment'},
			{label:'Nobility'},
			{label:'Obedience'},
			{label:'Observation'},
			{label:'Openness'},
			{label:'Optimism'},
			{label:'Order'},
			{label:'Organization'},
			{label:'Originality'},
			{label:'Patriotism'},
			{label:'Peace'},
			{label:'Peacefulness'},
			{label:'Perception'},
			{label:'Perfection'},
			{label:'Piety'},
			{label:'Play'},
			{label:'Pleasure'},
			{label:'Positive Attitude'},
			{label:'Positivity'},
			{label:'Power'},
			{label:'Practicality'},
			{label:'Preparedness'},
			{label:'Presence'},
			{label:'Professionalism'},
			{label:'Proficiency'},
			{label:'Prudence'},
			{label:'Punctuality'},
			{label:'Quality'},
			{label:'Radiance'},
			{label:'Recognition'},
			{label:'Relationships'},
			{label:'Relaxation'},
			{label:'Reliability'},
			{label:'Religion'},
			{label:'Resilience'},
			{label:'Resourcefulness'},
			{label:'Respect'},
			{label:'Responsibility'},
			{label:'Responsiveness'},
			{label:'Restraint'},
			{label:'Results'},
			{label:'Rigor'},
			{label:'Risk'},
			{label:'Safety'},
			{label:'Schooling'},
			{label:'Security'},
			{label:'Self-actualization'},
			{label:'Self-awareness'},
			{label:'Self-control'},
			{label:'Self-reliance'},
			{label:'Self-worth'},
			{label:'Selflessness'},
			{label:'Sensations'},
			{label:'Sensitivity'},
			{label:'Sensuality'},
			{label:'Serenity'},
			{label:'Service'},
			{label:'Shrewdness'},
			{label:'Simplicity'},
			{label:'Speed'},
			{label:'Spirituality'},
			{label:'Spontaneity'},
			{label:'Stability'},
			{label:'Stimulation'},
			{label:'Strategy'},
			{label:'Strength'},
			{label:'Structure'},
			{label:'Success'},
			{label:'Superiority'},
			{label:'Support'},
			{label:'Teaching'},
			{label:'Teamwork'},
			{label:'Temperance'},
			{label:'Tenderness'},
			{label:'Thankfulness'},
			{label:'Thoroughness'},
			{label:'Thoughtfulness'},
			{label:'Timeliness'},
			{label:'Tolerance'},
			{label:'Touch'},
			{label:'Traditionalism'},
			{label:'Tranquility'},
			{label:'Trust'},
			{label:'Trustworthiness'},
			{label:'Truth'},
			{label:'Truthfulness'},
			{label:'Understanding'},
			{label:'Uniqueness'},
			{label:'Unity'},
			{label:'Usefulness'},
			{label:'Vision'},
			{label:'Vitality'},
			{label:'Wealth'},
			{label:'Wholeness'},
			{label:'Winning'},
			{label:'Wisdom'}
		]
	})
})();