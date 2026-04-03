"use strict";

(function () {

    const BASE_URL = "/api/jokebook";

    window.addEventListener("load", init);

    function init() {
        id("randBtn").addEventListener("click", getRandomJoke);
        id("cateBtn").addEventListener("click", getCategories);
        id("searchBtn").addEventListener("click", getJokesByCategory);
        id("addBtn").addEventListener("click", addJoke);

        getRandomJoke(); 
    }

    async function getRandomJoke() {
        try {
            const res = await fetch(BASE_URL + "/random");
            const joke = await checkStatus(res);
            displaySingleJoke(joke, id("randomOutput"));
        } catch (error) {
            handleError(error, id("randomOutput"));
        }
    }

    async function getCategories() {
        const list = id("cateList");
        while (list.firstChild) list.removeChild(list.firstChild);

        try {
            const res = await fetch(BASE_URL + "/categories");
            const categories = await checkStatus(res);

            categories.forEach(category => {
                const li = document.createElement("li");
                li.textContent = category;
                li.addEventListener("click", () => loadCategory(category));
                list.appendChild(li);
            });

        } catch (error) {
            handleError(error, list);
        }
    }

    async function loadCategory(category) {
        try {
            const res = await fetch(BASE_URL + "/category/" + encodeURIComponent(category));
            const jokes = await checkStatus(res);
            displayJokes(jokes);
        } catch (error) {
            handleError(error, id("output"));
        }
    }

    async function getJokesByCategory() {
        const category = id("categoryInput").value.trim();
        if (!category) return;

        try {
            const res = await fetch(BASE_URL + "/category/" + encodeURIComponent(category));
            const jokes = await checkStatus(res);
            displayJokes(jokes);
        } catch (error) {
            handleError(error, id("output"));
        }
    }

    async function addJoke() {
        const data = {
            category: id("addCategory").value.trim(),
            setup: id("setup").value.trim(),
            delivery: id("delivery").value.trim()
        };

        if (!data.category || !data.setup || !data.delivery) {
            alert("Please fill in category, setup, and delivery.");
            return;
        }

        try {
            const res = await fetch(BASE_URL + "/joke/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const jokes = await checkStatus(res);
            displayJokes(jokes);

        } catch (error) {
            handleError(error, id("output"));
        }
    }

    function displayJokes(jokes) {
        const output = id("output");
        while (output.firstChild) output.removeChild(output.firstChild);

        jokes.forEach(joke => {
            const article = document.createElement("article");
            const setup = document.createElement("h3");
            setup.textContent = joke.setup;
            const delivery = document.createElement("p");
            delivery.textContent = joke.delivery;
            article.appendChild(setup);
            article.appendChild(delivery);
            output.appendChild(article);
        });
    }

    function displaySingleJoke(joke, container) {
        while (container.firstChild) container.removeChild(container.firstChild);
        const article = document.createElement("article");
        const setup = document.createElement("h3");
        setup.textContent = joke.setup;
        const delivery = document.createElement("p");
        delivery.textContent = joke.delivery;
        article.appendChild(setup);
        article.appendChild(delivery);
        container.appendChild(article);
    }

    function handleError(error, container) {
        while (container.firstChild) container.removeChild(container.firstChild);
        const p = document.createElement("p");
        p.textContent = "Something went wrong.";
        p.classList.add("error");
        container.appendChild(p);
        console.error(error);
    }

    function id(name) {
        return document.getElementById(name);
    }

    async function checkStatus(response) {
        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errMsg}`);
        }
        return await response.json();
    }

})();