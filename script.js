const url = 'http://78.63.13.74:3006/FlowFormaAPI/names';
const ul = document.getElementById('authors');

fetch(url)
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {
    let authors = data.results; // Get the results
    return authors.map(function(author) { // Map through the results and for each run the code below
      let li = createNode('li'); //  Create the elements we nee
      // Add the source of the image to be the src of the img element
      span.innerHTML = ${author}; // Make the HTML of our span to be the first and last name of our author
      append(ul, li);
    })
  })
