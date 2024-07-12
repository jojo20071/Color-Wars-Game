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