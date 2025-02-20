document.addEventListener('DOMContentLoaded', (event) => {
    const generalBtn = document.getElementById("general");
    const businessBtn = document.getElementById("business");
    const sportsBtn = document.getElementById("sports");
    const entertainmentBtn = document.getElementById("entertainment");
    const technologyBtn = document.getElementById("technology");
    const searchBtn = document.getElementById("searchBtn");

    const newsQuery = document.getElementById("newsQuery");
    const newsType = document.getElementById("newsType");
    const newsdetails = document.getElementById("newsdetails");

    // Array
    var newsDataArr = [];

    // APIs
    const API_KEY = '536be7455576480ca8463d7065baf87b';
    const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    const SEARCH_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

    // Fetch general news on page load
    fetchNews("general");

    // Function to fetch news by category
    function fetchNews(newsType) {
        const url = `${BASE_URL}&category=${newsType}`;
        console.log("Fetching news from URL:", url);
        fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.articles) {
                throw new Error("No articles found in response");
            }
            newsDataArr = data.articles;
            displayNews();
        })
        .catch(error => {
            console.log(error);
            newsdetails.innerHTML = "<h5>Sem dados disponíveis.</h5>";
        });
    }

    // Function to fetch news by query
    function fetchQueryNews() {
        if (newsQuery.value == null) return;
        const url = `${SEARCH_URL}&q=${newsQuery.value}`;
        fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.articles) {
                throw new Error("No articles found in response");
            }
            newsDataArr = data.articles;
            displayNews();
        })
        .catch(error => {
            console.log(error);
            newsdetails.innerHTML = "<h5>Sem dados disponíveis.</h5>";
        });
    }

    // Function to display news
    function displayNews() {
        newsdetails.innerHTML = "";
        if (!newsDataArr) {
            console.log("No news data available to display");
            return;
        }
        newsDataArr.forEach(news => {
            var date = news.publishedAt.split("T");

            var col = document.createElement("div");
            col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

            var card = document.createElement("div");
            card.className = "p-2";

            var image = document.createElement("img");
            image.setAttribute("height", "matchparent");
            image.setAttribute("width", "100%");
            image.src = news.urlToImage;

            var cardBody = document.createElement("div");

            var newsHeading = document.createElement("h5");
            newsHeading.className = "card-title";
            newsHeading.innerHTML = news.title;

            var dateHeading = document.createElement("h6");
            dateHeading.className = "text-primary";
            dateHeading.innerHTML = date[0];

            var description = document.createElement("p");
            description.className = "text-muted";
            description.innerHTML = news.description;

            var link = document.createElement("a");
            link.className = "btn btn-dark";
            link.setAttribute("target", "_blank");
            link.href = news.url;
            link.innerHTML = "Leia mais";

            cardBody.appendChild(newsHeading);
            cardBody.appendChild(dateHeading);
            cardBody.appendChild(description);
            cardBody.appendChild(link);

            card.appendChild(image);
            card.appendChild(cardBody);

            col.appendChild(card);

            newsdetails.appendChild(col);
        });
    }

    if (generalBtn) {
        generalBtn.addEventListener("click", () => fetchNews("general"));
    }

    if (businessBtn) {
        businessBtn.addEventListener("click", () => fetchNews("business"));
    }

    if (sportsBtn) {
        sportsBtn.addEventListener("click", () => fetchNews("sports"));
    }

    if (entertainmentBtn) {
        entertainmentBtn.addEventListener("click", () => fetchNews("entertainment"));
    }

    if (technologyBtn) {
        technologyBtn.addEventListener("click", () => fetchNews("technology"));
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", fetchQueryNews);
    }
});
