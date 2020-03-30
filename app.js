import mu from 'mu';

const app = mu.app;
const bodyParser = require('body-parser');
const repository = require('./repository');
const cors = require('cors');
const debug = process.env.DEBUG_LOGGING || false;

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());


app.get('/', function( req, res ) {
  res.send('Hello mu-javascript-template');
});

app.get('/mandateeIsCompetentOnFutureAgendaItem', async (req,res) => {
  const mandateeEndDate = req.query.date;
  const mandateeId = req.query.mandateeId;
  const queryResult = await repository.mandateeIsCompetentOnFutureAgendaItem(mandateeEndDate,mandateeId);
  return res.send(queryResult);
});
