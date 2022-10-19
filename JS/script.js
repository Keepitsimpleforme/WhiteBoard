const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cc1 = document.getElementsByTagName('input')[0];
const pencil_button = document.getElementById('pencil');
const eraser_button = document.getElementById('eraser');
const line_button = document.getElementById('line');
const canvasCont = document.getElementById('canvas-cont'); 
const bgPicker = document.getElementById('bg-picker') ; 
const pencilSlide = document.getElementById('pencil-slide') ;
const eraserSlide = document.getElementById('eraser-slide') ; 
const lineSlide = document.getElementById('line-slide');
const lineColor = document.getElementById('line-color') ; 
const canvasPos = canvasCont.getBoundingClientRect() ;

let restore_array = []
let redo_array = []
let index = -1;
let rIndex = -1;

canvas.width = window.innerWidth ; 
canvas.height = window.innerHeight;

let cancolor = "lightgrey";
canvas.style.backgroundColor = cancolor;


var hideSlide = () => {
  var arr = [canvasCont,bgPicker];  
  arr.forEach((elem)=>{
    elem.addEventListener('click',()=>{
    eraserSlide.style.display = "none" ; 
    lineSlide.style.display = "none" ;
    pencilSlide.style.display = "none" ; })

  })

}

hideSlide() ; 



// adding pencil slider functionality

var pencilLeftSlider = () => {
  const pencil = document.getElementById('pencil') ;
  const pencilSlide = document.getElementById('pencil-slide') ;
  const eraserSlide = document.getElementById('eraser-slide') ; 
  const lineSlide = document.getElementById('line-slide');
  
  const pencilPos = pencil.getBoundingClientRect() ; 
  var slideTop =Math.round( pencilPos.y ); 
  var slideBottom =  Math.round(pencilPos.x +  pencilPos.width);
  pencilSlide.style.top = slideTop+'px';
  pencilSlide.style.left = slideBottom+'px';

  pencil.addEventListener('click',()=>{
    eraserSlide.style.display = "none" ; 
    lineSlide.style.display = "none" ; 
    
    if (pencilSlide.style.display == null || pencilSlide.style.display == "none" ||
    pencilSlide.style.display == "" ||
    pencilSlide.style.display == undefined  
       )
       {
      pencilSlide.style.top = slideTop+'px';
      pencilSlide.style.left = slideBottom+'px';
      pencilSlide.style.display = "flex";
    }
  else {
    pencilSlide.style.display = "none" ; 
  }

  })

  // pencil.addEventListener('blur',() =>{
  //   pencilSlide.style.display = "none";
  // })
}


var lineLeftSlider = () => {

  const lineSlide = document.getElementById('line-slide') ;
  const linePos = line_button.getBoundingClientRect() ; 
  const pencilSlide = document.getElementById('pencil-slide') ;
  const eraserSlide = document.getElementById('eraser-slide') ; 
  
  var slideTop =Math.round( linePos.y ); 
  var slideBottom =  Math.round(linePos.x +  linePos.width);
  lineSlide.style.top = slideTop+'px';
  lineSlide.style.left = slideBottom+'px';

  line_button.addEventListener('click',()=>{
    pencilSlide.style.display = "none" ; 
    eraserSlide.style.display = "none" ;   
    if (lineSlide.style.display == null || lineSlide.style.display == "none" ||
    lineSlide.style.display == "" ||
    lineSlide.style.display == undefined  
       )
       {
      lineSlide.style.top = slideTop+'px';
      lineSlide.style.left = slideBottom+'px';
      lineSlide.style.display = "flex";
    }
    else {
      lineSlide.style.display = "none";
    }
  })

  // pencil.addEventListener('blur',() =>{
  //   pencilSlide.style.display = "none";
  // })
}


// adding eraser slider functionality

var eraserSlider = () => {
  const eraser = document.getElementById('eraser') ;
  const eraserSlide = document.getElementById('eraser-slide') ;
  const pencilSlide = document.getElementById('pencil-slide') ;
   
  const lineSlide = document.getElementById('line-slide');
  const eraserPos = eraser.getBoundingClientRect() ; 
  var slideTop =Math.round( eraserPos.y ); 
  var slideBottom =  Math.round(eraserPos.x +  eraserPos.width);
  eraserSlide.style.top = slideTop+'px';
  eraserSlide.style.left = slideBottom+'px';

  eraser.addEventListener('click',()=>{
    pencilSlide.style.display = "none" ; 
    lineSlide.style.display = "none" ; 
    
    if (eraserSlide.style.display == null || eraserSlide.style.display == "none" ||
    eraserSlide.style.display == "" ||
    eraserSlide.style.display == undefined  
       )
       {
      eraserSlide.style.top = slideTop+'px';
      eraserSlide.style.left = slideBottom+'px';
      eraserSlide.style.display = "flex";
    }
    else {
      eraserSlide.style.display = "none";
    }
  })

  

  // pencil.addEventListener('blur',() =>{
  //   pencilSlide.style.display = "none";
  // })
}

