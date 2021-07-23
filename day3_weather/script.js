document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let inputValue = document.querySelector('#searchInput').value;

    if(inputValue != '') {
        clearInfo();
        showWarning('Loading...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputValue)}&appid=b12cc455611ace8c995bf56a99e68964&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            console.log(json)
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp.toFixed(1),
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else { // shows the error message with each first letter upperCase 
            clearInfo();
            showWarning(json.message.charAt(0).toUpperCase() + json.message.substr(1));
            setTimeout( ()=>showWarning(''), 2000);
        }
    }

})

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(message) {
    document.querySelector('.aviso').innerHTML = message;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
    
}










