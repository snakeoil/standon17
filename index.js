/* jshint asi: true */
var _ = require('lodash')
var Shuffle = require('shuffle')

function Deck() {
    this.players = {}
    this.dealer = []

    var deck = []
    _.times(10, function() {
        deck = deck.concat(Shuffle.shuffle().cards)
    })

    this.blackjackDeck = Shuffle.shuffle({deck: deck})

}


Deck.prototype.unicard = function unicard(card) {
    return card.toShortDisplayString()
}

Deck.prototype.handTotal = function handTotal(hand, total){
    if (hand.length === 0) return total
    if (!total) total = 0

    card = hand[0]

    if(card.sort === 14) { // Ace
        var fullValue = this.handTotal(_.rest(hand), total + 11)
        if(fullValue <= 21) {
            return fullValue
        } else {
            return this.handTotal(_.rest(hand), total + 1)
        }
    } else {
        return this.handTotal(_.rest(hand), total + Math.min(card.sort, 10))
    }
}

Deck.prototype.checkBust = function checkBust(player) {
    return this.handTotal(player) > 21
}

Deck.prototype.hit = function hit(player) {
    blackjackDeck.deal(1, players[player])
    return this.checkBust(players[player])
}

Deck.prototype.dealerTurn = function dealerTurn() {
    if (this.checkBust(this.dealer)) { // Dealer Bust
        // Handle bust
        console.log('dealer busts')
    } else if (this.handTotal(this.dealer) >= 17) { // Dealer stands
        this.compareHands()
    } else { // Dealer hits
        blackjackDeck.deal(1, [this.dealer])
        this.dealerTurn()
    }
}

Deck.prototype.compareHands = function compareHands() {
    if (this.checkBust(dealer)) {
        return players.length
    }

    var wins = 0,
        pushes = 0,
        losses = 0

    for (var playerName in players) {
        var playerScore = this.handTotal(player)
        var dealerScore = this.handTotal(dealer)

        if (playerScore > dealerScore) {
            wins++
        } else if (playerScore < dealerScore) {
            losses++
        } else {
            pushes++
        }
    }
}


module.exports = Deck