// import 'normalize.css'
import './styles/main.scss';


function dragDrop(){
    let ball = document.querySelector('.fild__ball');
    // ball.ondragstart = function() {
    //     return false;
    //   };
    ball.addEventListener('pointerdown',(e)=>{
        
 

        let shiftX = e.clientX - ball.getBoundingClientRect().left;
        let shiftY = e.clientY - ball.getBoundingClientRect().top;

        document.body.append(ball)
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;

        moveAt(e.pageX, e.pageY);

        function moveAt(pageX, pageY) {
            ball.style.left = pageX - shiftX  + 'px';
            ball.style.top = pageY - shiftY + 'px';
        }

        let curentDrop = null;

        function onMouseMove(e) {
           
            moveAt(e.pageX, e.pageY);

            ball.hidden = true;
            let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
            ball.hidden = false;
        
            if(!elemBelow) return;

            let dropBelow = elemBelow.closest('.fild__target');

            if(curentDrop != dropBelow){
                // dropBelow.style.background = 'red';
                // curentDrop = elemBelow;

                if(curentDrop){
                    curentDrop.style.background = '';
                }
                curentDrop = dropBelow;
                if(curentDrop){
                    dropBelow.style.background = 'red';
                }
            }
        }

        document.addEventListener('pointermove', onMouseMove);

        // ball.onmouseup = function() {
        //     document.removeEventListener('mousemove', onMouseMove);
        //     ball.onmouseup = null;
        //   };


        // function remove(){
        //     document.removeEventListener('mousemove',onMouseMove);
        //     ball.removeEventListener('mouseup', remove);
        // }
        // ball.addEventListener('mouseup',remove);
    })
}

function onMouseMove(e){
    let target = document.querySelector('.fild__target');
    target.addEventListener('mouseover',(e)=>{
        target.style.background = 'red'
    })
    target.addEventListener('mouseout',(e)=>{
        target.style.background = ''
    })
        
}

onMouseMove()
dragDrop()

//-----------------------------
function slider (){
    let thumb = document.querySelector('.slider__runner');
    let slider = document.querySelector('.slider');
    let line = document.querySelector('.slider__line');
   

    // console.log('lineStart', lineStart)
    thumb.ondragstart = function() {
        return false;
      };
    thumb.addEventListener('mousedown', (e)=>{
        console.log(e)
        let lineAnd = line.getBoundingClientRect().right;
        let lineStart = line.getBoundingClientRect().left;
        let runnerShift;
        function moveDown(e){
            runnerShift = e.pageX - lineStart;
            console.log(runnerShift)
            if(runnerShift > 0 && runnerShift < lineAnd - lineStart){
                thumb.style.left = e.pageX - lineStart + 'px';
            }
        }
        document.addEventListener('mousemove',moveDown)
            
        document.addEventListener('mouseup',(e)=>{
            console.log(1)
            document.removeEventListener('mousemove',moveDown);
        })

    })

}
// slider ()
function slider2(){
    let thumb = document.querySelector('.slider__runner');
    let slider = document.querySelector('.slider');
    let line = document.querySelector('.slider__line');

    thumb.addEventListener('pointerdown',(e) => {
        // console.log(e.pointerId);
        thumb.setPointerCapture(e.pointerId);
        // console.log(thumb);
        function a(e){
            let newLeft = e.clientX - line.getBoundingClientRect().left;
            console.log(newLeft)
            thumb.style.left = newLeft + 'px';
        }

        thumb.addEventListener('pointermove',a)
        thumb.onlostpointercapture = ()=>{
            console.log('11111');
        }
        thumb.addEventListener('lostpointercapture',(e)=>{
            console.log(11111);
            thumb.removeEventListener('pointermove',a);
        })
    })
       
        
  
    // thumb.onpointermove = function(event) {
    //     let newLeft = event.clientX - slider.getBoundingClientRect().left;
    //     thumb.style.left = newLeft + 'px';
    //   };
      
    
}

slider2()

//----------------------------------------
function slider3(){
    let slider = document.querySelector('.slider__runner');
    function bSlider(e){
        slider.addEventListener('pointermove',()=>{
            slider.style.left = e.clientX + 'px';
        })
        slider.setPointerCapture(e.pointerId);
    }

}

slider3()
//----------------------------------------

function supeHero(){
   const fild = document.querySelector('.super-hero__fild');
   const heros = document.querySelector('.super-hero__box');
   
 
   
  heros.addEventListener('mousedown',function mouseDown(e) {
 
        // if(e.target.querySelector('[data-item]')){
        //     console.log(3333)
        // }
        
        // if(e.target.hasAttribute('data-item')){
        //     console.log(2222)
        // }
        console.log(e.target.hasAttribute('data-item'))
      if(e.target.hasAttribute('data-item')){

        let target = e.target;
        target.ondragstart = function() {
            return false;
          };
        var shiftX = e.clientX - target.getBoundingClientRect().left;
        var shiftY = e.clientY - target.getBoundingClientRect().top;

        target.style.position = 'absolute';
        target.style.zIndex = '999';
        target.style.left = e.pageX - shiftX + 'px';
        target.style.top = e.pageY - shiftY + 'px';

        document.addEventListener('mousemove',move);

        document.addEventListener('mouseup',(e) => {
            document.removeEventListener('mousemove',move)
        })
        function move(e){
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }



      }
     
      
   })
}
supeHero()
        

