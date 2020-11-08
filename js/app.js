
var containerElement = document.getElementById('container');
var imgOneElement = document.getElementById('image-one');
var imgTwoElement = document.getElementById('image-two');
var imgThreeElement = document.getElementById('image-three');
var listElement = document.getElementById('lists');
var clickCounter = 0;

var allImage = [];

var Photo = function(name){
    this.filepath = `img/${name}`;
    this.title = this.alt = name;
    this.vote = 0;
    //this.view = 0;
    allImage.push(this);
}

new Photo('bag.jpg');
new Photo('banana.jpg');
new Photo('bathroom.jpg');
new Photo('boots.jpg');
new Photo('breakfast.jpg');
new Photo('bubblegum.jpg');
new Photo('chair.jpg');
new Photo('cthulhu.jpg');
new Photo('dog-duck.jpg');
new Photo('dragon.jpg');
new Photo('pen.jpg');
new Photo('pet-sweep.jpg');
new Photo('scissors.jpg');
new Photo('shark.jpg');
new Photo('sweep.png');
new Photo('tauntaun.jpg');
new Photo('unicorn.jpg');
new Photo('water-can.jpg');
new Photo('wine-glass.jpg');
new Photo('usb.gif');

function randomIndexGenerator(){
    return Math.floor(Math.random() * allImage.length);
}
 function render(){
     firstRandomIndexNumber = randomIndexGenerator();
     secondRandomIndexNumber = randomIndexGenerator();
     thirdRandomIndexNumber = randomIndexGenerator();
      
     while(secondRandomIndexNumber === firstRandomIndexNumber){
         secondRandomIndexNumber = randomIndexGenerator();
}        
    while(thirdRandomIndexNumber === secondRandomIndexNumber){
         thirdRandomIndexNumber = randomIndexGenerator();
}        
    while(firstRandomIndexNumber === thirdRandomIndexNumber){
        firstRandomIndexNumber = randomIndexGenerator();
        
    }
    imgOneElement.src = allImage[secondRandomIndexNumber].filepath;
    imgOneElement.title = allImage[secondRandomIndexNumber].title;
    imgOneElement.alt = allImage[secondRandomIndexNumber].alt;

    imgTwoElement.src = allImage[thirdRandomIndexNumber].filepath;
    imgTwoElement.title = allImage[thirdRandomIndexNumber].title;
    imgTwoElement.alt = allImage[thirdRandomIndexNumber].alt;

    imgThreeElement.src = allImage[firstRandomIndexNumber].filepath;
    imgThreeElement.title = allImage[firstRandomIndexNumber].title;
    imgThreeElement.alt = allImage[firstRandomIndexNumber].alt;

 }
 
  function imageClick(event){
      clickCounter++;
      if(clickCounter<25){
        var title = event.target.title;

        for(var i=0; i<allImage.length; i++){
            if(allImage[i].title === title){
                allImage[i].vote++;
            }
            render();
            
      }

 }else{
  for(var i=0; i<allImage.length; i++){
      var liElement=document.createElement('li');
      liElement.textContent= ` ${allImage[i].title} :${allImage[i].vote} vote.`;
      listElement.appendChild(liElement);
     
  }
  
    }   
  }
containerElement.addEventListener('click', imageClick);

render();