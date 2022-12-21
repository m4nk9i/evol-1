var ctx;
/*
const NUM_CELLS=1600;
const NUM_STEPS=300;

var STAGE_SIZE=128;
var animate=0;
var cells=[];
var cmap=[];
var cmapsize;
var s_text="";
var selected_cell=0;

var scale=2;
*/
var MAXX;
var MAXY;1
var step=0;
walkers=[];
/**
 * inits an array of cells
 */
function initWalkers()
{
    walkers.push(new AIWalker());
}

/**
 * updates cells status
 */
function updateWalkers(){

 //   cmap=new Array(cmapsize);

    for (let i=0;i<walkers.length;i++)
    {
        
        walkers[i].update(0.04);
    }
  
}

/**
 * draws every cell
 */

function drawWalkers(){
    ctx.clearRect(0, 0, MAXX, MAXY)
    for (let i=0;i<walkers.length;i++)
    {        
        walkers[i].draw(ctx);
    }
    
}

/**
 * loop of animation
 */

function loop()
{
    if (animate>0)
    {
        step++;
        //s_text=getElementById("text1");
        
        drawWalkers();
        updateWalkers();
        if (animate==2) animate=0;
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
 * one step animation
 */

function butt3click()
{
        animate=2;
}

/**
 * next generation
 */
function butt4click()
{

}

/**
 * inits variables and array of cells
 */

function Init()
{
    step=1;
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    MAXX=canvas.width; 
    MAXY=canvas.height;
    /*
    cmapsize=STAGE_SIZE*STAGE_SIZE;
    console.log(cmapsize);
    cmap=new Array(cmapsize);  
    console.log(cmap);
    */
    initWalkers();
    animate=2;
    window.requestAnimationFrame(loop);
}
