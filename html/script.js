var ctx;

const NUM_CELLS=100;
const pi_2=Math.PI*2;
var STAGE_SIZE=128;
var MAXX;
var MAXY;
var animate=0;
var cells=[];


/**
 * inits an array of cells
 */
function initCells()
{
    for (let i=0;i<NUM_CELLS;i++)
    {

        let tx=Math.random()*STAGE_SIZE;
        let ty=Math.random()*STAGE_SIZE;
        let tcell=new Cell(tx,ty);
        //console.log(tcell);

        cells.push(tcell);
    }
}

/**
 * updates cells status
 */
function updateCells(){

    for (let i=0;i<NUM_CELLS;i++)
    {
        
        cells[i].update();
    }
}

/**
 * draws everyone cell
 */

function drawCells(){
    ctx.clearRect(0, 0, MAXX, MAXY)
    for (let i=0;i<NUM_CELLS;i++)
    {        
        cells[i].draw(ctx,4);
    }
    
}

/**
 * loop of animation
 */

function loop()
{
    if (animate)
    {
        drawCells();
        updateCells();
    }

    window.requestAnimationFrame(loop);
}

/** 
 * activates animation
 */

function butt1click()
{
    animate=1;
}

/**
 * disables animation
 */

function butt2click()
{
        animate=0;
}

/**
 * inits variables and array of cells
 */

function Init()
{
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    MAXX=canvas.width; 
    MAXY=canvas.height; 

    initCells();
    window.requestAnimationFrame(loop);
}
