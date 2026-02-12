exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World!');
  callback(null, twiml);
};

//pfuncion con parametros sencillos (p.e., nombre), y que la funcion diga algo asi como "hola ${nombre} como estas"
//que sea sencillo para aprender como se llama a la funcion. Probarla con postman; peticiones con puro POST