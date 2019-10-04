window.addEventListener("load", () => {
    let long;
    let lat;
    let timezonePlace = document.querySelector(".timezone-place");
    let timezonSummary = document.querySelector(".timezone-summary");
    let timezoneIcon = document.querySelector(".icon");
    let temp = document.querySelector(".temp");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const secretKey = `1dbbcd96b1a5d16c890273603404692d`;
            const apiKey = `${proxy}https://api.darksky.net/forecast/${secretKey}/${lat},${long}`;

            fetch(apiKey)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const timezone = data.timezone
                const {temperature, summary, icon } = data.currently;

                console.log(icon);
                timezonePlace.textContent = timezone;
                timezonSummary.textContent = `Summary:` + ` ` + summary;
                temp.textContent = `Temperature:` + ` ` + temperature;

                setIcons(icon, timezoneIcon);

            });

        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})