//Calling pencil,line,eraser slider function
pencilLeftSlider() ; 
lineLeftSlider();
eraserSlider() ; 


const undo = document.getElementsByClassName('undo');
document.getElementById('undo').addEventListener('click', function() {
if(index < 0){
clear_canvas();
}
else{
  
  const temp = restore_array.pop();
  redo_array.push(temp);
  index--;
  rIndex++;
  if(index==-1)
    clear_canvas();
  else
  ctx.putImageData(restore_array[index], 0, 0);
}
});

const redo = document.getElementsByClassName('redo');
document.getElementById('redo').addEventListener('click', function() {
if(rIndex >= 0){
  ctx.putImageData(redo_array[rIndex], 0, 0);
  const temp = redo_array.pop();
  restore_array.push(temp);
  index++;
  rIndex--;
  }
});

const clear = document.getElementsByClassName('clear');

document.getElementById('clear').addEventListener('click', clear_canvas, false);

function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        restore_array = [];
        index = -1;
      }

//Tools

//Default settings
let painting = false;
let tool;
let pencil_color = "black";
let line_color = "black";
let pencil_width = 3;
let eraser_width = 10;
let line_width = 3;

//Background color picker
cc1.addEventListener("input", function(e){
  canvas.style.backgroundColor = cancolor;
clear_canvas();
  });

var lineColorPicker = document.getElementById("lineColorPicker") ; 
lineColorPicker.addEventListener("input" , function(e){
  lineColor.style.backgroundColor = line_color ; 
}) 

  // line color
 
//On click tool buttons
//Pencil Button
pencil_button.addEventListener('click',function(){
  tool = 'pencil';
  canvas.style.cursor = "url(https://img.icons8.com/material-outlined/20/000000/pencil.png),auto"
});

//Eraser Button
eraser_button.addEventListener('click',function(){
  tool = 'eraser';
  canvas.style.cursor = "url(https://img.icons8.com/ios-filled/20/000000/pencil-eraser.png),auto"
  
});
//line button
line_button.addEventListener('click',function(){
  tool = 'line';
  canvas.style.cursor = "crosshair"
});
 
//pencil tool
{
  function draw(e){
  if(tool==='pencil'){
    if(!painting)  return;
    
    ctx.lineWidth = pencil_width;
    ctx.lineCap = "round";
    ctx.strokeStyle = pencil_color;

    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX,e.clientY);
    }
  }
  function startPosition(e){
    if(tool==='pencil'){
    painting = true;
    draw(e);
    }
  }

  function finishedPosition(){
    
    if(tool ==='pencil'){
    ctx.beginPath();
    painting = false;
    if(event.type != 'mouseout'){
      restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redo_array =[];
      rIndex=-1;
      index = index + 1;
    }
    }
  }
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mousemove", draw);
}
//eraser tool
{
    function draw(e){
  if(tool==='eraser'){
    if(!painting) return;
    ctx.lineWidth = eraser_width;
    ctx.lineCap = "round";
    ctx.strokeStyle = cancolor;
     
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX,e.clientY);
    }
  }

  function startPosition(e){
    if(tool==='eraser'){
    painting = true;
    draw(e);
    }
  }

  function finishedPosition(){
    
    if(tool ==='eraser'){
    ctx.beginPath();
    painting = false;
    if(event.type != 'mouseout'){
      restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redo_array =[];
      rIndex=-1;
      index = index + 1;
    }
    
    }
  }
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mousemove", draw);
}
//line tool
{
  let mouseDown = false;
  let startX, startY;

  canvas.addEventListener("mousedown", (e) => {
    
    if(tool==='line'){
    mouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
    }
  });
  canvas.addEventListener("mouseup", (e) => {
    if(tool==='line'){
      ctx.beginPath();
      mouseDown = false;
      restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      redo_array =[];
      rIndex=-1;
      index = index + 1;    
    }
  });
  canvas.addEventListener("mousemove", (e) => {
    if(tool==='line'){
      if (mouseDown) {
        if(index<0)  ctx.clearRect(0, 0, canvas.width, canvas.height);
        else ctx.putImageData(restore_array[index], 0, 0);
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = line_width;
        ctx.moveTo(startX, startY);
        ctx.strokeStyle=line_color;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
      }
    }
  });
}