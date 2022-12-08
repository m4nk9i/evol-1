var ctx;

const NUM_CELLS=1600;
const NUM_STEPS=200;

var STAGE_SIZE=128;
var MAXX;
var MAXY;
var animate=0;
var cells=[];
var cmap=[];
var cmapsize;

/**
 * inits an array of cells
 */
function initCells()
{
    for (let i=0;i<NUM_CELLS;i++)
    {
        let tx=0;
        let ty=0;
        do{
            tx=Math.floor(Math.random()*STAGE_SIZE);
            ty=Math.floor(Math.random()*STAGE_SIZE);
        }
        while (cmap[(STAGE_SIZE*(tx)+(ty))]!=null)
        //console.log(typeof(tx));
        let tcell=new Cell(tx,ty);
        cmap[(STAGE_SIZE*(tx)+(ty))]=tcell;
       /* console.log(tx);
        console.log(ty);
        console.log((STAGE_SIZE*(tx)+(ty)));
        */
       //console.log(tcell);
        tcell.st_stagesize=STAGE_SIZE;
        tcell.st_map=cmap;

        cells.push(tcell);
    }
    console.log("cells");
    console.log(cells.length)

}

/**
 * updates cells status
 */
function updateCells(){

 //   cmap=new Array(cmapsize);

    for (let i=0;i<cells.length;i++)
    {
        
        cells[i].update();
    }
  //  cmap.length=256*256;


}

/**
 * draws every cell
 */

function drawCells(){
    ctx.clearRect(0, 0, MAXX, MAXY)
    for (let i=0;i<cells.length;i++)
    {        
        cells[i].draw(ctx,2);
    }
    
}

/**
 * loop of animation
 */

function loop()
{
    if (animate>0)
    {
        drawCells();
        updateCells();
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
 * inits variables and array of cells
 */

function Init()
{
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    MAXX=canvas.width; 
    MAXY=canvas.height;
    cmapsize=STAGE_SIZE*STAGE_SIZE;
    console.log(cmapsize);
    cmap=new Array(cmapsize);  
    console.log(cmap);
    initCells();
    console.log(cmap);

    window.requestAnimationFrame(loop);
}
