const API_KEY = "0c4256d2a0cc4993b88530c3af5d22e5"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () =>fetchNews("India"))

function reload(){
    window.location.reload()
}
async function fetchNews(query) {
    const res = await fetch(`${url} ${query} &apiKey=${API_KEY}`)
    const data = await res.json()
    console.log(data)
    bindData(data.articles)
}

function bindData(articles) {
    const cardConatiner = document.getElementById("cardConatiner")
    const newsTemplate = document.getElementById("template-news")

    cardConatiner.innerHTML = ""
    articles.forEach(article => {
        const clone = newsTemplate.content.cloneNode(true)
        fillData(article, clone)
        cardConatiner.appendChild(clone)
    })
}

function fillData(article, clone) {
    const newsImg = clone.querySelector("#news-img")
    const newsTitle = clone.querySelector("#title")
    const newsSource = clone.querySelector("#source")
    const newsDesc = clone.querySelector("#news-p")

    newsImg.src = article.urlToImage
    newsImg.alt = article.title
    newsTitle.textContent = article.title
    newsSource.textContent = article.source.name
    newsDesc.textContent = article.description

    const date = new Date (article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta",
    })

    newsSource.textContent = `${article.source.name} | ${date}`

    clone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })


}

let currentSeelectedNav = null;

function onNav(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSeelectedNav?.classList.remove("active")
    currentSeelectedNav = navItem;
    currentSeelectedNav.classList.add("active")
}

const searchBut = document.getElementById('searchBtn')
const seaechtxt = document.getElementById('searchtxt')

searchBut.addEventListener('click',()=>{
    const query = seaechtxt.value
    if(!query) return
    fetchNews(query)
    currentSeelectedNav?.classList.remove("active")
    currentSeelectedNav = null;
})