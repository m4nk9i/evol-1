/**
 * class Neural - basic neural network - one layer
 */

class Neural
{
    a_sensors=[];
    a_layer1=[];
    a_actuators=[];
    n_sensors=0;
    n_actuators=0;
    n_layer1=0;

    a_conn_l1=[];
    a_conn_ac=[];

/**
 * constructor  
 * @param {number} p_sensors number of sensors
 * @param {number} p_layer1 number of neurons on 1st layer
 * @param {number} p_actuators number of actuators
 */
    constructor (p_sensors,p_layer1,p_actuators)
    {
        this.n_actuators=p_actuators;
        this.n_layer1=p_layer1;
        this.n_sensors=p_sensors;
 

        for (let i=0;i<this.n_layer1;i++)
        {
            this.a_layer1[i]=0;
            for (let j=0;j<this.n_sensors;j++)
            {
                this.a_conn_l1[i*this.n_layer1+j]=0;
            }
        }


        for (let i=0;i<this.n_actuators;i++)
        {
            this.a_actuators[i]=0;
            for (let j=0;j<this.n_layer1;j++)
            {
                this.a_conn_ac[i*this.n_actuators+j]=0;
            }
        }

        for (let i=0;i<this.n_sensors;i++)
        {
            this.a_sensors[i]=0;
        }

    }

    /**
     * calculates new step of neural network
     */

    update()
    {
        //this.a_sensors=[0,1,0,0,0,0,0,0,0,0]

        for (let i=0;i<this.n_layer1;i++)
        {
            this.a_layer1[i]=0;
            for (let j=0;j<this.n_sensors;j++)
            {
                this.a_layer1[i]+=this.a_sensors[j]*this.a_conn_l1[i*this.n_layer1+j];
            }
        }


        for (let i=0;i<this.n_actuators;i++)
        {
            this.a_actuators[i]=0;
            for (let j=0;j<this.n_layer1;j++)
            {
                this.a_actuators[i]+=this.a_layer1[j]*this.a_conn_ac[i*this.n_actuators+j];
            }
        }

    }

    /**
     * prints network state to console
     */

    printout() {
        console.log("sensors "+this.a_sensors);
        console.log("layer1 " +this.a_layer1);
        console.log("actuators "+this.a_actuators);
        console.log("conn1 "+this.a_conn_l1);
        console.log("conn_ac:"+this.a_conn_ac);

    }

    radomize()
    {
        for (let i=0;i<this.n_layer1;i++)
        {
            for(let j=0;j<this.n_actuators;j++)
            {
                this.a_conn_ac[j*this.n_actuators+i]=Math.random();
            }
            for(let j=0;j<this.n_sensors;j++)
            {
                this.a_conn_l1[i*this.n_layer1+j]=Math.random();
            }
        }
    }

    copy()
    {   
        var t_net=new Neural(this.n_sensors,this.n_layer1,this.n_actuators);
        for (let i=0;i<this.a_conn_ac.length;i++)t_net.a_conn_ac[i]=this.a_conn_ac[i];
        for (let i=0;i<this.a_conn_l1.length;i++)t_net.a_conn_l1[i]=this.a_conn_l1[i];
        return t_net;
    }

    mutate()
    {
        for(let i=0;i<this.a_conn_ac.length;i++)
        {
            this.a_conn_ac[i]+=(Math.random()*0.06-0.03);
            if (this.a_conn_ac[i]<0.0) this.a_conn_ac=0;
            if (this.a_conn_ac[i]>1.0) this.a_conn_ac=0;
        }
        for(let i=0;i<this.a_conn_l1.length;i++)
        {
            this.a_conn_l1[i]+=(Math.random()*0.06-0.03);
            if (this.a_conn_l1[i]<0.0) this.a_conn_l1=0;
            if (this.a_conn_l1[i]>1.0) this.a_conn_l1=0;
        }
        //this.a_conn_l1[1]=1;        //TODO:wywalic
        //this.a_conn_ac[t*4]=1; 
    }
}