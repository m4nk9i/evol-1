
const pi_2=Math.PI*2;

/*
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
*/

class vec2d
{
    x=0;
    y=0;
    constructor(px,py)
    {
        this.x=px;
        this.y=py;
    }

    mult (pf)
    {
        this.x*=pf;
        this.y*=pf;
    }

    add (pv)
    {
        this.x+=pv.x;
        this.y+=pv.y;
    }

    toStr()
    {
        return ("["+this.x+","+this.y+"]");
    }

}
class leg
{
    t=0;
    len_m=[0.50,0.50,0.30];
    mass_kg=[1,1,1];
    tor_Nm=[0,0,0];
    alfa_rad=[1.5,-0.2,1.5];
    omega_rads=[0,0,0];
    epsilon_rads2=[0,0,0];
    color="blue";
    F01;
    F12;
    F23;
    F3gA;
    F3gB;
    x1;
    x2;
    x3;
    
    constructor ()
    {
        this.F01=new vec2d(0.0,0.0);
        this.F12=new vec2d(0.0,0.0);
        this.F23=new vec2d(0.0,0.0);
        this.F3gA=new vec2d(0.0,0.0);
        this.F3gB=new vec2d(0.0,0.0);
        this.x1=0;
        this.x2=0;
        this.x3=0;


    }
    calculate(dt)
    {
        this.t+=dt;

        this.epsilon_rads2[0]=this.tor_Nm[0];
        this.epsilon_rads2[1]=this.tor_Nm[1];
        this.epsilon_rads2[2]=this.tor_Nm[2];

        this.omega_rads[0]+=this.epsilon_rads2[0]*dt;
        this.omega_rads[1]+=this.epsilon_rads2[1]*dt;
        this.omega_rads[2]+=this.epsilon_rads2[2]*dt;
        

        this.alfa_rad[0]+=this.omega_rads[0]*dt;
        this.alfa_rad[1]+=this.omega_rads[1]*dt;
        this.alfa_rad[2]+=this.omega_rads[2]*dt;

        if (this.alfa_rad[1]>0) this.alfa_rad[1]=0;
        if (this.alfa_rad[2]>1.5) this.alfa_rad[2]=1.5;
        if (this.alfa_rad[2]<0.5) this.alfa_rad[2]=0.5;

        //this.alfa_rad[0]+=0.01;
        //this.alfa_rad[1]-=0.007;

        this.x1=Math.sin(this.alfa_rad[0])*this.len_m[0]*0.5;
        this.y1=Math.cos(this.alfa_rad[0])*this.len_m[0]*0.5;
        this.x2=Math.sin(this.alfa_rad[0]+this.alfa_rad[1])*this.len_m[1]*0.5;
        this.y2=Math.cos(this.alfa_rad[0]+this.alfa_rad[1])*this.len_m[1]*0.5;
        this.x3=Math.sin(this.alfa_rad[0]+this.alfa_rad[1]+this.alfa_rad[2])*this.len_m[2]*0.25;
        this.y3=Math.cos(this.alfa_rad[0]+this.alfa_rad[1]+this.alfa_rad[2])*this.len_m[2]*0.25;
        //this.F23=


        this.F3gB.y=0;
        this.F23.y=0;
        this.F12.y=0;
        this.F01.y=0;
        if((this.y1*2.0+this.y2*2.0+this.y3*3.0)>0.8)
        {
            this.F3gB.y=this.mass_kg[0]+this.mass_kg[1]+this.mass_kg[3];
            this.F23.y=this.F3gB.y;
            this.F12.y=this.F3gB.y;
            this.F01.y=this.F3gB.y;

        }

        this.tor_Nm[0]=-this.x1*this.mass_kg[0]-this.x2*this.mass_kg[1]-this.x3*this.mass_kg[2];
        this.tor_Nm[1]=-this.x2*this.mass_kg[1]-this.x3*this.mass_kg[2];
        this.tor_Nm[2]=-this.x3*this.mass_kg[2];



        //console.log(this.alfa_rad);
        //console.log(this.x1+" "+this.x2);

    }

