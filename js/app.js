'use strict';

var containerElement = document.getElementById('container');
var imgOneElement = document.getElementById('image-one');
var imgTwoElement = document.getElementById('image-two');
var imgThreeElement = document.getElementById('image-three');
var listElement = document.getElementById('lists');
var clickCounter = 0;
var previousNumber = [];
var allImage = [];
var allNamesArray = [];
var finalVotesArray = [];
var finalViewsArray = [];

var Photo = function (name, endOfFile) {
    this.filepath = `img/${name}.${endOfFile}`;
    this.alt = this.title = name;
    this.vote = 0;
    this.view = 0;
    allImage.push(this);
}

new Photo('bag', 'jpg');
new Photo('banana', 'jpg');
new Photo('bathroom', 'jpg');
new Photo('boots', 'jpg');
new Photo('breakfast', 'jpg');
new Photo('bubblegum', 'jpg');
new Photo('chair', 'jpg');
new Photo('cthulhu', 'jpg');
new Photo('dog-duck', 'jpg');
new Photo('dragon', 'jpg');
new Photo('pen', 'jpg');
new Photo('pet-sweep', 'jpg');
new Photo('scissors', 'jpg');
new Photo('shark', 'jpg');
new Photo('sweep', 'png');
new Photo('tauntaun', 'jpg');
new Photo('unicorn', 'jpg');
new Photo('water-can', 'jpg');
new Photo('wine-glass', 'jpg');
new Photo('usb', 'gif');

function randomIndexGenerator() {
    return Math.floor(Math.random() * allImage.length);
}
function render() {
    var firstRandomIndexNumber = randomIndexGenerator();
    var secondRandomIndexNumber = randomIndexGenerator();
    var thirdRandomIndexNumber = randomIndexGenerator();

    while (secondRandomIndexNumber === firstRandomIndexNumber || previousNumber.includes(secondRandomIndexNumber)) {
        secondRandomIndexNumber = randomIndexGenerator();
    }
    allImage[secondRandomIndexNumber].view++;
    while (thirdRandomIndexNumber === secondRandomIndexNumber || previousNumber.includes(thirdRandomIndexNumber)) {
        thirdRandomIndexNumber = randomIndexGenerator();
    }
    allImage[thirdRandomIndexNumber].view++;
    while (firstRandomIndexNumber === thirdRandomIndexNumber || previousNumber.includes(firstRandomIndexNumber)) {
        firstRandomIndexNumber = randomIndexGenerator();

    }
    allImage[firstRandomIndexNumber].view++;
    // console.log(allImage[firstRandomIndexNumber].view,allImage[secondRandomIndexNumber].view,allImage[thirdRandomIndexNumber].view);
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

function imageClick(event) {
    clickCounter++;
    if (clickCounter < 5) {
        var title = event.target.title;

        for (var i = 0; i < allImage.length; i++) {
            if (allImage[i].title === title) {
                allImage[i].vote++;
            }


        }
      
        render();

    }
    else {
        containerElement.removeEventListener('click', imageClick);
        for (var i = 0; i < allImage.length; i++) {
            var liElement = document.createElement('li');
            liElement.textContent = ` ${allImage[i].alt} : ${allImage[i].vote} vote and ${allImage[i].view} views.`;
            listElement.appendChild(liElement);

        }
       

        generateChartData();
        generateChart();
    }
}
containerElement.addEventListener('click', imageClick);

function generateChartData() {
     if (localStorage.getItem('image')){
         //console.log('pull from storage');
        var imageFromLocalStorage = localStorage.getItem('image');
        var parsedImage = JSON.parse(imageFromLocalStorage);
        //generateNewImage(parsedImage)
        for (var i = 0; i < allImage.length; i++) {
            allImage[i].vote += parsedImage[i].vote
            allImage[i].view += parsedImage[i].view
            allNamesArray.push(allImage[i].alt);
            finalVotesArray.push(allImage[i].vote);
           
    
        }
        getImageInLocalStorage();
     }
     else{
         //console.log('not pulled from storage');
        for (var i = 0; i < allImage.length; i++) {
            allNamesArray.push(allImage[i].alt);
            finalVotesArray.push(allImage[i].vote);
           
    
        }
        getImageInLocalStorage();
     }

    

}
function getImageInLocalStorage() {
    var stringImage = JSON.stringify(allImage);
    localStorage.setItem('image', stringImage)
}

function generateNewImage(image){
    //allImage = [];
    for(var i=0; i<image.length; i++){
        console.log(image[i]);
        new Photo(image[i].name, image[i].endOfFile);
    }
}

function generateChart() {

    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.canvas.width = 900;
    ctx.canvas.height = 300; 
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allNamesArray,
            datasets: [{
                label: 'votes',
                data: finalVotesArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

render();

