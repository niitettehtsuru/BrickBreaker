'use strict'; 
/* A brick
 * --------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      2nd June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/PingPong
 * @codepen:   https://codepen.io/niitettehtsuru/pen/KKVpwoy
 * @license:   GNU General Public License v3.0
 */  
class Brick
{
    constructor(game,position)
    {       
        this.game = game; 
        this.gameWidth = game.gameWidth; 
        this.gameHeight= game.gameHeight; 
        this.width = position.width;
        this.height = position.height; 
        this.position = position; 
        this.markedForDeletion = false; 
    }   
    getIndex() 
    {
        return {row:this.position.row,column:this.position.column};
    }
    getBrickData()//returns geometric dimensions of the brick
    {
        return {x:this.position.x,y:this.position.y,width:this.width,height:this.height};
    }  
    resize(screenHeight,screenWidth,dy,dx)//let the brick be responsive to the resizing of the window
    {   
        this.gameHeight = screenHeight;  
        this.gameWidth  = screenWidth; 
        this.position.y *= dy;
        this.position.x *= dx;  
    }
    draw(ctx,shadow = false)//draw the brick
    {
        if(!shadow)//draw the original brick
        {
            //draw outer square
            ctx.beginPath();
            ctx.rect(this.position.x,this.position.y,this.width,this.height);  
            ctx.strokeStyle   = 'black';
            ctx.stroke();  
            ctx.fillStyle   =  'rgba(255,255,255,0.5)';
            ctx.fill(); 
            
            //draw inner square
            let offset = this.width/6;
            ctx.beginPath();
            ctx.rect(this.position.x+offset,this.position.y+offset,this.width-offset*2,this.height-offset*2); 
            ctx.strokeStyle   = 'black';
            ctx.stroke();  
            ctx.fillStyle   = 'rgba(255,255,0,0.7)'; 
            ctx.fill();  
        }
        else//draw the shadow brick
        {
            //draw outer square
            ctx.beginPath();
            ctx.rect(this.position.x,this.position.y,this.width,this.height);  
            ctx.strokeStyle   = 'rgba(0,0,0,0.5)';
            ctx.stroke();
            ctx.fillStyle   =  'rgba(255,255,255,0.1)';
            ctx.fill(); 
            
            //draw inner square
            let offset = this.width/6;
            ctx.beginPath();
            ctx.rect(this.position.x+offset,this.position.y+offset,this.width-offset*2,this.height-offset*2); 
             
            ctx.strokeStyle   = 'black';
            ctx.stroke(); 
            ctx.fillStyle   = 'rgba(255,255,0,0.3)'; 
            ctx.fill();  
        } 
    }  
    update( )
    {    
        if(this.game.ball.hasCollided(this.getBrickData()))
        { 
            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.markedForDeletion = true;  
        }  
    }
}