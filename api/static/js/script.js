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


function addData() {
    const dataInput = "hi"

    fetch('https://color-wars-game.vercel.app/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataInput })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('dataInput').value = '';
    })
    .catch(error => console.error('Error:', error));
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



async function updateCirclesFromData() {
    var debug = [];
    try {
      const response = await fetch('https://color-wars-game.vercel.app/list');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
  
      // Iterate through each key in the data object
      for (let i = 1; i <= 25; i++) {
        const key = `f${i}`;
        const value = data[key];
        debug.push(data[0][data]["f1"]);
        const square = document.querySelector(`#square${i}`);
        if (square) {
          // Clear existing circles
          square.innerHTML = '';
          // Add new circles based on the value
          for (let j = 0; j < value; j++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            square.appendChild(circle);
          }
        }
      }
  
      return data,debug;
  
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; 
    }
  }




