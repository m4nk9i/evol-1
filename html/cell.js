
const pi_2=Math.PI*2;


const na_sensors={
    s_off:0,
s_on:1,
s_up:2,
s_left:3,
s_down:4,
s_right:5,
s_age:6,
s_osc:7,
s_posx:8,
s_posy:9
}

const na_actuators={
    
    a_up:0,
    a_left:1,
    a_down:2,
    a_right:3
    
}

const dir_color=["blue","red","green","orange"]

/**
 * Cell class represents a singular cell
 */

class Cell
{
    static st_map;
    static st_stagesize;

    posx=0;
    posy=0;
    
    neurons;

    dir=0;
    color="black";

    /**
     * 
     * @param {number} px inittial x position
     * @param {number} py initial y position
     */

    constructor (px,py)
    {
        this.posx=Math.floor(px);
        this.posy=Math.floor(py);
        
        let t=Math.floor(Math.random()*4.0);
        this.dir=1;
        this.color=`rgb(
            ${Math.floor(py)},
            ${Math.floor(150 - px)},
            ${Math.floor(150 - py)})`;
        this.neurons=new Neural(10,6,4);
        this.neurons.radomize();
    //    console.log(this.neurons.a_conn_ac);
    //    console.log(this.neurons.a_conn_l1);
        this.neurons.a_sensors[na_sensors.s_on]=1;
        this.neurons.a_sensors[na_sensors.s_off]=0;
        this.neurons.a_conn_l1[1]=1;        //TODO:wywalic
        this.neurons.a_conn_ac[t*4]=1;      //TODO:wywalic
    //    console.log(typeof(this.posx));

    }

    /**
     * updates a cell
     */

    update(pstep)
    {
       // console.log(typeof(this.posx));
        var dx=0;
        var dy=0;
      
        this.neurons.a_sensors[na_sensors.s_up]=0;
        this.neurons.a_sensors[na_sensors.s_down]=0;
        this.neurons.a_sensors[na_sensors.s_left]=0;
        this.neurons.a_sensors[na_sensors.s_right]=0;
        this.neurons.a_sensors[na_sensors.s_age]=pstep*0.005;
        this.neurons.a_sensors[na_sensors.s_osc]=Math.sin(pstep*5.0/Math.PI);
        this.neurons.a_sensors[na_sensors.s_posx]=this.posx/this.st_stagesize;
        this.neurons.a_sensors[na_sensors.s_posy]=this.posy/this.st_stagesize;
        

        //this.actuators[this.dir]=this.sensors[n_sensors.s_on];
        if (this.posy>0){
            if (this.st_map[(this.st_stagesize*this.posx+this.posy-1)]!=null)
                this.neurons.a_sensors[na_sensors.s_up]=1.0;
        }
        else{
            this.neurons.a_sensors[na_sensors.s_up]=1.0;
        }
        if (this.posy<this.st_stagesize){
            if (this.st_map[(this.st_stagesize*this.posx+this.posy+1)]!=null)
                this.neurons.a_sensors[na_sensors.s_down]=1.0;
        }
        else
        {
            this.neurons.a_sensors[na_sensors.s_down]=1.0;
        }
        if (this.posx>0){
            if (this.st_map[(this.st_stagesize*(this.posx-1)+this.posy)]!=null)
                this.neurons.a_sensors[na_sensors.s_left]=1.0;
        }
        else{
            this.neurons.a_sensors[na_sensors.s_left]=1.0;
        }
        if (this.posx<this.st_stagesize){
            if (this.st_map[(this.st_stagesize*(this.posx+1)+this.posy)]!=null)
                this.neurons.a_sensors[na_sensors.s_right]=1.0;
        }
        else{
            this.neurons.a_sensors[na_sensors.s_right]=1.0;
        }

        

        this.neurons.update();
       // console.log(this.actuators);
        if ((this.neurons.a_actuators[na_actuators.a_right]-this.neurons.a_actuators[na_actuators.a_left])>0.5)
        {
         //   console.log("6");
            if(this.posx<this.st_stagesize)
            {
                dx=1;
           //     console.log("8");
            }
        }

        if ((this.neurons.a_actuators[na_actuators.a_right]-this.neurons.a_actuators[na_actuators.a_left])<-0.5)
        {
         //   console.log("6");
            if(this.posx>0)
            {
                dx=-1;
           //     console.log("8");
            }
        }        

        if ((this.neurons.a_actuators[na_actuators.a_down]-this.neurons.a_actuators[na_actuators.a_up])>0.5)
        {
         //   console.log("6");
            if(this.posy<this.st_stagesize)
            {
                dy=1;
           //     console.log("8");
            }
        }

        if ((this.neurons.a_actuators[na_actuators.a_down]-this.neurons.a_actuators[na_actuators.a_up])<-0.5)
        {
         //   console.log("6");
            if(this.posy>0)
            {
                dy=-1;
           //     console.log("8");
            }
        }    

        if (this.st_map[(this.st_stagesize*(this.posx+dx)+this.posy+dy)]!=null)
        {
            dx=0;
            dy=0;
        //    console.log(this);
        }
        
        this.st_map[(this.st_stagesize*this.posx+this.posy)]=null;
      //  console.log((this.st_stagesize*this.posx+this.posy));
        this.posx+=dx;
        this.posy+=dy;
        //console.log(this.st_stagesize*this.posx+this.posy);
        this.st_map[(this.st_stagesize*this.posx+this.posy)]=this;

    }

    /**
     * draws a single cell
     * @param {Context} pctx canvas context
     * @param {number} pscale scale
     */

    draw(pctx,pscale)
    {
        pctx.beginPath();

        //pctx.strokeStyle=dir_color[this.dir];
        pctx.strokeStyle=this.color;
        pctx.ellipse(pscale+this.posx*pscale*2,pscale+this.posy*pscale*2,pscale,pscale,0,0, pi_2);
        pctx.stroke();
    }

    copy()
    {
        let tcell=new Cell(this.posx,this.posy);
        tcell.dir=this.dir;
        tcell.color=this.color;
        tcell.st_map=this.st_map;
        tcell.st_stagesize=this.st_stagesize;
        tcell.neurons=this.neurons.copy();
        tcell.neurons.a_sensors[na_sensors.s_on]=1;
        tcell.neurons.a_sensors[na_sensors.s_off]=0;
        return tcell;

    }

    mutate()
    {
        this.neurons.mutate();
    }

}
