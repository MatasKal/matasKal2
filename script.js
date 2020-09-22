async function fetchText() {
    let response = await fetch('http://78.63.13.74:3006/FlowFormaAPI/names');
    let data = await response.text();
    console.log(data);
}
