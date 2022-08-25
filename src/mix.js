

// import axios from 'axios';
// import DataService from "./services/service.js"


var c = document.getElementById("mycanvas")
var ctx =c.getContext("2d");

var wide=400 
 var long=600
 var inputTextValue=0
 var d //make d ,mousePointerCol,mousePointer row all global variables because we will need to use them across multiple functions and classes
 //very important to make variables global instead of local. local comes with alot of limitations.
 let mousePointerCol
 let mousePointerRow




class Setup{
    constructor(wide,long,rows,cols){
      this.wide=wide
      this.long=long
      this.rows=rows
      this.cols=cols
      this.gap_h=wide/cols
      this.gap_v=long/rows
  
    }
  }

function RowSelector(y,rows,long){
    let count=0
    let vert = y
    while(count<rows){
      if(100*count<=vert && vert<=100*(count+1))
        return count+1
      else if (vert<0 || vert>long){
        print("Enter a valid coordinate")
        return null
  
      }
  count++
    }
  }
  function ColSelector(x,cols,wide){
    let count=0
    let hor = x
    while(count<cols){
      if(100*count<=hor && hor<=100*(count+1))
        return count+1
      else if (hor<0 || hor>wide){
        print("Enter a valid coordinate")
        return null
  
      }
  count++
    }
  }
  
  function drawCleanerLine(rows,cols,gap_h,gap_v,wide,long) {
    for( let i=1 ; i<=cols-1;i++){
        line(gap_h*i,0,gap_h*i,long)
    }
    for ( let j=1;j<=rows-1;j++){
        line(0,gap_v*j,wide,gap_v*j)
    }
    
  }
  


  const s=new Setup(400,600,6,4);





function setup() {
  createCanvas(s.wide, s.long);
noLoop()

   
}

function draw() {
  background("grey");
//   let mousePointerCol =ColSelector(winMouseX,s.cols,s.wide)
// let mousePointerRow=RowSelector(winMouseY,s.rows,s.long)

  drawCleanerLine(s.rows,s.cols,s.gap_h,s.gap_v,s.wide,s.long);
  if(mouseIsPressed){
mousePressed()
  }

}




 let grid=new Array(s.rows)

for (let i=0;i<s.rows;i++){
  for(let j=0;j<s.cols;j++){
    grid[i]=new Array(j)
  }
}

  
  class Dot{
    constructor(row,column,gap_h,gap_v){
        this.color="white"
        this.row=row 
        this.column=column
        this.x = (column-1)*gap_h
        this.y= (row-1)*gap_v
        this.gap_h=gap_h
        this.gap_v=gap_v
        this.value
        // this.input=createInput("")
    }
    static checkColor(color){
    return this.color==color  
                            }
    
     setColor(){
      if(
        this.value>=1 && this.value<=4){this.color="#f64a2b"}
      else if(this.value>=5 && this.value<=6){this.color="#686868"}
      else if(this.value>=7&&this.value<=10){this.color="#1c7220"}
      else{window.alert( "Number invalid. Enter a number from 0-10 based on merit.")}
    
      return this.color
       }
      
                          
    static checkValue(value){
      return this.value==value
    }
     setValue(value){
    
      if(value>=1 && value<=10)
       this.value=value
      else
      this.value=null
    }
     drawRect(){
    
    ctx.fillStyle=this.color
    ctx.fillRect(this.x,this.y,this.gap_h-.5,this.gap_v-.5)
    }
      
    }
    


 function drawInput(x,y,h,v,d){
    var input=document.createElement("input")//will create a new input tag each time clicked.
    input.type="text"
    
    input.name="input"
    input.style.position="fixed"
    input.addEventListener("keydown",(e)=>{ //eventListener listens to any change in the input field and if its is a keydown change, the following function will execute.
     //e is the change that happened. target gives the element responsible for change. value gives you value of that element
    //e returns keyboardEvent
    //e.target returns the input tag.<input type="text" name="input" size="2'" style="positon: fixed ; left:199px;top100px;"></input>
    
    
      if(e.keyCode===13){ //13 in ENTER key
    
      inputTextValue=e.target.value
      d.setValue(inputTextValue)
      d.setColor()
      d.drawRect(); 
    
    grid[mousePointerRow-1][mousePointerCol-1]=d; //put grid and d.value in this eventlistener because we only want to update the grid when enter is pressed.
    
     console.log(e.target.value)
      }
     })
    
    
    input.style.left=x+"px"
    
    input.style.top=y+"px"
    input.size=2
    document.body.appendChild(input)//must put this to insert into the html body. can also use append() for multiple dom elements/elements in general.
    input.focus()
    //optional
      // ctx.document.write("hello");
    
    //  this.input.position(this.x, this.y);
    //  this.input.size(this.gap_h/5);
    // this.value=this.input.value();
    }
    
    
    
    

  function drawLine(rows,cols,gap_h,gap_v,wide,long) {
    for( let i=1 ; i<=cols-1;i++){
        ctx.moveTo(gap_h*i,0)
        ctx.lineTo(gap_h*i,long)
        ctx.stroke()
    }
    for ( let j=1;j<=rows-1;j++){
      ctx.moveTo(0,gap_v*j)
      ctx.lineTo(wide,gap_v*j)
      ctx.stroke()
}
  }

    

  function mousePressed(e){

    var xCoord=e.clientX
    var yCoord=e.clientY

 mousePointerCol =ColSelector(xCoord,4,400)
mousePointerRow=RowSelector(yCoord,6,600)

// get numerical input from the user 
//decide upon the color-number value (if 8-10 : green, if 0-4: red, if 5-7: good )
//create new object passing its value and color 

d = new Dot(mousePointerRow,mousePointerCol,s.gap_h,s.gap_v)
drawInput(d.x,d.y,d.gap_h,d.gap_v,d)
console.log(mousePointerRow,mousePointerCol)

}

window.mousePressed= mousePressed;




drawLine(6,4,100,100,400,600)

const BASE_URL_1 = 'http://127.0.0.1:2000'
const BASE_URL_2 = 'http://127.0.0.1:5000'



var string=JSON.stringify(window.location.pathname)
var id=string.substring(8,44)


console.log(id,grid)

const gridDoc = {
  roomid: id,
  dot : grid
}




const speakerDoc={
  
  roomid:id
}




var buffer
let speakerid
// let sid=  await (r?.data?.roomdata?.speakerid)

async function promiseSpeaker(){

    await axios.post(`${BASE_URL_2}/getRoomById`,speakerDoc).then( async r=>{
    
  
let x= await r?.data?.roomdata?.speakerid
speakerid=x

const userGridDoc={

  userid:speakerid,
  roomid:id,
  dot:grid

}
await axios.put(`${BASE_URL_1}/updateDotInUser`, userGridDoc)

  }
  )
    }

  






// getSpeaker().then(async r=>{ speakerid=await r })
  

 async function postGrid(e){

  console.log("submitted")
console.log(grid)
await axios.put(`${BASE_URL_2}/updateDotInRoom`, gridDoc)
promiseSpeaker()


// need to specify the speaker/user id for this to work 

// await import('./services/service.js').then((response)=>{
// response.postDot(gridDoc);
// })


}







// DataService.postDot(gridDoc)





    
    
    