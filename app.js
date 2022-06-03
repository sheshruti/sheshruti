var canvas = document.getElementById("home");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
//canvas.style.backgroundColor = "blue";
let mouse = {
    x: null ,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x ;
        mouse.y = event.y ;
        
    }
);

class Particle {
    constructor(x , y , directionX , directionY, size , color){
        this.x = x;
        this.y = y ;
        this.directionX = directionX ;
        this.directionY = directionY ;
        this.size = size ;
        this.color = color ;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x , this.y ,this.size , 0 , Math.PI * 2 );
        ctx.fillStyle = 'rgb(225,43,225)';
        ctx.fill();
    }

    update(){
        if(this.x > canvas.width || this.x <0){
            this.directionX = -this.directionX ;
        }
        if(this.y > canvas.height || this.y <0){
            this.directionY = -this.directionY ;
        }

        //collision detection
        let dx = mouse.x - this.x ;
        let dy = mouse.y - this.y ;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.radius){
            if(mouse.x < this.x && this.x <canvas.width - this.size*10){
                this.x += 10 ;
            }
            if(mouse.x > this.x && this.x > this.size*10){
                this.x -= 10 ;
            }
            if(mouse.y < this.y && this.y <canvas.height - this.size*10){
                this.y += 10 ;
            }
            if(mouse.y > this.y && this.y > this.size*10){
                this.y -= 10 ;
            }
        } 

        this.x += this.directionX;
        this.y += this.directionY ;

        this.draw();
    }
}

function init(){
    particlesArray = [];
    let noOfParticle = (canvas.width*canvas.height)/9000 ;
    for(let i = 0 ; i < noOfParticle ; i++){
        let size = (Math.random()*1 ) + 1 ;
        let x = (Math.random()*((innerWidth - 2*size) - (2*size)) + 2*size );
        let y = (Math.random()*((innerHeight - 2*size) - (2*size)) + 2*size );
        let directionX = (Math.random()*3) - 1.5 ;
        let directionY = (Math.random()*3) - 1.5 ;
        let color = '#FFFFFF';

        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}
//animate

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0 , 0 , innerWidth, innerHeight);

    for(let i = 0 ; i < particlesArray.length ; i++){
        particlesArray[i].update();
    }
    connect();
}

function connect(){
    for(let a = 0 ; a < particlesArray.length ; a++){
        for(let b = a ; b < particlesArray.length ; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x)*(particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y)*(particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width/7)*(canvas.height/7)){
                ctx.strokeStyle = 'rgb(24,43,225,1)';
                ctx.lineWidth = 0.5 ;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
init();
animate();

// const test = document.getElementById("test-box").getBoundingClientRect() ;
// var top = test.top ;
// var left = test.left ;
// console.log(top ,left);