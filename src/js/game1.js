export default sorting;

function sorting(){
    const main = document.querySelector('.main');
    addGame();
    const imgBox = document.querySelector('.game__imgBox');
    const gameContainer = document.querySelector('.game');
    
    let shiftImg_Y;
    let shiftImg_X;
    let shiftImg_X_Right;
    let shiftImg_Y_bottom;
    let gameContainerY;
    let gameContainerX;
    let target;
    let previousTarget;
    let curentTarget;
    
    function addGame(){
        main.innerHTML = `
        <section class="game main__game">
        <h2 class="game__title">Sorting</h2>
        <div class="game__task">
            <p class="basicText">Sort all fruits and vegetables into boxes</p>
        </div>

        <div>
            <span class="game__boxTitle game__boxTitle--color1">Fruits</span> 
            <div class="game__fruits"></div>
        </div>
        <div>
            <span class="game__boxTitle game__boxTitle--color2">Vegetables</span> 
            <div class="game__vegetables"></div>
        </div>
        <div class="game__images">
        </div>
        <button class="game__btn game__btn--l btn" id="gameBtn" type="button" disabled>Сheck</button>
        <button class="game__btn game__btn--r btn btn--border" id="gameBtnReset" type="button">Reset</button>

        <div class="game__modal">
            <div class="game__modalContant">
                <span class="game__modalCloseIcon">
                    <svg width="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 14M14 2L2 14" stroke="white" stroke-opacity="0.67" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                </span>
                <span class="game__modalText"></span>
            </div>
        </div>
    </section>
    `
    }
    gameContainer.addEventListener('pointerdown',function(e){
        target = e.target.closest('.game__imgBox');
        if(!target) return
        
            target.querySelector('.game__img').ondragstart = () => false;

            target.setPointerCapture(e.pointerId);


            gameContainerY = gameContainer.getBoundingClientRect().top;
            gameContainerX = gameContainer.getBoundingClientRect().left;

            shiftImg_Y =  e.clientY - target.getBoundingClientRect().top;
            shiftImg_Y_bottom = target.getBoundingClientRect().bottom - e.clientY;
            shiftImg_X =  e.clientX - target.getBoundingClientRect().left;
            shiftImg_X_Right = target.getBoundingClientRect().right - e.clientX;

            target.addEventListener('touchstart',(e)=>{
                e.preventDefault()
            })
            target.addEventListener('touchmove',(e)=>{
                e.preventDefault()
            })
            
            target.addEventListener('pointermove',imgMove);
            target.addEventListener ('lostpointercapture',removeMove);
        
    })
            
    function imgMove(e){
        if(!this.classList.contains('game__imgBox--position')){
            this.classList.add('game__imgBox--position');
        }
        
        if(e.clientX - shiftImg_X < gameContainer.getBoundingClientRect().left ||
            e.clientX + shiftImg_X_Right > gameContainer.getBoundingClientRect().right ||
            e.clientY - shiftImg_Y < gameContainer.getBoundingClientRect().top ||
            e.clientY + shiftImg_Y_bottom > gameContainer.getBoundingClientRect().bottom
            ){
            return
        }
        
        offsetImg(e.clientX, e.clientY, shiftImg_X, shiftImg_Y, target);
        selectItemBelowImg(e);
    }

    

    function selectItemBelowImg(e){
        e.target.hidden = true;
        curentTarget = document.elementFromPoint(e.clientX, e.clientY);
        if(curentTarget) curentTarget = curentTarget.closest('.game__images, .game__fruits, .game__vegetables');
        
        if (previousTarget != curentTarget){

            if(previousTarget != null){
                previousTarget.classList.remove('game__glow');
            }
            previousTarget = curentTarget;
        }
            
        if(curentTarget){
            previousTarget.classList.add('game__glow');
        }

        e.target.hidden = false;
    }
        
    function appendSelectItem(e){
        if(curentTarget) curentTarget.append(e.target);
    }

    

    function offsetImg(pageX,pageY,shiftX,shiftY,target){
        target.style.left = (pageX - gameContainerX) - shiftX + 'px';
        target.style.top = (pageY - gameContainerY) - shiftY + 'px';
    }


    function removeMove(e){
        appendSelectItem(e)
        this.classList.remove('game__imgBox--position');
        this.style.top = '';
        this.style.left = '';
        this.removeEventListener('pointermove',imgMove);
        this.closest('.game__glow').classList.remove('game__glow');
    }


    

    function checkResult(){
        let btn = document.getElementById('gameBtn');
        let btnReset = document.getElementById('gameBtnReset');

        btn.addEventListener('click',() => {
            let fruit = document.querySelector('.game__fruits');
            let vegetable = document.querySelector('.game__vegetables');
            let game__images = document.querySelector('.game__images');
            
            if(game__images.children.length != 0) return
                // modalBox('notСompleted');
                
            
            if(fruit.querySelector('[data-type=vegetable]')) {
                modalBox('lost')
                return
            }
            if(vegetable.querySelector('[data-type=fruit]')) {
                modalBox('lost')
                return
            }
                modalBox('win');
            
        })

        btnReset.addEventListener('click',() => {
            let gameImgBoxs = document.querySelectorAll('.game__imgBox');
            let gameImages = document.querySelector('.game__images');

            gameImages.innerHTML = '';
            gameImages.append(...gameImgBoxs);
        })  
    }
    
    function modalBox(result){
        const modal = document.querySelector('.game__modal');
        const close = modal.querySelector('.game__modalCloseIcon'); 
        const modalText = modal.querySelector('.game__modalText');

        modal.classList.add('game__modal--show');

        close.onclick = function(){
            modal.classList.remove('game__modal--show');
            document.body.classList.remove('noscroll');
        }

        document.body.classList.add('noscroll');

        switch(result){
            case 'win':
                modalText.innerHTML = 'Excellent';
                break;
            case 'lost':
                modalText.innerHTML = 'Try again';
                break;
            case 'notСompleted':
                modalText.innerHTML = 'You have not placed all the objects';
                break;
        }
    }

    function checkAnswer(){
        // if(game2__answer.value == '') return
        let fruit = document.querySelector('.game__fruits');
        let vegetable = document.querySelector('.game__vegetables');
        let btn = document.getElementById('gameBtn');
        let btnReset = document.getElementById('gameBtnReset');
        let game__images = document.querySelector('.game__images');
        
        function showModal(){
            if(game__images.children.length != 0) return
            if (fruit.querySelector('[data-type=vegetables]')){
                message.children[0].classList.add('message__box--reject');
            }
            else if (vegetable.querySelector('[data-type=fruit]')) {
                message.children[0].classList.add('message__box--reject');
            }
            else {
                message.children[0].classList.add('message__box--approved');
            }



            message.classList.add('message--show');
            
            setTimeout(()=>{
                message.children[0].classList.remove('message__box--reject');
                message.children[0].classList.remove('message__box--approved');
                message.classList.remove('message--show');
            },1000); 
        }
        function gameImagesCheck(){
           console.log (game__images)
           let observer = new MutationObserver(()=>{
                console.log(121111)
                if(game__images.children.length === 0){
                    btn.removeAttribute('disabled')
                }else {  
                    btn.hasAttribute("disabled") || btn.setAttribute("disabled","true")
                } 
                
           });
           observer.observe(game__images, {
            childList: true
           })
           
        }
        gameImagesCheck()
        function showMessage(value){
            if(game__images.children.length != 0){
                return
            } 
            
            if (fruit.querySelector('[data-type=vegetables]')){
                message.children[0].classList.add('message__box--reject');
            }
            else if (vegetable.querySelector('[data-type=fruit]')) {
                message.children[0].classList.add('message__box--reject');
            }
            else {
                message.children[0].classList.add('message__box--approved');
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
                        }
                    }
                })
            })()
        } 

        btn.addEventListener('click',showMessage);

        btnReset.addEventListener('click',() => {
            let gameImgBoxs = document.querySelectorAll('.game__imgBox');
            let gameImages = document.querySelector('.game__images');

            gameImages.innerHTML = '';
            gameImages.append(...gameImgBoxs);
        }) 

    }

    // checkResult()
    checkAnswer()

    function createImgUrl(){
        let imagesUrl = createArrayFromImgUrl();
        imagesUrl = shuffleArr(imagesUrl);
        

        function createArrayFromImgUrl(){
            let fruit = [], vegetable = [], fruitAndVeg = [], imgUrl;
            for (let i = 1; i <= 6; i++){
                imgUrl = require(`../images/game01/fruits/00${i}.png`);
                fruit.push(
                    '<div class = "game__imgBox" data-type="fruit">'+
                    `<img class="game__img" src=${imgUrl}></div>`
        
                    );
                imgUrl = require(`../images/game01/vegetables/00${i}.png`);
                vegetable.push(
                    '<div class = "game__imgBox" data-type="vegetables">'+
                    `<img class="game__img" src=${imgUrl}></div>`
                    );
                }
                fruitAndVeg = fruit.concat(vegetable);
                return fruitAndVeg
            }
                    


        function shuffleArr(array){
            let currentIndex = array.length,  randomIndex;

            while (currentIndex != 0) {


                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        function creatImgElements(selector){
            selector = document.querySelector('.'+selector);
            selector.innerHTML = '';
            selector.innerHTML= imagesUrl.join('')
        }
            

        return creatImgElements('game__images')
    }

    createImgUrl()   
}

