// import 'normalize.css'
// import "../scss/style.scss"
import './styles/main.scss';
// import "./index.html";
import img01 from "./images/game01/fruits/001.png";


//---------------GAME------------------------------

function game(){
    const imgBox = document.querySelector('.game__imgBox');
    const gameContainer = document.querySelector('.game');
    var shiftImg_Y;
    var shiftImg_X;
    var shiftImg_X_Right;
    var shiftImg_Y_bottom;
    var gameContainerY;
    var gameContainerX;
    var target;

    let previousTarget;
    let curentTarget;
    
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
            
            if(game__images.children.length != 0){
                modalBox('notСompleted');
            }else {
                if(fruit.querySelector('[data-type=vegetable]')) {
                    modalBox('lost')
                    return
                }
                if(vegetable.querySelector('[data-type=fruit]')) {
                    modalBox('lost')
                    return
                }
                modalBox('win');
            }
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
    checkResult()
    

    function createImgUrl(){
        let imagesUrl = createArrayFromImgUrl();
        imagesUrl = shuffleArr(imagesUrl);
        

        function createArrayFromImgUrl(){
            let fruit = [], vegetable = [], fruitAndVeg = [], imgUrl;
            for (let i = 1; i <= 6; i++){
                imgUrl = require(`./images/game01/fruits/00${i}.png`);
                fruit.push(
                    '<div class = "game__imgBox" data-type="fruit">'+
                    `<img class="game__img" src=${imgUrl}></div>`
        
                    );
                imgUrl = require(`./images/game01/vegetables/00${i}.png`);
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

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        function creatImgElements(selector){
            
            selector = document.querySelector('.'+selector);
            selector.innerHTML = '';
            selector.innerHTML= createArrayFromImgUrl().join('')
            // selector.innerHTML = `<img src = ${img01}></img>`
            // let img = require("./images/game01/fruits/001.png")
            // selector.innerHTML = `<img src = ${img}>`;
        }

        return creatImgElements('game__images')
    }

    createImgUrl()


      
           
        
    //  function setImg (selector){
    //     selector = document.querySelector('.'+selector);
    //     selector.innerHTML = '';
    //     // selector.append([...createImgUrl()])
    // }

    // setImg('game__images');
    
}
game()