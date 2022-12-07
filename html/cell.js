/**
 * Cell class represents a singular cell
 */

const n_sensors={
    d_off:0,
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

const n_actuators={
    
    a_up:0,
    a_left:1,
    a_down:2,
    a_right:3
    
}

class Cell
{
    static st_map;
    static st_stagesize;

    posx=0;
    posy=0;
    sensors=[];
    actuators=[];

    dir=0;

    /**
     * 
     * @param {number} px inittial x position
     * @param {number} py initial y position
     */

    constructor (px,py)
    {
        this.posx=Math.floor(px);
        this.posy=Math.floor(py);
        this.sensors[n_sensors.s_on]=1;
        this.sensors[n_sensors.s_off]=0;

        let t=Math.floor(Math.random()*4.0);
        this.dir=t;
        

    //    console.log(typeof(this.posx));

    }

    /**
     * updates a cell
     */

    update()
    {
       // console.log(typeof(this.posx));
        var dx=0;
        var dy=0;
        this.actuators=[0,0,0,0];

        this.actuators[this.dir]=this.sensors[n_sensors.s_on];

       // console.log(this.actuators);
        if ((this.actuators[n_actuators.a_right]-this.actuators[n_actuators.a_left])>0.5)
        {
         //   console.log("6");
            if(this.posx<this.st_stagesize)
            {
                dx=1;
           //     console.log("8");
            }
        }

        if ((this.actuators[n_actuators.a_right]-this.actuators[n_actuators.a_left])<-0.5)
        {
         //   console.log("6");
            if(this.posx>0)
            {
                dx=-1;
           //     console.log("8");
            }
        }        

        if ((this.actuators[n_actuators.a_down]-this.actuators[n_actuators.a_up])>0.5)
        {
         //   console.log("6");
            if(this.posy<this.st_stagesize)
            {
                dy=1;
           //     console.log("8");
            }
        }

        if ((this.actuators[n_actuators.a_down]-this.actuators[n_actuators.a_up])<-0.5)
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
        switch(this.dir)
        {
            case (0):pctx.strokeStyle = 'blue';break;
            case (1):pctx.strokeStyle = 'red';break;
            case (2):pctx.strokeStyle = 'green';break;
            case (3):pctx.strokeStyle = 'orange';break;
            
        }
        
        pctx.ellipse(this.posx*pscale,this.posy*pscale,pscale*0.5,pscale*0.5,0,0,Math.PI*2);
        pctx.stroke();
    }

}
