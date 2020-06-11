  
class Game
{
    constructor(gameWidth,gameHeight,img)
    {
        this.gameWidth  = gameWidth; 
        this.gameHeight = gameHeight;
        this.img        = img;//background image  
        this.currentLevel = 1;   
        this.paddle = new Paddle(this);
        this.ball   = new Ball(this); 
        this.levels = new Level(this);  
        let levelData = this.levels.buildLevel(this.currentLevel);
        this.score = 0; 
        this.scoreAtStartOfLevel = 0; 
        this.bricks = levelData.bricks;
        this.letterArray = levelData.letterArray;//the array of 0s and 1s from which the bricks were created
        this.shadowBricks = new Level(this).buildLevel(this.currentLevel).bricks;//a shadow reflection of the created bricks  
        this.states = {gameOver:false,paused:false,nextLevelWait:false}; 
        this.setControls();//set controls for pause,gameover, etc
        this.ball.setRadius(this.getCorrespondingBallRadius(this.bricks[0].width));  
    } 
    getCorrespondingBallRadius(width)//set the radius of the ball based on the width of a brick 
    {
        let radius = 4 * width/28; 
        radius = radius < 2? 2: radius;//set a minimum radius of 2  
        return radius; 
    }
    getScore() 
    {
        return this.score; 
    }
    setScore(score) 
    {
        this.score = score;
    }
    resize(screenHeight,screenWidth)
    {  
        let dy = screenHeight/this.gameHeight;//percentage change in browser window height 
        let dx = screenWidth/this.gameWidth;//percentage change in browser window width 
        this.gameHeight = screenHeight;  
        this.gameWidth  = screenWidth; 
        //create new bricks to reflect the change
        this.bricks = new Level(this).createBricks(this.letterArray);
        this.shadowBricks = new Level(this).buildLevel(this.currentLevel).bricks; 
        [this.ball,this.paddle].forEach(function(obj)//set the new locations of the ball and paddle on the canvas
        {
            obj.resize(screenHeight,screenWidth,dy,dx); 
        });
        this.ball.setRadius(this.getCorrespondingBallRadius(this.bricks[0].width));//set the new radius of the ball
    }
    buildLevel()
    {
        this.paddle = new Paddle(this);
        this.ball   = new Ball(this); 
        this.levels = new Level(this);  
        let levelData = this.levels.buildLevel(this.currentLevel);
        this.bricks = levelData.bricks;
        this.letterArray = levelData.letterArray; 
        this.shadowBricks = new Level(this).buildLevel(this.currentLevel).bricks; 
        this.ball.setRadius(this.getCorrespondingBallRadius(this.bricks[0].width)); 
    }
    gameIsPaused() 
    {
        return this.states.paused;   
    } 
    newLevelIsIntroduced() 
    {
        return this.states.nextLevelWait; 
    }
    toggleLevelIntroState() 
    {
        this.states.nextLevelWait = !this.states.nextLevelWait;   
        if(!this.states.nextLevelWait)
        {   //hide the 'level intro' popup is user begins to play the level
            document.getElementById('levelintropopup').classList.add("hide-it");
        }
    }
    togglePausedState() 
    {
        this.states.paused = !this.states.paused;   
        if(!this.states.paused)//if game is resumed
        {   //hide the 'paused' popup menu if
            document.getElementById('pausedpopup').classList.add("hide-it");
        }
    }
    gameIsOver()
    { 
        return this.states.gameOver; 
    }
    setGameOver(state)
    {
        this.states.gameOver = state;
        if(!this.states.gameOver)//if the game is not over
        {   //hide the gameover popup menu if player decides to replay current level
            document.getElementById('gameoverpopup').classList.add("hide-it");
        } 
    }
    setControls()
    { 
        let pausedPopUpPrompt = //prompt that shows when the user pauses the game
        `<article id='pausedpopup' class='hide-it'>
            <header> 
                <div class = 'row text-center'>
                    <label>PAUSED</label>  
                </div>   
                <hr> 
                <div class = 'row'>
                    <div class="col-xs-6 text-center">  
                        <button type='button' id='resumegamebutton' class='btn btn-warning btn-xs'>Resume Game</button>  
                    </div> 
                </div>   
            </header>    
        </article>`; 
        let gameoverPopUpPrompt = //prompt that shows when the game is over
        `<article id='gameoverpopup' class='hide-it'>
            <header> 
                <div class = 'row text-center'>
                    <label>GAMEOVER</label>
                </div> 
                <hr>    
                <div class = 'row'>
                    <div class="col-xs-6 text-center">
                        <button type='button' id='restartbutton' class='btn btn-primary btn-xs'>Start All Over</button> 
                    </div>
                    <div class="col-xs-6 text-center">
                        <button type='button' id='replaylevelbutton' class='btn btn-warning btn-xs'>Replay Level</button> 
                    </div>
                </div> 
            </header>    
        </article>`; 
        let gameScorePrompt = //prompt that shows the current score and level of the game
        `<article id='scoreBoard'>
            <header> 
                <h1>Level:<span id='levelspan'>1</span></h1>
                <h1>Score: <span id='scorespan'>0</span></h1> 
            </header>
            <a href="https://github.com/niitettehtsuru/BrickBreaker">Github</a> 
        </article>`;
        let levelIntroPrompt = //prompt that shows at the start of every level
        `<article id='levelintropopup' class='hide-it'>
            <header> 
                <div class = 'row text-center'>
                    <label>LEVEL  <span id='numOfLevel'></span></label> 
                </div>  
                <hr>   
                <div class = 'row'> 
                    <div class="col-xs-2 text-center"> 
                    </div>
                    <div class="col-xs-8 text-center">
                         <button type='button' id='startlevelbutton' class='btn btn-warning btn-xs'>Play Level</button> 
                    </div>
                    <div class="col-xs-2 text-center"> 
                    </div> 
                </div>   
            </header>    
        </article>`;   
        $('body').append(pausedPopUpPrompt);  
        $('body').append(gameoverPopUpPrompt);
        $('body').append(gameScorePrompt);
        $('body').append(levelIntroPrompt);   
        document.addEventListener('keydown',(event)=>
        {  
            let x = event.which || event.keyCode; 
            switch(x)
            { 
                case 27: //when esc key is pressed 
                    if(!this.gameIsOver() && !this.newLevelIsIntroduced())//if it's not game over and new level prompt is not showing
                    {    
                        this.togglePausedState();  
                    } 
                    break;  
            } 
        }); 
        //when user clicks button to resume a paused game
        document.getElementById('resumegamebutton').addEventListener('click',(event)=>
        {   
            this.togglePausedState();   
        });  
        //when user clicks button to start a level 
        document.getElementById('startlevelbutton').addEventListener('click',(event)=>
        {     
            this.toggleLevelIntroState();   
            //document.getElementById('gamestatsindicator').classList.remove("hide-it"); //show the game stats indicator 
        });   
        //when player clicks button to replay the current level
        document.getElementById('replaylevelbutton').addEventListener('click',(event)=>
        {     
            this.setScore(this.scoreAtStartOfLevel); 
            this.setGameOver(false); 
            this.buildLevel();   
        }); 
        //when player clicks button to start all over from level 1
        document.getElementById('restartbutton').addEventListener('click',(event)=>
        {    
            this.setScore(0); 
            this.setGameOver(false); 
            this.currentLevel = 1; 
            this.buildLevel();   
        });  
    }   
    showGameOverPrompt(ctx)
    { 
        //darken the whole game screen
        ctx.rect(0,0,this.gameWidth,this.gameHeight); 
        ctx.fillStyle   = "rgba(0,0,0,0.6)";
        ctx.fill(); 
        //display the 'gameover' popup menu
        document.getElementById('gameoverpopup').classList.remove("hide-it"); 
    }
    showPausedPrompt(ctx)
    { 
        //darken the whole game screen
        ctx.rect(0,0,this.gameWidth,this.gameHeight); 
        ctx.fillStyle   = "rgba(0,0,0,0.6)";
        ctx.fill(); 
        //display the 'paused' popup menu
        document.getElementById('pausedpopup').classList.remove("hide-it"); 
    }
    showNewLevelIntroductionPrompt(ctx)
    { 
        //darken the whole game screen
        ctx.rect(0,0,this.gameWidth,this.gameHeight); 
        ctx.fillStyle   = "rgba(0,0,0,0.6)";
        ctx.fill(); 
        //display the 'new level' popup menu
        document.getElementById('levelintropopup').classList.remove("hide-it"); 
    }
    draw(ctx)
    {   
        ctx.drawImage(this.img,0, 0,this.gameWidth,this.gameHeight);  //draw background image 
        //darken the screen
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fill();  
        //draw the shadow bricks
        this.shadowBricks.forEach(function(obj)
        { 
            obj.draw(ctx,true);
        });
        //draw the real bricks
        [...this.bricks,this.paddle,this.ball].forEach(function(obj)
        { 
            obj.draw(ctx);
        }); 
        if(this.gameIsOver())
        {
            this.showGameOverPrompt(ctx); 
        }
        if(this.gameIsPaused())
        {
            this.showPausedPrompt(ctx); 
        }
        if(this.newLevelIsIntroduced())
        {
            this.showNewLevelIntroductionPrompt(ctx);
        }  
    } 
    update(deltaTime)
    {  
        if(!this.gameIsOver() && !this.gameIsPaused() && !this.newLevelIsIntroduced())
        {     
            if(this.bricks.length < 1)//if the level is complete
            {
                ++this.currentLevel;//increase the level
                this.scoreAtStartOfLevel = this.getScore();  
                document.getElementById('numOfLevel').innerHTML = this.currentLevel;  
                document.getElementById('levelspan').innerHTML = this.currentLevel;  
                this.ball   = new Ball(this);
                let levelData = this.levels.buildLevel(this.currentLevel);
                this.bricks = levelData.bricks;
                this.letterArray = levelData.letterArray; 
                this.shadowBricks = new Level(this).buildLevel(this.currentLevel).bricks;
                this.states.nextLevelWait = true;
                return;
            }
            if(this.ball.touchedBottomWall)
            { 
                this.setGameOver(true);
            }
            this.ball.update(deltaTime);//update the ball
            [...this.bricks].forEach(function(brick)//update each brick
            {
                brick.update(deltaTime); 
            });
            for(let k = 0; k < this.bricks.length; k++)
            {
                let brick = this.bricks[k];
                if(brick.markedForDeletion)//if a brick collides with the ball
                {
                    this.setScore(this.getScore()+1); //increase the score by 1
                    document.getElementById('scorespan').innerHTML = this.getScore();//display the score 
                    let brickIndex = brick.getIndex(); 
                    this.letterArray[brickIndex.row][brickIndex.column] = 0; 
                    this.bricks.splice(k,1);//get rid of the brick
                }
            }   
        } 
    }  
}