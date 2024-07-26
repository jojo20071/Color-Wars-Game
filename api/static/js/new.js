async function addData(input,line) {
    console.log("---adding data start---  "+line);
    const dataInput = input;

    fetch('https://color-wars-game.vercel.app/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataInput })
    })
    .then(response => response.json())
    .then(data => {
        console.log("---add data end --- "+line);
    })

}