    draw(pctx)
    {
        pctx.beginPath();
        pctx.strokeStyle=this.color;
        pctx.save();
        pctx.rotate(-this.alfa_rad[0]);
        //pctx.translate(-5.0,this.len_m[0]*50.0);
        pctx.rect(-5,0,10,this.len_m[0]*100.0);
        pctx.translate(0,this.len_m[1]*100.0);    
        pctx.rotate(-this.alfa_rad[1]);
        pctx.rect(-2.5,0,5,this.len_m[1]*100.0);
        pctx.translate(0,this.len_m[1]*100.0);
        pctx.rotate(-this.alfa_rad[2]);
        pctx.rect(-2.5,-this.len_m[2]*25.0,5,this.len_m[2]*100.0);
        pctx.stroke();
        pctx.restore();
        pctx.beginPath();
        pctx.moveTo(this.x1*100.0,0);
        pctx.lineTo(this.x1*100.0,100);
        pctx.moveTo((this.x1*2.0+this.x2)*100.0,0);
        pctx.lineTo((this.x1*2.0+this.x2)*100.0,100);
        pctx.moveTo((this.x1*2.0+this.x2*2.0+this.x3)*100.0,0);
        pctx.lineTo((this.x1*2.0+this.x2*2.0+this.x3)*100.0,100);

        pctx.moveTo((this.x1*2.0+this.x2*2.0-this.x3)*100.0,0);
        pctx.lineTo((this.x1*2.0+this.x2*2.0-this.x3)*100.0,100);
        pctx.moveTo((this.x1*2.0+this.x2*2.0+this.x3*3.0)*100.0,0);
        pctx.lineTo((this.x1*2.0+this.x2*2.0+this.x3*3.0)*100.0,100);

        pctx.moveTo(0,(this.y1*2.0+this.y2*2.0-this.y3)*100.0);
        pctx.lineTo(100,(this.y1*2.0+this.y2*2.0-this.y3)*100.0);
        pctx.moveTo(0,(this.y1*2.0+this.y2*2.0+this.y3*3.0)*100.0);
        pctx.lineTo(100,(this.y1*2.0+this.y2*2.0+this.y3*3.0)*100.0);



        /*
        pctx.ellipse(this.x1*100.0,0,10,10,0,0,Math.PI);
        pctx.ellipse((this.x1+this.x2)*100.0,0,10,10,0,0,Math.PI);        
        pctx.ellipse((this.x1+this.x2+this.x3)*100.0,0,10,10,0,0,Math.PI);
        */
        pctx.stroke();


    }
}


/**
 * AIWalker class represents a walker
 */

class AIWalker
{
    static st_map;
    static st_stagesize;
    leg_r;
    leg_l;

    posx=0;
    posy=0;
    
    neurons;

    dir=0;
    color="black";

    constructor ()
    {
        this.leg_l=new leg();
        this.leg_r=new leg();
        this.leg_l.color="red";
        this.leg_l.alfa_rad=[-1.2,-0.2,1.5];
        /*
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
*/
    }

    /**
     * updates a cell
     */

    update(pstep)
    {
        this.leg_l.calculate(pstep);
        this.leg_r.calculate(pstep);
        /*
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
*/
    }

    /**
     * draws a single cell
     * @param {Context} pctx canvas context
     * @param {number} pscale scale
     */

    draw(pctx)
    {
        /*
        pctx.beginPath();

        //pctx.strokeStyle=dir_color[this.dir];
        pctx.strokeStyle=this.color;
        pctx.ellipse(pscale+this.posx*pscale*2,pscale+this.posy*pscale*2,pscale,pscale,0,0, pi_2);
        pctx.stroke();
*/
        pctx.save();
        pctx.translate(100,100);
        this.leg_l.draw(pctx);
        this.leg_r.draw(pctx);
        pctx.restore();
    }

    copy()
    {
        /*
        let tcell=new Cell(this.posx,this.posy);
        tcell.dir=this.dir;
        tcell.color=this.color;
        tcell.st_map=this.st_map;
        tcell.st_stagesize=this.st_stagesize;
        tcell.neurons=this.neurons.copy();
        tcell.neurons.a_sensors[na_sensors.s_on]=1;
        tcell.neurons.a_sensors[na_sensors.s_off]=0;
        return tcell;
*/
    }

    mutate()
    {
        /*
        this.neurons.mutate();
        */
    }

}
