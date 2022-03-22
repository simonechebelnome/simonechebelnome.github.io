// this will get called on load
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    // let's adapt the width and height of our canvas to fit the window
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    
    // so basically ctx is just an instance of this canvas
    // the cool thing is that we can call lot of built-in methods on it
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'gold';
    ctx.lineCap = 'round';
    let size = canvas.width * 0.2;
    
    //! settings for fractals
    const maxLevel = 3;
    const branches = 2;
    
    let sides = 5;
    let scale = 0.5;
    let spread = 0.9;
    let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 + 10);
    // controls
    const randomizeButton = document.getElementById('randomizeButton');
    const sliderSpread = document.getElementById('spread');
    
    sliderSpread.addEventListener('change', function(e){
        spread = e.target.value;
        drawFractal();
    })
    const drawBranch = level => {
        if (level > maxLevel) return;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        ctx.shadowColor = 'rgba(0,0,0,.7)';
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;

        for(let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);
            
            ctx.save();            
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();

            ctx.restore();
        }
    }

    function drawFractal(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.strokeStyle = color;
        for(let i = 0; i < sides; i++){
            ctx.rotate((Math.PI * 2 /sides));
            drawBranch(0);
        }
        ctx.restore();
    }

    drawFractal();

    function randomizeFractal() {
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        drawFractal();
    }
    
    randomizeButton.addEventListener('click', function(){
        randomizeFractal();
        sliderSpread.value = spread;
    });
    
    
    
    ctx.restore();
});