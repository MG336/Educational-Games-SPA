export default count;

function count(){
    addGame2();
   let container = document.getElementById('game2Box');
    let random;
   let saveRandom = new Set();
    
   function randomNum(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

function addApple(){
       let imgUrl;
       random = randomNum(1, 10);
       container.innerHTML = '';
       
       while(saveRandom.has(random)){
           random = randomNum(1, 10);
            if(saveRandom.size == 10){
                saveRandom.clear();
                break;
            }
        }
        saveRandom.add(random);

        for(let i = 1; i <= random; i++){
            imgUrl = require(`../images/game01/fruits/005.png`);
            container.innerHTML += `<img class="imgApple" src="${imgUrl}">`;
        }
}

function checkAnswer() {
    if(game2__answer.value == '') return
    function showMessage(value){
        
        if (value == random) {
            message.children[0].classList.add('message__box--approved');
        }else {
            message.children[0].classList.add('message__box--reject');
        }
        message.classList.add('message--show');
        message.children[0].classList.add('message__box--animationStart');

        (()=>{
            let counter = 0;
            message.children[0].addEventListener('transitionend',(e)=>{
                if(e.propertyName == 'opacity'){
                    counter++;
                    message.children[0].classList.remove('message__box--animationStart');

                    if(counter === 2){
                        counter = 0;
                        message.classList.remove('message--show');
                        message.children[0].classList.remove('message__box--reject');
                        message.children[0].classList.remove('message__box--approved');
                        if(value == random) addApple();
                    }
                }
            })
        })()
    } 
    message.children[0].classList.remove('message__box--animationStart');
    showMessage(game2__answer.value);
}


function addGame2(){
    let main = document.querySelector('.main');
    main.innerHTML = `
    <section class="game main__game game2" id="section">
            <h2 class="game__title">Count</h2>
            <div class="game__task">
                <p class="basicText">How many apples?</p>
            </div>
            <div class="game2__con" >
                <div class="game2__box" id="game2Box"></div>
                <input class="game2__answer" id="game2__answer" type="number" min="1" max="10" required></input>
                <button class="game2__btn game__btn--l btn" id="game2Btn" type="button">Сheck</button>
            </div>
            <div class="game__modal game2__modal">
                <div class="game__modalContant game2__modalContant">
                    <img class="game2__resultIcons" id="game2ResultIcons" >
                </div>
            </div>
    </section>
    `
}

game2Btn.addEventListener('click',checkAnswer);
addApple(); 
checkAnswer();
}
 
