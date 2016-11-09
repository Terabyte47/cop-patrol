
function startGame() {
    patrol.start();

    //create a cop car object
    cop = new component(50, 85, "views/assets/images/patrol.png", 320, 170, "image","img");
}

//create game board and keyboard events
var patrol = {
    canvas : document.getElementById("game_board"),

    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 370;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        /*For key board keys*/
         window.addEventListener('keydown', function (e) {
           	e.preventDefault();
            patrol.keys = (patrol.keys || []);
            patrol.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            patrol.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//define cop car functions and methods
function component(width, height, color, x, y, type, img) {

	this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = patrol.context;
    	var img = new Image();
		img.src = 'http://terabytecoding.co.za/images/patrol.png';
		img.onload = function() {
		  var pattern = ctx.createPattern(img, 'no-repeat');
		  ctx.fillStyle = pattern;
		};

    	ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillRect(0,0, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);

    }
}

//define current state 
function updateGameArea() {
    patrol.clear();
    cop.moveAngle = 0;
    cop.speed = 0;
    if (patrol.keys && patrol.keys[37]) {cop.moveAngle = -1; }
    if (patrol.keys && patrol.keys[39]) {cop.moveAngle = 1; }
    if (patrol.keys && patrol.keys[38]) {cop.speed= 1; }
    if (patrol.keys && patrol.keys[40]) {cop.speed= -1; }
    cop.newPos();
    cop.update();
}