// document.addEventListener('keydown', function(event) {
//     if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
//       alert('Отменить!')
//     }
//   });
function start (e){
    console.log (e.code);
}
function runOnKeys(func, code1, code2,) {
    let keys = new Set();
    document.addEventListener('keydown',(e)=> {
    //    console.log('Key'+ code1)
      
        keys.add(e.code)
        // console.log(keys)
        if(keys.has(code1) && keys.has(code2)){
            
            func(e)
        }

        document.addEventListener('keyup',(e)=>{
            keys.delete(e.code)
            console.log(keys)
        }) 
    })
      


}       
runOnKeys(start, 'KeyQ','KeyW')

function scroll(){
    // console.log(document.documentElement);
    let con = document.querySelector('.scroll');
//    console.log (con.getBoundingClientRect().bottom);

    function populate(){
        while(true) {
            let conButtom = con.getBoundingClientRect().bottom;

            // if (conButtom < )
        }
    }
    // console.log(con.scrollHeight)
    
    con.addEventListener('scroll',(e) => {
        console.log(con.scrollHeight)
        console.log(con.clientHeight)
        // con.innerHTML += '<h2>12345</h2>'
    //    console.log(con.scrollTop)
        if (con.scrollTop + con.clientHeight + 20 > con.scrollHeight){
            // console.log(con.scrollTop + con.clientHeight)
            // console.log(con.scrollHeight)
            // console.log('scroll')
            con.innerHTML += '<h2>12345</h2>'
        }
        // console.log (con.getBoundingClientRect().bottom);

    })
    // window.addEventListener('scroll',(e) => {
    //     con.innerHTML += '<h2>12345</h2>'
    //     console.log('scroll')
    // })

}

scroll()

function createForm(){
    console.log(document.forms)
    let formOne = document.forms.formOne;
    console.log(formOne)
    console.log(formOne.elements)
    document.forms.formOne.fieldSetOne.value = '2'
    console.log(document.forms.formOne.fieldSetOne.value)
    document.forms.formOne.formSelect.options[1].selected = true;
    console.log(document.forms.formOne.formSelect.selectedIndex = 2)
    console.log(document.forms.formOne.select)

    let option = new Option('12345', 'test', true, true);
    document.forms.formOne.formSelect.append(option)
    document.forms.formOne.formSelect.selectedIndex = 2
    console.log(option)
}
// createForm()

//---------------GAME------------------------------

function game(){
    const imgBox = document.querySelector('.game__imgBox');
    const gameContainer = document.querySelector('.game');
    var shiftImg_Y;
    var shiftImg_X;
    var gameContainerY;
    var gameContainerX;
    var target;

    let previousTarget;
    let curentTarget;
    
    gameContainer.addEventListener('pointerdown',function(e){
        if(e.target.matches('.game__imgBox')){
            target = e.target;
            target.setPointerCapture(e.pointerId);

            target.addEventListener('gotpointercapture',function(){
                this.style.background='red';
            })
            
            
            gameContainerY = gameContainer.getBoundingClientRect().top;
            gameContainerX = gameContainer.getBoundingClientRect().left;

            shiftImg_Y =  e.clientY - target.getBoundingClientRect().top;
            shiftImg_X =  e.clientX - target.getBoundingClientRect().left;

            target.addEventListener('pointermove',imgMove);
            target.addEventListener ('lostpointercapture',removeMove);
        }
    })
            
    // gameContainer.addEventListener('pointerover',pointOver);
    // gameContainer.addEventListener('pointerout',pointOut);
           

    function imgMove(e){
        
        if(!this.classList.contains('game__imgBox--position')){
            this.classList.add('game__imgBox--position');
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
                previousTarget.style.background = '';
            }
            previousTarget = curentTarget;
        }
            
        if(curentTarget){
            previousTarget.style.background = 'blue';
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

    
    // function pointOver(e){
    //     closestTarget = e.target.closest('.game__images, .game__fildTwo, .game__fildOne');
    //     if(!closestTarget) return
    //     closestTarget.style.background = 'yellow';
    // }
    
    // function pointOut(e){
    //     if(!closestTarget) return
    //     closestTarget.style.background = '';
    // }
        
        
        
  



        

        


    function removeMove(e){
        appendSelectItem(e)
        this.classList.remove('game__imgBox--position');
        this.style.top = '';
        this.style.left = '';
        this.removeEventListener('pointermove',imgMove)
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
            
            console.log(!game__images.children);
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
        }
        console.log(modalText)
        // if(win){
        //     modalText.innerHTML = 'You Won';
        // }if else()
        // else {
        //     modalText.innerHTML = 'You lost';
        // }
        switch(result){
            case 'win':
                modalText.innerHTML = 'You Won';
                break;
            case 'lost':
                modalText.innerHTML = 'You lost';
                break;
            case 'notСompleted':
                modalText.innerHTML = 'You have not placed all the objects';
                break;
        }
    }
    

    checkResult()
        
}
game()