/**
 * Cell class represents a singular cell
 */

class Cell
{
    posx;
    posy;

    /**
     * 
     * @param {number} px inittial x position
     * @param {numer} py initial y position
     */

    constructor (px,py)
    {
        this.posx=(px).toFixed(0);
        this.posy=(py).toFixed(0);
    }

    /**
     * updates a cell
     */

    update()
    {

    }

    /**
     * draws a single cell
     * @param {Context} pctx canvas context
     * @param {number} pscale scale
     */

    draw(pctx,pscale)
    {
        pctx.beginPath();
        pctx.ellipse(this.posx*pscale,this.posy*pscale,pscale,pscale,0,0,Math.PI*2);
        pctx.stroke();
    }

}
