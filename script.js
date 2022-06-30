console.log("Images activity")

const WIDTH = 600
const HEIGHT = 500
const SHIELD_WIDTH = 80
const SHIELD_HEIGHT = 30
const SHIELD_RADIUS = 40
const SHIELD_DIAMETER = SHIELD_RADIUS * 2
const SHIELD_COLOR = "blue"
const SHIELD_HIT_COLOR = "darkCyan"
const NUMBER_OF_CARS = 10
const CARS_WIDTH = 50
const CARS_HEIGHT = 80
const CARS_Y_SPEED = 4
const CARS_COLOR = "white"
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 60

var ctx

var shieldXPosition = 30
var shieldYPosition = 30
var shieldColor = "blue"
 var shieldImage = new Image()
 shieldImage.src = "Images/shield.png"

var carsXPosition
var carsYPosition
var carsArray = []
var carsImage = new Image()
carsImage.src = "Images/cars.png"

var playerXPosition = 300
var playerSpeed = 2
var playerColor = "red"
var playerImage = new Image();  
playerImage.src = 'Images/player.png'

var backgroundImage = new Image();  
backgroundImage.src = 'Images/background.jpg';

window.onload=startCanvas

function startCanvas(){
	
	ctx=document.getElementById("myCanvas").getContext("2d")

	timer = setInterval(updateCanvas, 10)
	
	var carNumber = 0
	while(carNumber < NUMBER_OF_CARS){
		carsArray.push(new cars(Math.random()* WIDTH))
		carNumber++;
	}
}

function updateCanvas(){

	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	ctx.drawImage(backgroundImage,0,0);

	var carNumber = 0
	while (carNumber < carsArray.length){ 
		carsArray[carNumber].movecars()
		carNumber ++ 
	}
	
	moveplayer()
	
	shieldColor = "Orange"
	var carNumber = 0
	while (carNumber < carsArray.length){

	if (shieldHitRectangular(carsArray[carNumber].xPosition, carsArray[carNumber].yPosition)){
		 shieldColor = SHIELD_HIT_COLOR
		 carsArray[carNumber].yPosition = Math.random()*-HEIGHT
	}
	carNumber ++ 
	}
	
	ctx.fillStyle=CARS_COLOR
	var carNumber = 0
	while (carNumber < carsArray.length){


		ctx.drawImage(carsImage,carsArray[carNumber].xPosition, carsArray[carNumber].yPosition,CARS_WIDTH,CARS_HEIGHT)
		carNumber ++ 
	}

	ctx.fillStyle=playerColor
	ctx.drawImage(playerImage,playerXPosition,HEIGHT - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);

	ctx.fillStyle=shieldColor
	ctx.drawImage(shieldImage,shieldXPosition, shieldYPosition, SHIELD_WIDTH, SHIELD_HEIGHT);

}

class cars{
	
	constructor(x){

		this.xPosition = x
		this.yPosition = Math.random()* - HEIGHT - CARS_HEIGHT;
	}

	movecars(){
		// Move the cars - Change it's position
		this.yPosition += CARS_Y_SPEED
		///this.yPosition = 200 // HITBOX TESTING uncomment this line
		// When cars it's the bottom, restart at the top
		if(this.yPosition > HEIGHT){
			this.yPosition = Math.random() * - HEIGHT - CARS_HEIGHT
		}
	}
}

function shieldHitRectangular(carsX, carsY){

	var shieldHitLeft = shieldXPosition
	var shieldHitRight = shieldXPosition + SHIELD_WIDTH
	var shieldHitTop = shieldYPosition
	var shieldHitBottom = shieldYPosition + SHIELD_HEIGHT
	
	var carsHitLeft = carsX
	var carsHitRight = carsX + CARS_WIDTH
	var carsHitBottom = carsY + CARS_HEIGHT
	var carsHitTop = carsY

	var shieldHitHeight = shieldHitBottom-shieldHitTop
	var shieldHitWidth = shieldHitRight-shieldHitLeft
	var carsHitWidth = carsHitRight-carsHitLeft
	var carsHitHeight = carsHitBottom-carsHitTop

	if(
		shieldHitRight > carsHitLeft 
		&& shieldHitLeft < carsHitRight
		&& shieldHitTop < carsHitBottom 
		&& shieldHitBottom > carsHitTop
	){
		return(true)
	}else{
		return(false)
	}
}

function shieldHitCircular(carsX, carsY){

	var shieldHitX = shieldXPosition
	var shieldHitY = shieldYPosition
	var shieldHitRadius = SHIELD_RADIUS

	var carsHitX = carsX
	var carsHitY = carsY
	var carsHitRadius = CARS_WIDTH/2

	ctx.strokeStyle = "rgb(0,255,0)"
	ctx.beginPath();
	ctx.arc(shieldHitX, shieldHitY, shieldHitRadius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(carsHitX, carsHitY, carsHitRadius, 0, 2 * Math.PI);
	ctx.stroke();

	var xDist = shieldHitX - carsHitX
	var yDist = shieldHitY - carsHitY

	var dist = Math.sqrt(xDist*xDist + yDist*yDist)
	if (dist < shieldHitRadius + carsHitRadius){
		return(true)
	}else{
		return(false)
	}
}

window.addEventListener('mousemove', mouseMovedFunction)

function mouseMovedFunction(mouseEvent){
	shieldXPosition = mouseEvent.offsetX
	shieldYPosition = mouseEvent.offsetY
}

function moveplayer(){
	playerXPosition += playerSpeed
	
	if (playerXPosition > WIDTH-PLAYER_WIDTH){
		playerSpeed = -(3 + Math.random()*2-1)
	}
		
	if (playerXPosition < 0){
		playerSpeed = 3 + Math.random()*2-1
	}	
}
