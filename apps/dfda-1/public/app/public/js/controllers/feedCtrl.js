angular.module('starter').controller('FeedCtrl', ["$state", "$scope", "$rootScope", "$http", "qmService", "$stateParams", "$timeout",
    function($state, $scope, $rootScope, $http, qmService, $stateParams, $timeout){
        $scope.controller_name = "FeedCtrl";
        qmService.navBar.setFilterBarSearchIcon(false);
        $scope.state = {
            cards: [],
            cardButtonClick: function(card, button, ev){
                qmLog.debug("card", card);
                qmLog.debug("button", button);
                card.selectedButton = button;
                if(clickHandlers[button.action]){
                    clickHandlers[button.action](card, ev);
                }else{
                    qmService.actionSheets.handleCardButtonClick(button, card);
                }
            },
            openActionSheetForCard: function(card){
                var destructiveButtonClickedFunction = cardHandlers.removeCard;
                qmService.actionSheets.openActionSheetForCard(card, destructiveButtonClickedFunction);
            },
            refreshFeed: function(){
                qm.feed.getFeedFromApi({}, function(cards){
                    hideLoader();
                    cardHandlers.getCards(cards);
                });
            }
        };
        $scope.$on('$ionicView.beforeEnter', function(e){
            if (document.title !== "Feed") {document.title = "Feed";}
            qmLog.debug('beforeEnter state ' + $state.current.name);
            qmService.showFullScreenLoader();
            if($stateParams.hideNavigationMenu !== true){
                qmService.navBar.showNavigationMenuIfHideUrlParamNotSet();
            }
        });
        $scope.$on('$ionicView.enter', function(e){
            if(!qm.getUser()){
                qmService.login.sendToLoginIfNecessaryAndComeBack("No user in " + $state.current.name);
                return;
            }
            cardHandlers.getCards();
            if(!$scope.state.cards || !$scope.state.cards.length){
                qmService.showFullScreenLoader();
            }
        });
        $rootScope.$on('getCards', function(){
            qmLog.info('getCards broadcast received..');
            cardHandlers.getCards();
        });
        var cardHandlers = {
            addCardsToScope: function(cards){
                $scope.safeApply(function(){
                    $scope.state.cards = cards;
                });
            },
            removeCard: function(card){
                card.hide = true;
                qm.feed.deleteCardFromLocalForage(card, function(){
                    cardHandlers.getCards();
                });
                qm.feed.undoFunction = function(){
                    card.hide = false;
                    qm.feed.addToFeedAndRemoveFromFeedQueue(card, cardHandlers.getCards);
                };
                var button = card.selectedButton;
                if(button.successToastText){
                    qmService.toast.showUndoToast(button.successToastText, qm.feed.undoFunction);
                }
            },
            getCards: function(cards){
                if(cards){
                    cardHandlers.addCardsToScope(cards);
                    return;
                }
                qm.feed.getFeedFromLocalForageOrApi({}, function(cards){
                    hideLoader();
                    cardHandlers.addCardsToScope(cards);
                });
            }
        };
        var clickHandlers = {
            skipAll: function(card, ev){
                qm.ui.preventDragAfterAlert(ev);
                qmService.showFullScreenLoader();
                qm.feed.postCardImmediately(card, function(cardsFromResponse){
                    cardHandlers.getCards(cardsFromResponse);
                });
                cardHandlers.removeCard(card);
                return true;
            },
            track: function(card){
                cardHandlers.removeCard(card);
                qm.feed.addToFeedQueueAndRemoveFromFeed(card);
                return true;
            }
        };
        function hideLoader(){
            qmService.hideLoader();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        }
    }]
);
