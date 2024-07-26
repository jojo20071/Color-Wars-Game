function changeColor() {
    var color = localStorage.getItem("color");
    if (color[2] == "r") {
        localStorage.setItem("color", [1,"b"]);
        console.log("color changed to blue");
      }
    else{
        localStorage.setItem("color", [0,"r"]);
        console.log("color changed to red");
    }
  }

function sred() {
    localStorage.setItem("color", [0,"r"]);
    console.log("color set to red");
}
function sblue() {
    localStorage.setItem("color", [1,"b"]);
    console.log("color set to blue");
}



async function addData(input, line) {
  console.log("---adding data start---  " + line);
  const dataInput = input;

  try {
      const response = await fetch('https://color-wars-game.vercel.app/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: dataInput })
      });

      const data = await response.json();
      console.log("---add data end --- " + line);
  } catch (error) {
      console.error("Error adding data:", error);
  }
}
function resetData() {


    console.log("resetting data");
    fetch('https://color-wars-game.vercel.app/reset', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    .then(response => response.json())
}
async function getData() {
  const response = await fetch('https://color-wars-game.vercel.app/list');
  if (!response.ok) {
      throw new Error('Network response was not ok');
      }
  const apiData = await response.json();
  const jsonObject = apiData[0];
  const data = jsonObject.data;
  return data;

}


var data;
async function updateCirclesFromData() {
    var debug = [];
    try {
      const response = await fetch('https://color-wars-game.vercel.app/list');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const apiData = await response.json();
      const jsonObject = apiData[0];
      data = jsonObject.data;

      if (data["c"] == "r") {
        document.getElementById("body").style.backgroundColor = "#de8f70";
        document.getElementById("body2").style.backgroundColor = "#de8f70";
      }
      else{
        document.getElementById("body").style.backgroundColor = "rgb(92 171 209)";
        document.getElementById("body2").style.backgroundColor = "rgb(92 171 209)";
      }
      
  
      // Iterate through each key in the data object
      for (let i = 1; i <= 25; i++) {
        
        const key = `f${i}`;
        const value = data[key][0];


        debug.push(value);

        const squares = document.querySelectorAll('.square');

        // Select the .main-circle within the specified .square
        const mainCircle = squares[i-1].querySelector('.main-circle');
        // Clear existing .small-circle elements

        squares[i-1].innerHTML = '';

        if (value != 0) {
            const mainCircle = document.createElement('div');
            mainCircle.className = 'main-circle';
            if (data[key][1] == 1) {
              mainCircle.style.backgroundColor = "#00c2ea";
            }
            squares[i-1].appendChild(mainCircle);
            mainCircle.innerHTML = '';

            for (let i = 0; i < value; i++) {
                const smallCircle = document.createElement('div');
                smallCircle.className = 'small-circle';
                mainCircle.appendChild(smallCircle);
            }
        }
        // Create and append the specified number of .small-circle elements

        //console.log(i,value,key);

      }
  
      return debug;
  
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; 
    }
  }


document.querySelectorAll('.reset').forEach(div => {
    div.addEventListener('click', function() {
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 200); // Adjust time to match animation duration
    });
});

setInterval(updateCirclesFromData, 500);

//------------click mech -----------

document.querySelectorAll('.square').forEach(square => {
  square.addEventListener('click', function(event) {
      handleSquareClick(event);

  });
});
document.querySelectorAll('.main-circle').forEach(square => {
  square.addEventListener('click', function(event) {
      handleSquareClick(event);

  });
});
document.querySelectorAll('.small-circle').forEach(square => {
  square.addEventListener('click', function(event) {
      handleSquareClick(event);

  });
});




var newData;

function compute4(fkey,i) {
  console.log("comput4 for "+fkey+" i=  "+i);
  if ([6,11,16,21,26].includes(i+1)==false) {
    const key = `f${i+1}`;
    newData[key][0] = data[key][0] + 1;
    if (data["c"] == "r") {
      newData[key][1] = 0;
    }
    else{
      newData[key][1] = 1;
    }
  }
  if ([0,5,10,15,20,25].includes(i-1)==false) {
    const key = `f${i-1}`;
    newData[key][0] = data[key][0] + 1;
    if (data["c"] == "r") {
      newData[key][1] = 0;
    }
    else{
      newData[key][1] = 1;
    }
  }
  if ([1,2,3,4,5].includes(i)==false) {
    const key = `f${i-5}`;
    newData[key][0] = data[key][0] + 1;
    if (data["c"] == "r") {
      newData[key][1] = 0;
    }
    else{
      newData[key][1] = 1;
    }
  }
  if ([21,22,23,24,25].includes(i)==false) {
    const key = `f${i+5}`;
    newData[key][0] = data[key][0] + 1;
    if (data["c"] == "r") {
      newData[key][1] = 0;
    }
    else{
      newData[key][1] = 1;
    }
  }
  
  //main circle to 0
  const key = `f${i}`;
  newData[key][0] = 0;

  newData["computing"] = 0;
  
  //addData(newData,211);

  
  console.log("plus calc done and data pushed");
  
  console.log("now checking for 4...");
  for (let i = 1; i <= 25; i++) {
    const key = `f${i}`;
    const value = data[key][0];
    if (value >= 4) {
      console.log("4 found on " + key);
      newData["computing"] = 1;
      var computingFor = i;
      break;}}
  if (newData["computing"] == 1) {
    console.log("4 was found so compute 4 executed again");
    compute4(`f${computingFor}`,computingFor);
    
  }
  console.log("no more 4s, final push");
  //addData(newData,229);

  
    
  


}


function verClick(clickedSquare){
  const key = `f${clickedSquare}`;
  newData  = data;
  newData[key][0] = data[key][0] + 1;
  if (data["c"] == "r") {
    newData[key][1] = 0;
  }
  else{
    newData[key][1] = 1;
  }

  console.log("incremwnted "+key+" to "+newData[key][0]+" now checking if its 4 now");
  
  for (let i = 1; i <= 25; i++) {
    const key = `f${i}`;
    const value = data[key][0];
    if (value >= 4) {
      newData["computing"] = 1;
      var computingFor = i;
      break;}
    }
  if (newData["computing"] == 1) {
    console.log("its at 4 yey, now executing compute4----------------------");
    compute4(key,computingFor);
  }

  if (newData["computing"] == 0) {
    console.log("next players turn now");
    console.log("starting turn debugging:");
    console.log("current color: "+data["c"]);
    if (data["c"] == "r") {
      newData["c"] = "b";
      console.log("color changed to blue");
      console.log(newData);
      addData(newData,272);
    }
    else{
      newData["c"] = "r";
      console.log("color changed to red");
      console.log(newData);
      addData(newData,278);
    }
  }
 
 
}


function handleSquareClick(event) {
  const squareId = parseInt(event.currentTarget.id);
  console.log("Clicked:  "+(squareId,data));
  if (data["c"] == localStorage.getItem("color")[2] && data["computing"] == 0) {
    if (data[`f${squareId}`][0] == 0) {
      verClick(squareId);
    }
    else if (data[`f${squareId}`][1] == localStorage.getItem("color")[0]){
        verClick(squareId);
      }
    }
  else{
    console.log("not your turn");
  }
    
}


  
  


