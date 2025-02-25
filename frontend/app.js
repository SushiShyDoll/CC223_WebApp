document.getElementById('fetchButton').addEventListener('click', fetchData);

function fetchData() {
    fetch('http://localhost:3000/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.message;
        })
        .catch(error => console.error('Error fetching data:', error));
}
