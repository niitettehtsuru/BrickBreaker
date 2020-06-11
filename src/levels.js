'use strict';  
//creates and builds game levels
class Level
{
    constructor(game)
    {      
        this.game = game;
        this.gameWidth = game.gameWidth;//width of browser window screen
        this.gameHeight = game.gameHeight;//height of browser window screen  
        this.gameLevels = //the levels of the game and the inscriptions for each level
        {
            1: 'racism',
            2: 'pollution',
            3: 'rape',
            4: 'dictatorship',
            5: 'abortion'
        }; 
        this.letterRepresentedAsArray = //a representation of english alphabets as an array of 0s and 1s
        { 
            space: // a single space
            [
                [0], 
                [0], 
                [0],
                [0],
                [0], 
                [0],
                [0],
                [0],
                [0]
            ],
            a: [
                [1,1,1,1], 
                [1,0,0,1], 
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1], 
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1]
            ],
            b:[
                [1,1,1,1], 
                [1,0,0,1], 
                [1,0,0,1],
                [1,0,1,0],
                [1,1,0,0], 
                [1,0,1,0],
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1]
            ],
            c:[
                    [1,1,1,1], 
                    [1,0,0,0], 
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0], 
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,1,1,1]
                ],
            d:[
                    [1,1,1,0], 
                    [1,1,1,1], 
                    [1,0,0,1],
                    [1,0,0,1],
                    [1,0,0,1], 
                    [1,0,0,1],
                    [1,0,0,1],
                    [1,1,1,1],
                    [1,1,1,0]
                ],
                e:[
                    [1,1,1,1], 
                    [1,0,0,0], 
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,1,1,1], 
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,0,0,0],
                    [1,1,1,1]
                ],
                f:[
                      [1,1,1,1], 
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,1,1,1], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0]
                  ],
                g:[
                      [1,1,1,1], 
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,1,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,1,1,1]
                  ],
                h:[
                      [1,0,0,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,1,1,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1]
                  ],
                i:[
                      [1], 
                      [1], 
                      [1],
                      [1],
                      [1], 
                      [1],
                      [1],
                      [1],
                      [1]
                  ],
                j:[
                      [1,1,1,1], 
                      [0,0,1,0], 
                      [0,0,1,0],
                      [0,0,1,0],
                      [0,0,1,0], 
                      [0,0,1,0],
                      [1,0,1,0],
                      [1,0,1,0],
                      [1,1,1,0]
                  ],
                k:[
                      [1,0,0,0,1], 
                      [1,0,0,1,0], 
                      [1,0,1,0,0],
                      [1,1,1,0,0],
                      [1,1,0,0,0], 
                      [1,1,1,0,0],
                      [1,0,1,0,0],
                      [1,0,0,1,0],
                      [1,0,0,0,1]
                  ],
                l:[
                      [1,0,0,0], 
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,1,1,1]
                  ],
                m:[
                      [1,1,1,1,1], 
                      [1,0,1,0,1], 
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,0,1,0,1], 
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,0,1,0,1]
                  ],
                n:[
                      [1,0,0,0,1], 
                      [1,0,0,0,1], 
                      [1,0,0,0,1],
                      [1,1,0,0,1],
                      [1,0,1,0,1], 
                      [1,0,0,1,1],
                      [1,0,0,0,1],
                      [1,0,0,0,1],
                      [1,0,0,0,1]
                  ],
                o:[
                      [1,1,1,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,1,1,1]
                  ],
                p:[
                      [1,1,1,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,1,1,1],
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,0,0,0]
                  ],
                q:[
                      [1,1,1,1,1], 
                      [1,0,0,0,1], 
                      [1,0,0,0,1],
                      [1,0,0,0,1],
                      [1,0,0,0,1], 
                      [1,0,0,0,1],
                      [1,0,1,0,1],
                      [1,0,0,1,0],
                      [1,1,1,0,1]
                  ],
                r:[
                      [1,1,1,1], 
                      [1,0,0,1], 
                      [1,0,1,1],
                      [1,1,1,0],
                      [1,1,1,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1]
                  ],
                s:[
                      [1,1,1,1], 
                      [1,0,0,0], 
                      [1,0,0,0],
                      [1,0,0,0],
                      [1,1,1,1], 
                      [0,0,0,1],
                      [0,0,0,1],
                      [0,0,0,1],
                      [1,1,1,1]
                  ],
                t:[
                      [1,1,1,1,1], 
                      [0,0,1,0,0], 
                      [0,0,1,0,0],
                      [0,0,1,0,0],
                      [0,0,1,0,0], 
                      [0,0,1,0,0],
                      [0,0,1,0,0],
                      [0,0,1,0,0],
                      [0,0,1,0,0]
                  ],
                u:[
                      [1,0,0,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,1,1,1]
                  ],
                v:[
                      [1,0,0,0,1], 
                      [1,0,0,0,1], 
                      [1,0,0,0,1],
                      [1,0,0,0,1],
                      [1,0,0,0,1], 
                      [1,0,0,0,1],
                      [1,1,0,1,1],
                      [0,1,1,1,0],
                      [0,0,1,0,0]
                  ],
                w:[
                      [1,0,1,0,1], 
                      [1,0,1,0,1], 
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,0,1,0,1], 
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,0,1,0,1],
                      [1,1,1,1,1]
                  ],
                x:[
                      [1,0,0,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [0,1,1,0], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1],
                      [1,0,0,1]
                  ],
                y:[
                      [1,0,0,1], 
                      [1,0,0,1], 
                      [1,0,0,1],
                      [1,0,0,1],
                      [0,1,1,0], 
                      [0,1,1,0],
                      [0,1,1,0],
                      [0,1,1,0],
                      [0,1,1,0]
                  ],
                z:[
                      [1,1,1,1,1], 
                      [0,0,0,0,1], 
                      [0,0,0,0,1],
                      [0,0,0,1,0],
                      [0,0,1,0,0], 
                      [0,1,0,0,0],
                      [1,0,0,0,0],
                      [1,0,0,0,0],
                      [1,1,1,1,1]
                  ]
        };  
    } 
    joinArrays(existingArray,additionalArray)//merges two arrays
    { 
        let mergedArray = []; 
        existingArray.forEach(function(row,rowIndex)
        { 
            mergedArray[rowIndex] = [...row,...additionalArray[rowIndex]];
        });
        return mergedArray; 
    }
    computeSize(numOfHorizontalBoxes,numOfVerticalBoxes)//finds out the height and width to be allocated to each brick
    {    
        let  
        width = 0,//the width of a brick
        height = 0,//the height of a brick
        horizontalBuffer = 0,//the amount of space to leave at the right and left of the brick cluster
        verticalBuffer = 0;//the mount of space to leave at the top of  a brick cluster  
        //get the width of the brick
        while(width * numOfHorizontalBoxes < this.gameWidth)
        {
            width++;//keep increasing the width until the bricks fit horizontally 
        }
        //the expression: width * numOfHorizontalBoxes < this.gameWidth in some cases, overflows the canvas horizontally with bricks
        width--;//this is so the width doesn't cause the bricks to overflow. 
        //get the height of the brick
        while(height * numOfVerticalBoxes < this.gameHeight/2)
        {
            height++;//keep increasing the height until the bricks fit vertically into the upper half of the screen 
        } 
        height--;//adjust the height
        //we want a square so the width and height must be equal
        if(height !== width) 
        {
            height = width = Math.min(height,width); 
        }
        horizontalBuffer = (this.gameWidth - (width * numOfHorizontalBoxes))/2; 
        verticalBuffer = ((this.gameHeight/2) - (height * numOfVerticalBoxes))/2;  
        return {width:width,height:height,xBuffer:horizontalBuffer,yBuffer:verticalBuffer}; 
    }
    createBricks(letterArray)//creates bricks from a representation of alphabets as an array of 0s and 1s
    {
        let bricks = [];
        let size = this.computeSize(letterArray[0].length,letterArray.length);  
        for(let rowIndex = 0; rowIndex < letterArray.length; rowIndex++)
        {
            let row = letterArray[rowIndex];
            for(let brickIndex = 0; brickIndex < row.length; brickIndex++)
            {
                let brick = row[brickIndex];
                if(brick ===1)
                {
                    let position = 
                    {
                        x: size.xBuffer + size.width * brickIndex,
                        y: size.yBuffer + size.height * rowIndex,
                        width: size.width,
                        height: size.height,
                        //useful for updating the letterArray when bricks are deleted
                        row: rowIndex,
                        column:brickIndex 
                    };
                    bricks.push(new Brick(this.game,position));  
                }
            }
        }  
        return bricks; 
    }
    getArrayRepresentationOfLetter(char)
    {
        switch(char)
        { 
            case 'a': 
                return this.letterRepresentedAsArray.a; 
            case 'b': 
                return this.letterRepresentedAsArray.b; 
            case 'c': 
                return this.letterRepresentedAsArray.c; 
            case 'd': 
                return this.letterRepresentedAsArray.d; 
            case 'e': 
                return this.letterRepresentedAsArray.e; 
            case 'f': 
                return this.letterRepresentedAsArray.f; 
            case 'g': 
                return this.letterRepresentedAsArray.g; 
            case 'h': 
                return this.letterRepresentedAsArray.h; 
            case 'i': 
                return this.letterRepresentedAsArray.i; 
            case 'j': 
                return this.letterRepresentedAsArray.j;  
            case 'k': 
                return this.letterRepresentedAsArray.k; 
            case 'l': 
                return this.letterRepresentedAsArray.l; 
            case 'm': 
                return this.letterRepresentedAsArray.m; 
            case 'n': 
                return this.letterRepresentedAsArray.n; 
            case 'o': 
                return this.letterRepresentedAsArray.o; 
            case 'p': 
                return this.letterRepresentedAsArray.p; 
            case 'q': 
                return this.letterRepresentedAsArray.q; 
            case 'r': 
                return this.letterRepresentedAsArray.r; 
            case 's': 
                return this.letterRepresentedAsArray.s; 
            case 't': 
                return this.letterRepresentedAsArray.t; 
            case 'u': 
                return this.letterRepresentedAsArray.u; 
            case 'v': 
                return this.letterRepresentedAsArray.v; 
            case 'w': 
                return this.letterRepresentedAsArray.w; 
            case 'x': 
                return this.letterRepresentedAsArray.x; 
            case 'y': 
                return this.letterRepresentedAsArray.y; 
            case 'z': 
                return this.letterRepresentedAsArray.z;
                
                
                
        }
        return this.letterRepresentedAsArray.space;  
    }
    buildLevel(levelNumber)
    {   
        let numOfGameLevels = this.countProps(this.gameLevels);
        if(levelNumber > numOfGameLevels)//if the next level is beyond the number of levels available
        {
            //restart from level 1 onwards
            levelNumber = levelNumber % numOfGameLevels; 
            if(levelNumber === 0)
            {
                levelNumber = numOfGameLevels;
            } 
        } 
        let text = this.gameLevels[levelNumber];//the text to be displayed at the level
        let letterArray = this.letterRepresentedAsArray.space;
        for(let subStringCounter = 0; subStringCounter < text.length; subStringCounter++)//iterate through the text
        {
            let character = text.substr(subStringCounter,1);//get the character at each iteration  
            let charAsArray = this.getArrayRepresentationOfLetter(character);//the character as an array representation of 0s and 1s
            letterArray = this.joinArrays(letterArray,charAsArray);//append to the already array representation
            letterArray = this.joinArrays(letterArray,this.letterRepresentedAsArray.space);//append a 'space' array representation 
        }  
        let bricks = this.createBricks(letterArray);//create bricks from the array representation of 0s and 1s
        let imgPath       = `img/${levelNumber}.jpg`; //get the image to display in the background 
        this.game.img.src = imgPath;//set the image to be display in the background
        return {bricks:bricks,letterArray:letterArray}; 
    }
    countProps(obj)//get the number of elements in an array object
    {
        var l = 0;
        for (let p in obj) l++;
        return l;
    } 
}