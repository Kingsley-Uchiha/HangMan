const keypad = document.querySelector('.keyboard');

const getWords = async () => {
      const data = await fetch("./all.json");
      const words = await data.json();
      console.log(words);

      newWord(words);
}

const newWord = (words) => {
      const guessWord = document.querySelector('.word h1');
      // const word = words[Math.floor(Math.random() * words.length)];
      let word = wordCheck(words[Math.floor(Math.random() * words.length)]);
      while (!word) {
            word = wordCheck(words[Math.floor(Math.random() * words.length)]);
      }
      // ----
      console.log(word);
      for (i = 0; i < word.length; i++) {
            guessWord.textContent += "-";
            if (i != word.length - 1) {
                  guessWord.textContent += ' ';
            }
      }

      checkLetters(word, guessWord);
}

// ----
const wordCheck = (word) => {
      if (word.length > 3 && word.length < 8)
            return word;
      else return false;
}

const arrangeKeys = async () => {
      const data = await fetch("./alpha.json");
      const alphas = await data.json();
      for (i = 0; i < alphas.length; i++) {
            keypad.innerHTML += `<button value="${alphas[i]}">${alphas[i].toUpperCase()}</button>`;
      }
}

const checkLetters = (word, guessWord) => {
      const end = document.querySelector('.endgame h1.end');
      const endGame = document.querySelector('.endgame');
      let lives = 6;
      const hLives = document.querySelector('.lives');

      const mWord = word.split('');
      console.log(mWord);
      const gWord = guessWord.textContent.split(' ');
      console.log(gWord);

      const animeImg = document.querySelector('.img img');
      let objPosition = 0; // Remove 400 every loop
      let frames = -800;
      let win;

      const myInterval = setInterval(() => {
            if (!win) animeImg.src = `./images/${lives}.png`;
            else {
                  animeImg.src = `./images/win.png`;
                  frames = -300;
                  endGame.classList.remove('none');
                  end.classList.add('win');
                  end.textContent = "You Win!";
            }

            animeImg.style.objectPosition = `${objPosition}px top`;

            if (lives === 5) frames = -2400
            else if (lives === 4) frames = -800
            else if (lives === 3) frames = -400
            else if (lives === 2) frames = -200
            else if (lives === 0) frames = 0

            if (objPosition <= frames) {
                  objPosition = 0;
            } else {
                  objPosition -= 382;
            }
      }, 100)

      keypad.addEventListener('click', e => {
            const choice = e.target.value;
            console.log(choice);
            let bool = false;
            console.log(e.target);

            if (e.target.nodeName === 'BUTTON') {
                  for (i = 0; i < mWord.length; i++) {
                        if (mWord[i] === choice) {
                              e.target.classList.add('right');
                              gWord[i] = choice;
                              console.log(gWord);
                              console.log(mWord);
                              guessWord.textContent = gWord.join(' ');
                              bool = true;

                              if (mWord.join('') === gWord.join('')) {
                                    win = true;
                                    console.log('win');
                              }
                        } else {
                              if (i === mWord.length - 1 && !bool) {
                                    e.target.classList.add('wrong');
                                    console.log("WRONG");
                                    lives--;
                                    hLives.textContent = lives;

                                    if (lives <= 0) {
                                          endGame.classList.remove('none');
                                          end.classList.add('lose');
                                          end.textContent = "You Lose!";
                                    }
                              }
                        }
                  };
            }
      })
}

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
      open(document.URL);
      close();
})

getWords();
arrangeKeys();