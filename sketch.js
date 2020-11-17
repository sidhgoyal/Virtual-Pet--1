var database,foodStock,dog,dogImage,dogImage1,dog1;
var food;
var gameState = "end";


function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");  
}

function setup()
{
 database=firebase.database();
  console.log(database);

  createCanvas(800, 700);

  dog = createSprite(650,350,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  

  


  foodStock=database.ref('food'); 
  foodStock.on("value",readStock); 
}


function draw() 
{  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)&& gameState === "end") {
   writeStock(food);
    dog.addImage(dogImage2)
    
  } 
  if (keyWentUp(UP_ARROW)) {
   
    dog.addImage(dogImage)
    
 }

    if(food === 0){
      gameState = "over";
      fill("red")
      textSize(30)
      text("Food Finished",300,350);
    }
   



  textSize(30);
  fill(0);
  text (" Food remaining = " + food,50,50);


  drawSprites();
  

}
function readStock(data)
{
  
    food=data.val();
    console.log(food);
   
}
function writeStock(x) 
{
    
    if (x <= 0) {
      x = 20;
    } else {
      x = x-1;
    }
    database.ref('/').update({
    food : x});
}




