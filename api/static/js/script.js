localStorage.setItem("color", [0,"r"]);
function changeColor() {
    var color = localStorage.getItem("color");
    if (color[2] == "r") {
        localStorage.setItem("color", [1,"b"]);}
    else{
        localStorage.setItem("color", [0,"r"]);
    }
  }












function setSmallCirclesCount(squareIndex, count) {
    // Find all .square elements
    const squares = document.querySelectorAll('.square');
    // Check if the specified index is within bounds
    if (squareIndex < 0 || squareIndex >= squares.length) {
        console.error('Square index out of bounds');
        return;
    }
    // Select the .main-circle within the specified .square
    const mainCircle = squares[squareIndex].querySelector('.main-circle');
    // Clear existing .small-circle elements
    mainCircle.innerHTML = '';
    // Create and append the specified number of .small-circle elements
    for (let i = 0; i < count; i++) {
        const smallCircle = document.createElement('div');
        smallCircle.className = 'small-circle';
        mainCircle.appendChild(smallCircle);
    }
}


function addData(input) {
    const dataInput = input;

    fetch('https://color-wars-game.vercel.app/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataInput })
    })
    .then(response => response.json())

}

function resetData() {


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

document.getElementById('main-circle').addEventListener('click', function(event) {
  handleSquareClick(event);
});

function compute4(){
  const key = `f${1}`;
  const value = data[key][0];
  if (value >= 4) {
    const key1 = `f${2}`;
    const key2 = `f${6}`;
    const key3 = `f${7}`;
    const newData  = data;
    newData[key1][0] = data[key1][0] + 1;
    newData[key2][0] = data[key2][0] + 1;
    newData[key3][0] = data[key3][0] + 1;
    newData[key][0] = data[key][0] - 3;
    addData(newData);
  }
  const key4 = `f${5}`;
  const value4 = data[key4][0];
  if (value4 >= 4) {
    const key5 = `f${4}`;
    const key6 = `f${10}`;
    const key7 = `f${9}`;
    const newData  = data;
    newData[key5][0] = data[key5][0] + 1;
    newData[key6][0] = data[key6][0] + 1;
    newData[key7][0] = data[key7][0] + 1;
    newData[key4][0] = data[key4][0] - 3;
    addData(newData);
  }
  const key8 = `f${21}`;
  const value8 = data[key8][0];
  if (value8 >= 4) {
    const key9 = `f${16}`;
    const key10 = `f${17}`;
    const key11 = `f${22}`;
    const newData  = data;
    newData[key9][0] = data[key9][0] + 1;
    newData[key10][0] = data[key10][0] + 1;
    newData[key11][0] = data[key11][0] + 1;
    newData[key8][0] = data[key8][0] - 3;
    addData(newData);
  }
  const key12 = `f${25}`;
  const value12 = data[key12][0];
  if (value12 >= 4) {
    const key13 = `f${20}`;
    const key14 = `f${19}`;
    const key15 = `f${24}`;



}
}


function verClick(clickedSquare){
  const key = `f${clickedSquare}`;
  const newData  = data;
  newData[key][0] = data[key][0] + 1;
  if (data["c"] == "r") {
    newData[key][1] = 0;
  }
  else{
    newData[key][1] = 1;
  }
  
  for (let i = 1; i <= 25; i++) {
    const key = `f${i}`;
    const value = data[key][0];
    if (value == 4) {
      newData["computing"] = 1;
      break;
  }
  compute4();
  if (newData["computing"] == 1) {
    if (data["c"] == "r") {
      newData["c"] = "b";
    }
    else{
      newData["c"] = "r";
    }
  }



  addData(newData);
 }
}


function handleSquareClick(event) {
  const squareId = parseInt(event.currentTarget.id);
  console.log(squareId,data);
  console.log(localStorage.getItem("color")[2]);
  if (data["c"] == localStorage.getItem("color")[2] && data["computing"] == 0) {
    if (data[`f${squareId}`][0] == 0) {
      verClick(squareId);
    }
    else if (data[`f${squareId}`][1] == localStorage.getItem("color")[0]){
        verClick(squareId);
      }
    }
    
}


  
  


