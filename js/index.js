const form = document.getElementById('github-form');
const search = document.getElementById('search');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('hey')
    let searchValue = search.value;
    fetchData(searchValue);
    form.reset();
})
function fetchData(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
        },
    })
        .then(resp => resp.json())
        .then(data => displaySearchResults(data))
}
function displaySearchResults(data) {
    let searchResult = data.items;
    searchResult.forEach(item => { 
        const ul = document.getElementById('user-list');
        const li = document.createElement('li');
        li.innerHTML = item.login;
        li.classList.add('searchItem')
        ul.appendChild(li);
        ul.querySelectorAll('.searchItem')
            .forEach(liSolo => {
                liSolo.addEventListener('click', (event) => {
            let selectUser = event.target.innerHTML
                    if (item.login === selectUser) {
                        let data = item;
                        console.log(data)
                        displayRepo(data)
                        liSolo.parentElement.remove()
                    }
                })
        })
                })
}
function displayRepo(user) {
    const ul = document.getElementById('repos-list');
    const li = document.createElement('li');
    li.innerHTML = `${user.login}'s repo is : <a href="${user.repos_url}">${user.repos_url}</a>`
    ul.appendChild(li);
    console.log('hey')
}

