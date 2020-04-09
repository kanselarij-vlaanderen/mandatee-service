import mu from 'mu';

const app = mu.app;
const repository = require('./repository');

app.get('/', function( req, res ) {
  res.send('Hello mu-javascript-template');
});

app.get('/mandateeIsCompetentOnFutureAgendaItem', async (req,res) => {
  const mandateeEndDate = req.query.date;
  const mandateeId = req.query.mandateeId;
  const queryResult = await repository.mandateeIsCompetentOnFutureAgendaItem(mandateeEndDate,mandateeId);
  return res.send(queryResult);
});
