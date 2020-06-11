'use strict'; 
/* Sets everything up
 * ------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      8th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/BrickBreaker
 * @codepen:   https://codepen.io/niitettehtsuru/pen/NWqENww
 * @license:   GNU General Public License v3.0
 */  
let 
c   = document.getElementById("brickBreakerCanvas"), 
img = document.getElementById("backgroundphoto"),
ctx = c.getContext("2d");   
function getBrowserWindowSize() 
{
    let 
    win     = window,
    doc     = document,
    offset  = 20,
    docElem = doc.documentElement,
    body    = doc.getElementsByTagName('body')[0],
    browserWindowWidth  = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight; 
    return {x:browserWindowWidth-offset,y:browserWindowHeight-offset}; 
}   
let  
browserWindowSize   = getBrowserWindowSize();
c.width = browserWindowSize.x;//width of canvas
c.height= browserWindowSize.y;//height of canvas  
let  
SCREEN_WIDTH  = browserWindowSize.x,
SCREEN_HEIGHT = browserWindowSize.y, 
game = new Game(SCREEN_WIDTH,SCREEN_HEIGHT,img),  
lastTime = 100, 
windowSize; 
window.onload = function() {  
    ctx.drawImage(img,0,0);
}; 
function onWindowResize()//called every time the window gets resized. 
{  
    windowSize     = getBrowserWindowSize();
    c.width        = windowSize.x; 
    c.height       = windowSize.y; 
    SCREEN_WIDTH   = windowSize.x;
    SCREEN_HEIGHT  = windowSize.y;
    game.resize(SCREEN_HEIGHT,SCREEN_WIDTH);   
}  
window.addEventListener('resize',onWindowResize);  
function animationLoop(timestamp)
{      
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);  
    let deltaTime = timestamp - lastTime; 
        lastTime = timestamp;  
    game.update(deltaTime);   
    game.draw(ctx);   
    requestAnimationFrame(animationLoop);   
} 
requestAnimationFrame(animationLoop);   
   
 
 