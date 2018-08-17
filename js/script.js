var characters = [
  {
    name: 'Leslie Knope',
    image:
      'https://i.pinimg.com/236x/36/60/0f/36600f76ecbc0d2e72602150fdc5169d--holiday-calendar-amy-poehler.jpg'
  },
  {
    name: "Li'l Sebastian",
    image: 'https://sasquatchbrewery.com/wp-content/uploads/2018/06/lil.jpg'
  },
  {
    name: 'Chris Traeger',
    image:
      'http://pixel.nymag.com/imgs/daily/vulture/2012/09/11/11-rob-lowe-parks-and-recreation.w529.h529.jpg'
  },
  {
    name: 'Ron Swanson',
    image:
      'https://pbs.twimg.com/profile_images/854750792930045952/pjRU0P5_.jpg'
  },
  {
    name: 'Donna Meagle',
    image:
      'https://imgix.bustle.com/rehost/2016/9/13/35de865f-fb3a-4935-9ae9-86a17ae8603e.jpg'
  },
  {
    name: 'April Ludgate',
    image:
      'https://vignette.wikia.nocookie.net/parksandrecreation/images/e/ed/April-0.png/revision/latest?cb=20180116070637'
  },
  {
    name: 'Tom Haverford',
    image:
      'https://pbs.twimg.com/profile_images/2418094347/cqlu5np1uu5exntuh2tw_400x400.jpeg'
  },
  {
    name: 'Ben Wyatt',
    image: 'https://78.media.tumblr.com/avatar_a1ae643f88a8_128.pnj'
  },
  {
    name: 'Ann Perkins',
    image:
      'https://vignette.wikia.nocookie.net/parksandrecreation/images/3/33/Ann_Perkins.jpg/revision/latest?cb=20180116070354'
  },
  {
    name: 'Andy Dwyer',
    image:
      'https://media1.popsugar-assets.com/files/thumbor/cOfSytMg9kkTVeL72Z-DZYirnCo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/01/02/979/n/1922283/14c9c0522bc1093c_thumb_temp_image8452101420223582/i/Andy-Parks-Recreation-GIFs.jpg'
  },
  {
    name: 'Jerry Gergich',
    image: 'https://api.mbtidatabase.com/profile_images/68.png'
  }
];

var flipped = [];
var matched = [];
var counter = 0;

function assignCards() {
  var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  var characterMax = 11;
  var max = 12;

  for (var i = 0; i < 6; i++) {
    var idx = Math.floor(Math.random() * characterMax);
    var currentIndex = nums[idx];
    var currentCharacter = characters[currentIndex];
    for (var j = 0; j < 2; j++) {
      var index = Math.floor(Math.random() * max);
      var card = document.getElementById(cardsToAssign[index]);
      var image = card.children[1].children[0];
      image.setAttribute('src', currentCharacter.image);
      var caption = card.children[1].children[1];
      caption.innerHTML = currentCharacter.name;
      cardsToAssign.splice(index, 1);
      max = max - 1;
    }
    nums.splice(idx, 1);
    characterMax = characterMax - 1;
  }
}

function flipCard(event) {
  if (event.target.parentElement.classList[0] !== 'card__face') {
    var card = event.target.parentElement;
    if (card.id !== 'container' && card.id !== 'game-board') {
      if (card.classList.value !== 'flipped') {
        card.classList.add('flipped');
        flipped.push(card);
        counter++;
      }
    }
    scoreBoard.children[2].innerHTML = 'Clicks: ' + counter;
  }
}

function hideCards() {
  flipped.forEach(function(item) {
    item.classList.remove('flipped');
    item.classList.remove('flipped');
  });
  flipped = [];
}

function hideAllCards() {
  hideCards();
  matched.forEach(function(item) {
    item.classList.remove('flipped');
    item.classList.remove('flipped');
  });
}

function determineMatch(event) {
  if (
    event.target.nextElementSibling.children[1].innerHTML ===
    flipped[0].children[1].children[1].innerHTML
  ) {
    matched.push(flipped[0]);
    matched.push(event.target.parentElement);
    flipped = [];
  } else {
    setTimeout(function() {
      hideCards();
    }, 1500);
  }
}

function storeBestScore() {
  if (matched.length === 12) {
    if (!JSON.parse(localStorage.getItem('bestScore'))) {
      localStorage.setItem('bestScore', JSON.stringify(counter));
    } else if (counter < JSON.parse(localStorage.getItem('bestScore'))) {
      localStorage.setItem('bestScore', JSON.stringify(counter));
    }
  }
}

function displayScore() {
  var displayScore = document.getElementById('scoreBoard').children[1];
  var bestScore = JSON.parse(localStorage.getItem('bestScore'));
  if (bestScore === null) {
    displayScore.innerHTML = 'Best Score: ';
  } else {
    displayScore.innerHTML = 'Best Score: ' + bestScore;
  }
}

window.addEventListener('load', function() {
  assignCards();
  var scoreBoard = document.getElementById('scoreBoard');

  displayScore();

  var newGameButton = document.getElementById('newGame');
  newGameButton.addEventListener('click', function() {
    hideAllCards();
    setTimeout(function() {
      assignCards();
    }, 1000);
    flipped = [];
    matched = [];
    counter = 0;
    scoreBoard.children[2].innerHTML = 'Clicks: ';
    displayScore();
  });

  var gameBoard = document.getElementById('container');
  gameBoard.addEventListener('click', function(event) {
    if (flipped.length < 2) {
      flipCard(event);
      if (flipped.length === 2) {
        determineMatch(event);
      }
    }
    storeBestScore();
  });
});
