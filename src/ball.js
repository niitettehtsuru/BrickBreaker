'use strict'; 
/* A ball that is served in a ping pong game
 * -----------------------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      2nd June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/PingPong
 * @codepen:   https://codepen.io/niitettehtsuru/pen/KKVpwoy
 * @license:   GNU General Public License v3.0
 */
class Ball
{
    constructor(game)
    {      
        this.game = game;
        this.screenWidth = game.gameWidth;//width of browser window screen
        this.screenHeight = game.gameHeight;//height of browser window screen 
        this.radius = 4;  
        this.color  = 'white'; 
        this.position = {x:~~((Math.random() * this.screenWidth) + this.radius),y:this.screenHeight/2};//starting position of the ball at the center of the screen
        this.unitSpeed = 8;//starting magnitude of a ball's velocity in vertical and horizontal directions
        this.speed = {x: Math.random() > 0.5? this.unitSpeed:-this.unitSpeed ,y:-this.unitSpeed};
        this.touchedBottomWall = false;//true if ball has touched the bottom of the canvas, false otherwise
    }     
    setRadius(radius)
    {
        this.radius = radius; 
    }
    resize(screenHeight,screenWidth,dy,dx)//let the ball be responsive to the resizing of the window
    {   
        this.screenHeight = screenHeight;  
        this.screenWidth  = screenWidth; 
        this.position.y *= dy;
        this.position.x *= dx;   
    } 
    hasCollided(paddle)//true if ball has touched the paddle, false otherwise
    { 
        //Find the vertical & horizontal (distX/distY) distances between the ball’s center and the paddle’s center
        let distX = Math.abs(this.position.x - paddle.x - paddle.width/2);
        let distY = Math.abs(this.position.y - paddle.y - paddle.height/2); 
        //If the distance is greater than halfBall + halfPaddle, then they are too far apart to be colliding
        if (distX > (paddle.width/2 + this.radius)) 
        { 
            return false; 
        }
        if (distY > (paddle.height/2 + this.radius)) 
        { 
            return false; 
        } 
        //If the distance is less than halfPaddle then they are definitely colliding
        if (distX <= (paddle.width/2)) 
        { 
            return true; 
        } 
        if (distY <= (paddle.height/2)) 
        { 
            return true; 
        }
        //test for collision at the paddle corner
        //Think of a line from the paddle center to any paddle corner. Now extend that line by the radius of the ball.
        //If the ball’s center is on that line they are colliding at exactly that paddle corner.
        //Using Pythagoras formula to compare the distance between ball and paddle centers.
        let dx=distX-paddle.width/2;
        let dy=distY-paddle.height/2;
        return (dx*dx+dy*dy<=(this.radius*this.radius));
    }  
    draw(ctx)
    {
        //draw the ball
        ctx.beginPath(); 
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill(); 
        ctx.strokeStyle = this.color;
        ctx.stroke();  
    }
    update(deltaTime)
    {      
        //keep the ball moving in its current direction  
        this.position.x += this.speed.x; 
        this.position.y += this.speed.y; 
        //check collision with a paddle 
        let paddleData = this.game.paddle.getPaddleData();
        let collidedWithPaddle = this.hasCollided(paddleData); 
        if(collidedWithPaddle)//if ball has collided with a paddle
        {  
            let xDistanceToCollisionPoint = this.position.x - paddleData.x;//horizontal distance from the left tip of the paddle to the point of collision 
            //the paddle is divided into 10 equal portion starting from the left tip. These portions are called collision sectors.
            //the collision sectoor identifies which part of the paddle the ball hit
            let collisionSector = ~~(xDistanceToCollisionPoint/(paddleData.width/10)) + 1;
            let unitAngle = (Math.PI * 2/3/*120 degrees*/)/20;//6 degrees
            let angle = (Math.PI/6 + (collisionSector * unitAngle))/2; 
            let y = this.unitSpeed * Math.tan(angle); 
            this.speed.y = -y;//move the ball up 
            if(collisionSector < 6)//if ball hits the first half side of the paddle
            {
                if(this.speed.x > 0)//if ball is moving right
                {
                    this.speed.x = -this.speed.x;//move the ball to the left
                }
            }
            else//if ball hits the latter half side of the paddle
            {
                if(this.speed.x < 0)//if ball is moving left
                {
                    this.speed.x = -this.speed.x;//move the ball to the right
                }
            }   
            this.position.y = this.screenHeight - paddleData.height/*height of paddle*/ - 1 - this.radius;//move slightly away from the paddle
        }  
        if(!collidedWithPaddle)//if there's NO collision with the paddle
        {
            //check collision with wall
            if(this.position.x - this.radius < 0 )//ball touches the left wall  
            {  
                this.speed.x = -this.speed.x;//move right 
                this.position.x = this.radius;//so ball doesn't get stuck in the wall
            }    
            if(this.position.x + this.radius> this.screenWidth)//ball touches the right wall 
            {  
                this.speed.x = -this.speed.x;//move left 
                this.position.x = this.screenWidth - this.radius;//so ball doesn't get stuck in the wall
            }    
            if(this.position.y - this.radius < 0)//ball touches the top of the wall  
            {  
                this.speed.y = -this.speed.y;//move down
                this.position.y = this.radius;//so ball doesn't get stuck in the wall  
            }  
            if(this.position.y + this.radius > this.screenHeight)//ball touches the bottom of the wall 
            {  
                this.touchedBottomWall = true; 
                this.position.y  = this.screenHeight - this.radius;//so ball doesn't get stuck in the wall
            } 
        }  
    }  
}