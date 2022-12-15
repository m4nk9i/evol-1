var ctx;

const NUM_CELLS=1600;
const NUM_STEPS=300;

var STAGE_SIZE=128;
var MAXX;
var MAXY;
var animate=0;
var cells=[];
var cmap=[];
var cmapsize;
var s_text="";
var step=0;
var selected_cell=0;

var scale=2;
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
    selected_cell=cells[0];

}

/**
 * updates cells status
 */
function updateCells(){

 //   cmap=new Array(cmapsize);

    for (let i=0;i<cells.length;i++)
    {
        
        cells[i].update(step);
    }
  //  cmap.length=256*256;
 //   console.log(selected_cell.neurons.a_sensors)

}

/**
 * draws every cell
 */

function drawCells(){
    ctx.clearRect(0, 0, MAXX, MAXY)
    for (let i=0;i<cells.length;i++)
    {        
        cells[i].draw(ctx,scale);
    }
    ctx.beginPath();

    ctx.strokeStyle="black";
    
    ctx.ellipse(scale+selected_cell.posx*scale*2,scale+selected_cell.posy*scale*2,10,10,0,0, pi_2);
    ctx.stroke();
    
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
        
        drawCells();
        updateCells();
        if (animate==2) animate=0;
    }

    if (step>NUM_STEPS)
    {
        step=0;
        killweak();
        reproducecells();
        randomizecells();
        //butt4click();
    }
    window.requestAnimationFrame(loop);


}

function killweak()
{
    let tlen=cells.length-1;
    for (let i=tlen;i>=0;i--)
    {   console.log (i+"/"+tlen)
        if (cells[i].posx>STAGE_SIZE*0.1)
        {
            cells.splice(i,1);
        }
        else
        {
            cells[i].dir=2;
        }
        //console.log(cells.length);
    }
    
    console.log(cells);
}

function randomizecells()
{
    for (let i=0;i<STAGE_SIZE*STAGE_SIZE;i++)
    {
        cmap[i]=null;
    }

    for (let i=0;i<cells.length;i++)
    {
        let tx=0;
        let ty=0;
        do{
            tx=Math.floor(Math.random()*STAGE_SIZE);
            ty=Math.floor(Math.random()*STAGE_SIZE);
        }
        while (cmap[(STAGE_SIZE*(tx)+(ty))]!=null)
        //console.log(typeof(tx));
        cells[i].posx=tx;
        cells[i].posy=ty;
        cmap[(STAGE_SIZE*(tx)+(ty))]=cells[i];
        cells[i].mutate();
    
    }
    selected_cell=cells[0];

}

/**
 * 
 */
function reproducecells()
{
    let tlen=cells.length
    for(let i=tlen-1;i>0;i--)
    {
      //  console.log(i+" "+cells.length);
        var tcell=cells[i].copy();
    //    console.log(tcell.neurons.a_sensors);
    //    console.log(cells[i].neurons.a_sensors);
        cells.push(tcell);
    }
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
    killweak();
    reproducecells();
    randomizecells();
    animate=2;
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
    cmapsize=STAGE_SIZE*STAGE_SIZE;
    console.log(cmapsize);
    cmap=new Array(cmapsize);  
    console.log(cmap);
    initCells();
    console.log(cmap);
    animate=2;
    window.requestAnimationFrame(loop);
}
