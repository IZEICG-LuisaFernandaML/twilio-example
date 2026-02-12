exports.handler = async function(context, event, callback){
    const ciudad = event.ciudad;
    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');

    if(!ciudad){
        response.setStatusCode(400).setBody({error:'The city name must be provided'});
        callback(null,response);
    }

    const wApiKey= context.WEATHER_API_KEY;
    const url = `${context.WEATHER_API_URL}?key=${wApiKey}&q=${ciudad}`;
    
    try {
        const resp = await fetch(url);

        if(!resp.ok){
            throw new Error(`status: ${resp.status}, msg: ${resp.statusText}`);
        }

        const data = await resp.json();
        
        const ciudad = `${data.location.name}, ${data.location.country}`;
        const tempC = `${data.current.temp_c} °C`;

        response.setStatusCode(200).setBody({weather:{
            city: ciudad,
            temperature: tempC,
            condition: data.current.condition.text,
            actualLocaltime: data.location.localtime 
        }});

        callback(null, response);
    } catch (error) {
        console.error(error);
        callback('Oops! The clouds took your request away. Try again when the sun comes up');
    }

};