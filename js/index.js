// The HTML <canvas> element is used to draw graphics, on the fly, via scripting (usually JavaScript).
// The <canvas> element is only a container for graphics. You must use a script to actually draw the graphics.
const canvas=document.querySelector('canvas');
// The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not 
// supported, or the canvas has already been set to a different context mode.
const c=canvas.getContext('2d')
canvas.width=1900
canvas.height=890 

c.fillRect(0,0,canvas.width,canvas.height)
const gravity= 0.2

class Sprite{
    /*passing object in moving {left,right/up,down}*/
     //volacity it's for showa in what derection the object is moving
    constructor({position,velocity,color,offset}){

        this.position=position       
        this.velocity=velocity
        this.height=150
        this.width=50
        this.lastkey
        this.attackBox={
            position:{
                x:this.position.x,
                y:this.position.y

            },
            offset,
            width:100,
            height:50,
          
        }
        this.color=color
        this.isAttacking

    }

    //methode for the character 
    //updaet ur charactere
    //get the top and adet to the diff to stop the character






    draw(){
        c.fillStyle = 'red'
        c.fillRect( this.position.x, this.position.y ,  this.width ,this.height)




        //attacckbox
       
         if(this.isAttacking)
        {
            c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)

             }

        
        }
     update(){
             this.draw()     
             this.attackBox.position.x=this.position.x -this.attackBox.offset.x
             this.attackBox.position.y=this.position.y       
             this.position.y += this.velocity.y
             this.position.x += this.velocity.x 
             if(this.position.y+this.height+this.velocity.y>=canvas.height)
             {
                this.velocity.y = 0
             } else  this.velocity.y+=gravity
        }

        attack(){
            this.isAttacking=true
            setTimeout(()=>{this.isAttacking=false},100)
                
        }



}
////create players // player one get new instance pf classe Sprite
const player= new Sprite({
    /*Moving*right/lef */
    position:{
         x:100,//
         y:0
    },
    /*Moving * UP/Down */
    velocity:{
         x:0,
         y:0
    },
    offset:{
        x:0,
        y:0
    }
})


const enemy=new Sprite({
    /*Moving*right/lef */
    position:{
    x:900,
    y:100
    },
    /*Moving * UP/Down */
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:50,
        y:0 
    }
})

//create a object for all button 
const keys={
    q:{
        pressed:false
    },
    d:{
        pressed:false
    },
    z:{
        pressed:false
    },
    s:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    },
    ArrowDown:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    
   
}


function recctanggularCollision({recangle1,rectangle2}){
    return (
        recangle1.attackBox.position.x + recangle1.attackBox.width>=rectangle2.position.x  && 
        recangle1.attackBox.position.x <=rectangle2.position.x+rectangle2.width &&
        recangle1.attackBox.position.y+recangle1.attackBox.height>=rectangle2.position.y &&
        recangle1.attackBox.position.y>=rectangle2.position.y
    )
}





//create a annimation infitloop 
function animate(){
    window.requestAnimationFrame(animate)    
     c.fillStyle = 'black'
     c.fillRect( 0 ,0 , canvas.width , canvas.height)
    //create instence of player in the infinit lopp to start game
    player.update()
    enemy.update()

    //test if you push the botton on/of  for moving
    player.velocity.x = 0
    //player condition
    if(keys.q.pressed && player.lastkey==='q')
    {
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastkey==='d')
    {
        player.velocity.x = 5
    } else if (keys.z.pressed && player.lastkey==='z' && player.position.y+player.height>800)
    {
        player.velocity.y = -5
    } else if (keys.s.pressed && player.lastkey==='s'&& player.position.y+player.height<=canvas.height)
    {
        player.velocity.y = 5
    }
    


    //enemy condition
    enemy.velocity.x=0

    if (keys.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft')
    {
        enemy.velocity.x = -5

    } else if (keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight')
    {
        enemy.velocity.x = 5

    }  else if (keys.ArrowUp.pressed && enemy.lastkey==='ArrowUp' && enemy.position.y+enemy.height>800)
    {
        enemy.velocity.y = -5

    }   else if (keys.ArrowDown.pressed && enemy.lastkey==='ArrowDown' && enemy.position.y+enemy.height<=canvas.height)
    {
        enemy.velocity.y = 5
    }  


    //colusion
    if(player.isAttacking)
    {
        console.log('attack')
        player.isAttacking=false


    }













}
animate()
//event lisner there is click /touche / wee want keyword
window.addEventListener('keydown',(event)=>
{
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'q':  
            keys.q.pressed = true
            player.lastkey='q'
            break
         case 'z':  
            keys.z.pressed= true
            player.lastkey='z'
            break
        case 's':  
            keys.s.pressed= true
            player.lastkey='s'

            break

            //keys for enemy
        case 'ArrowRight':  
            enemy.lastkey='ArrowRight'
            keys.ArrowRight.pressed= true

            break
        case 'ArrowLeft': 
            enemy.lastkey='ArrowLeft'
            keys.ArrowLeft.pressed= true
            break
        case 'ArrowUp':  
            enemy.lastkey='ArrowUp'

            keys.ArrowUp.pressed= true
            break
        case 'ArrowDown':  
            enemy.lastkey='ArrowDown'

            keys.ArrowDown.pressed= true

            break
    }
    console.log(event.key)    
})
window.addEventListener('keyup',(event)=>
{


    //keys playe
    switch(event.key){
        case 'd':
            keys.d.pressed = false
           
            break
        case 'q': 
            keys.q.pressed= false
            
            break
        case 'z':  
            keys.z.pressed=false
           
            break
         case 's':  
            keys.s.pressed=false
           
            break

        case ' ':
            player.attack()
            break
       
    }

    //enemy keys
    switch(event.key){
        case 'ArrowRight':  
            keys.ArrowRight.pressed= false

            break
        case 'ArrowLeft':  
            keys.ArrowLeft.pressed= false
        break
        case 'ArrowUp':  
        keys.ArrowUp.pressed=false
       
        break
     case 'ArrowDown':  
        keys.ArrowDown.pressed=false
       
        break
          case ' ':
            player.attack()
            break
   

    }
    



})































