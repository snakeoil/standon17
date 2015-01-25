var Shuffle = require('shuffle')
var _ = require('lodash')

function Deck(numOfDecks) {
  numOfDecks = numOfDecks || 10;

  var deck = _.times(numOfDecks, function() {
          return Shuffle.shuffle().cards
      })
      .reduce(Function.apply.bind([].concat), [])

  this.cards = Shuffle.shuffle({deck: deck})
}

Deck.prototype.dealHand = function() {
  return this.cards.draw(2)
}

Deck.prototype.hit = function(hand) {
  return hand.concat(this.cards.draw())
}


module.exports = Deck