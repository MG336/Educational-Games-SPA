export default subtraction;

function subtraction(){
    addGame();
    let random;
    let modal = document.querySelector('.game__modal');
    let saveRandom = new Set;
    let leftItems;
    let rigtItems;

    function randomNum(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function addApple(){
        const boxLeft = document.querySelector('.game2__boxLeft');
        const boxRigh = document.querySelector('.game2__boxRight');
        let imgUrl;

      

        random = randomNum(2, 11);
        
        

        while(saveRandom.has(random)){
            random = randomNum(2, 11);
            console.log(random)
             if(saveRandom.size == 10){
                 saveRandom.clear();
                 break;
             }
         }

         saveRandom.add(random);
         leftItems = random - randomNum(1, random-1);
         rigtItems = random - leftItems;
         
         if(leftItems < rigtItems){
            [leftItems, rigtItems] = [rigtItems, leftItems];
         }
  
         function addImg(amountImg, container){
            container.innerHTML = '';
            for(let i = 1; i <= amountImg; i++){
                imgUrl = require(`../images/game01/fruits/005.png`);
                container.innerHTML += `<img class="imgApple" src="${imgUrl}">`;
            }
         }

         addImg(leftItems, boxLeft);
         addImg(rigtItems, boxRigh);   
    }
    
  

    function checkAnswer() {
        if(game2__answer.value == '') return
        function showMessage(value){
            
            if (value == leftItems - rigtItems) {
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
                            if(value == leftItems - rigtItems) {
                                game2__answer.value = '';
                                addApple()
                            };
                        }
                    }
                })
            })()
        } 
        message.children[0].classList.remove('message__box--animationStart');
        
        showMessage(game2__answer.value);
    }


    function addGame(){
        let main = document.querySelector('.main');
        main.innerHTML = `
        <section class="game main__game game2" id="section">
            <h2 class="game__title">Subtraction</h2>
            <div class="game__task">
                <p class="basicText">How many apples are left?</p>
            </div>
            <div class="game2__con game3-con">
                
                    <div class="game2__operations game2__box">
                        <div class="game2__boxLeft"></div>
                        <div class="game2__mathSimvols game2__simvolMinus"></div>
                        <div class="game2__boxRight"></div>
                    </div>
              
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
    addApple()
}
