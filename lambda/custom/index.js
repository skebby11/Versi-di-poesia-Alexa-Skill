/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Scusa, c'è stato un problema.")
      .reprompt("Scusa, c'è stato un problema.")
      .getResponse();
  },
};

const SKILL_NAME = 'Versi di poesia';
const GET_FACT_MESSAGE = 'Ecco il tuo verso: ';
const HELP_MESSAGE = 'Puoi dirmi: Dimmi un verso poetico, e ti stupirò con una verso di pura poesia.';
const HELP_REPROMPT = 'Come posso aiutarti? Prova a dire: dimmi un verso poetico.';
const STOP_MESSAGE = 'Stavo per dirti: addio; ma subito ho frenato la mia voce, e sono ancora qui. Separarmi da te mi fa paura: è spaventoso, come l’amara notte di Acheronte.';

const data = [
  "Poiché non potevo fermarmi per la Morte - Lei gentilmente si fermò per me - La Carrozza non portava che Noi Due - E l'Immortalità. Emily Dickinson.",
  'E quando il vento invernale raggeli. La terra disamorata. Esso bisbiglierà del giardino. E tu capirai. Oscar Wilde.',
  "Ma gli scuri pini della tua mente cadono sempre più a picco. E tu dormendo, affondi, affondi. in un mondo elementare. C'è qualcosa laggiù che vuoi raccontare. Gwendolyn MacEwen.",
  'è questo il modo in cui finisce il mondo. Non già con uno schianto ma con un lamento. Thomas Stearns Eliot.',
  'Dalla cenere io rivengo. Con le mie rosse chiome. E mangio uomini come aria di vento . Sylvia Plath.',
  'Piegati in due, come vecchi accattoni sotto sacchi, con le ginocchia che si toccavano, tossendo come streghe, bestemmiavamo nel fango, fin davanti ai bagliori spaventosi, dove ci voltavamo e cominciavamo a trascinarci verso il nostro lontano riposo. Wilfred Owen.',
  'Ti amo come si amano certe cose oscure, segretamente, tra l’ombra e l’anima. Pablo Neruna.',
  "Il peso del mondo, è amore. Sotto il fardello di solitudine, sotto il fardello, dell'insoddisfazione, il peso, il peso che portiamo, è amore. Allen Ginsber.",
  'Lei aveva la pelle blu, e così lui. Lui continuò a nasconderla, e così fece lei. Cercarono il blu per tutta la vita, poi si passarono vicini e non lo seppero mai. Shel Silverstein.',
  'Puoi svalutarmi nella storia, Con le tue amare, contorte bugie; Puoi schiacciarmi a fondo nello sporco. Ma ancora, come la polvere, mi solleverò. Maya Angelou.',
  "Vorrei essere l'aria, che abita in te per un momento, solo uno. Vorrei passare inosservata, ma esserti necessaria. Margaret Atwood.",
  "Amore non è Amore se muta quando scopre un mutamento o tende a svanire quando l'altro s'allontana. Oh no! Amore è un faro sempre fisso che sovrasta la tempesta e non vacilla mai. William Shakespeare.",
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
