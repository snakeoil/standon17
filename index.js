/* jshint asi: true */
var _ = require('lodash')
var Shuffle = require('shuffle')
var chalk = require('chalk')

var deck = [];

_.times(10, function() {
    deck = deck.concat(Shuffle.shuffle().cards)
});

var blackjackDeck = Shuffle.shuffle({deck: deck})

function unicard(card) {
    return card.toShortDisplayString()
        .replace('C', chalk.bold.black('♣︎'))
        .replace('S', chalk.bold.black('♠︎'))
        .replace('H', chalk.red('♥︎'))
        .replace('D', chalk.red('♦︎'));
}

var players = {}
var dealer = []

function handTotal(hand, total){
    if(hand.length === 0) return total
    if(!total) total = 0;

    card = hand[0];

    if(card.sort === 14) { // Ace
        var fullValue = handTotal(_.rest(hand), total + 11)
        if(fullValue <= 21) {
            return fullValue
        } else {
            return handTotal(_.rest(hand), total + 1)
        }
    } else {
        return handTotal(_.rest(hand), total + Math.min(card.sort, 10))
    }
}

function checkBust(player) {
    return handTotal(player) > 21;
}

function hit(player) {
    blackjackDeck.deal(1, players[player])
    return checkBust(players[player]);
}

function dealerTurn() {
    if(checkBust(dealer)) { // Dealer Bust
        // Handle bust
    } else if(handTotal(dealer) >= 17) { // Dealer stands
        compareHands();
    } else { // Dealer hits
        blackjackDeck.deal(1, [dealer]);
        dealerTurn();
    }
}

function compareHands() {
    if (checkBust(dealer)) {
        return players.length
    }

    var wins = 0,
        pushes = 0,
        losses = 0

    for (var playerName in players) {
        var playerScore = handTotal(player)
        var dealerScore = handTotal(dealer)
        if (playerScore > dealerScore) {
            wins++
        } else if (playerScore < dealerScore) {
            losses++
        } else {
            pushes++
        }
    }
}
