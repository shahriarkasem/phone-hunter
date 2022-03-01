// loadData
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    if(inputFieldText == ''){
        // please write something
        document.getElementById('write-something').style.display = 'block';
    }
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`)
        .then(res => res.json())
        .then(data => displayData(data.data))
        document.getElementById('write-something').style.display = 'none';
    }
}
// displayResults
const displayData = allData => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(allData.length == 0){
        document.getElementById('no-result').style.display = 'block';
    }
    else{
        allData.slice(0,20).forEach(data => {
            // console.log(data)
            const div = document.createElement('div');
            const dataSlug = data.slug;
            // console.log(dataSlug);
            div.innerHTML = `
            <div class="card">
                <img src="${data.image}" class="card-img-top img-custom" alt="...">
                <div class="card-body">
                    <h4 class="card-text">${data.brand}</h4>
                    <h5 class="card-title">${data.phone_name}</h5>
                    <button onclick="getDetails('${dataSlug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        })
        document.getElementById('no-result').style.display = 'none';
    }
}
// showDetails
function getDetails(dataId) {
    // console.log(dataId);
    fetch(`https://openapi.programming-hero.com/api/phone/${dataId}`)
    .then(res => res.json())
    .then(data => console.log(data))
}