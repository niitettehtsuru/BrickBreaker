'use strict'; 
/* A paddle for hitting tha ball
 * -----------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      2nd June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/PingPong
 * @codepen:   https://codepen.io/niitettehtsuru/pen/KKVpwoy
 * @license:   GNU General Public License v3.0
 */  
class Paddle
{
    constructor(game)
    {       
        this.game = game; 
        this.gameWidth = game.gameWidth;//width of browser window screen
        this.gameHeight = game.gameHeight;//height of browser window screen  
        this.width  = 120; 
        this.height = 10;  
        //set starting position of the paddle to the middle of the bottom of the screen 
        this.position    = {x:this.gameWidth/2 - this.width/2,y:this.gameHeight - this.height};
        this.speed       = {x:32,y:0};//paddle will only move horizontally    
        this.color       = 'white';   
        this.setNavigationalControls(); //set paddle navigational controls
        this.lineDashOffset = 0;
    }  
    paddleTouchesLeftWall() 
    {
        if(this.position.x <= 0)
        {
            return true; 
        }
        return false; 
    }
    paddleTouchesRightWall() 
    {
        if(this.position.x + this.width >= this.gameWidth)
        {
            return true; 
        }
        return false; 
    } 
    moveLeft()
    {
        this.position.x -= this.speed.x; 
    }
    moveRight()
    {
        this.position.x += this.speed.x; 
    }
    setNavigationalControls()
    { 
        document.addEventListener('keydown',(event)=> /*set arrow key navigation*/
        {  
            if(!this.game.gameIsOver() && !this.game.gameIsPaused())
            {
                event.preventDefault();//disable arrow key scrolling in browser
                switch(event.keyCode)
                {
                    case 37: //when left arrow key is pressed 
                        if(this.paddleTouchesLeftWall()) 
                        {
                            this.position.x = 0;//don't move any further left
                        }
                        else
                        { 
                            this.moveLeft();  
                        } 
                        break; 
                    case 39: //when right arrow key is pressed 
                        if(this.paddleTouchesRightWall())
                        {
                            this.position.x = this.gameWidth - this.width; //don't move any further right  
                        }
                        else 
                        {
                            this.moveRight();  
                        } 
                        break;    
                }
            }  
        }); 
    }
    getPaddleData()//returns geometric dimensions of the paddle
    {
        return {x:this.position.x,y:this.position.y,width:this.width,height:this.height};
    }  
    resize(screenHeight,screenWidth,dy,dx)//let the paddle be responsive to the resizing of the window
    {   
        this.gameHeight = screenHeight;  
        this.gameWidth  = screenWidth; 
        this.position.y *= dy;
        this.position.x *= dx; 
        this.position.y = this.gameHeight - this.height;  
    }
    draw(ctx)//draw the paddle
    { 
        ctx.beginPath();
        ctx.rect(this.position.x,this.position.y,this.width,this.height);  
        ctx.fillStyle   = this.color;
        ctx.fill();   
    }  
}