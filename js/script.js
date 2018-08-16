var images = [
  'https://i.pinimg.com/236x/36/60/0f/36600f76ecbc0d2e72602150fdc5169d--holiday-calendar-amy-poehler.jpg',
  'https://i.pinimg.com/236x/36/60/0f/36600f76ecbc0d2e72602150fdc5169d--holiday-calendar-amy-poehler.jpg',
  'https://sasquatchbrewery.com/wp-content/uploads/2018/06/lil.jpg',
  'https://sasquatchbrewery.com/wp-content/uploads/2018/06/lil.jpg',
  'http://pixel.nymag.com/imgs/daily/vulture/2012/09/11/11-rob-lowe-parks-and-recreation.w529.h529.jpg',
  'http://pixel.nymag.com/imgs/daily/vulture/2012/09/11/11-rob-lowe-parks-and-recreation.w529.h529.jpg',
  'https://pbs.twimg.com/profile_images/854750792930045952/pjRU0P5_.jpg',
  'https://pbs.twimg.com/profile_images/854750792930045952/pjRU0P5_.jpg',
  'https://imgix.bustle.com/rehost/2016/9/13/35de865f-fb3a-4935-9ae9-86a17ae8603e.jpg',
  'https://imgix.bustle.com/rehost/2016/9/13/35de865f-fb3a-4935-9ae9-86a17ae8603e.jpg',
  'https://vignette.wikia.nocookie.net/parksandrecreation/images/e/ed/April-0.png/revision/latest?cb=20180116070637',
  'https://vignette.wikia.nocookie.net/parksandrecreation/images/e/ed/April-0.png/revision/latest?cb=20180116070637'
];
var labels = [
  'Leslie Knope',
  'Leslie Knope',
  "Li'l Sebastian",
  "Li'l Sebastian",
  'Chris Traeger',
  'Chris Traeger',
  'Ron Swanson',
  'Ron Swanson',
  'Donna Meagle',
  'Donna Meagle',
  'April Ludgate',
  'April Ludgate'
];

var flipped = [];
var matched = [];
var counter = 0;

function assignCards() {
  var cardsToAssign = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card6',
    'card7',
    'card8',
    'card9',
    'card10',
    'card11',
    'card12'
  ];
  var max = 12;
  for (var i = 0; i < 12; i++) {
    var index = Math.floor(Math.random() * max);
    var card = document.getElementById(cardsToAssign[index]);
    var image = card.children[0];
    image.setAttribute('src', images[i]);
    var caption = card.children[1];
    caption.innerHTML = labels[i];
    cardsToAssign.splice(index, 1);
    max = max - 1;
  }
}

function flipCard(event) {
  var card = event.target;
  if (card.id !== 'game-board') {
    if (event.target.classList.value !== 'flipped') {
      flipped.push(card);
      var features = card.children;
      for (var i = 0; i < features.length; i++) {
        features[i].classList.add('flipped');
      }
      counter++;
    }
  }
  scoreBoard.children[1].innerHTML = 'Clicks: ' + counter;
}

function hideCards() {
  flipped.forEach(function(item) {
    item.children[0].classList.remove('flipped');
    item.children[1].classList.remove('flipped');
  });
}

function hideAllCards() {
  hideCards();
  matched.forEach(function(item) {
    item.children[0].classList.remove('flipped');
    item.children[1].classList.remove('flipped');
  });
}

function determineMatch(event) {
  var card = event.target;
  if (card.children[1].innerHTML === flipped[0].children[1].innerHTML) {
    matched.push(flipped[0]);
    matched.push(event.target);
    flipped = [];
  } else {
    setTimeout(function() {
      hideCards();
      flipped = [];
    }, 2000);
  }
}

window.addEventListener('load', function() {
  assignCards();
  var scoreBoard = document.getElementById('scoreBoard');

  var newGameButton = document.getElementById('newGame');
  newGameButton.addEventListener('click', function() {
    assignCards();
    hideAllCards();
    flipped = [];
    matched = [];
    counter = 0;
    scoreBoard.children[1].innerHTML = 'Clicks: ';
  });

  var gameBoard = document.getElementById('game-board');
  gameBoard.addEventListener('click', function(event) {
    //ADD: if event.target is a card and is not already flipped
    flipCard(event);
    if (flipped.length > 1) {
      determineMatch(event);
    }
  });
});
