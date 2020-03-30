import mu from 'mu';

const mandateeIsCompetentOnFutureAgendaItem = async (endDateOfMandee, mandateeId) => {
  const query = `
  PREFIX besluitvorming: <http://data.vlaanderen.be/ns/besluitvorming#>

  ASK WHERE {
  
  ?procedurestap besluitvorming:heeftBevoegde <http://kanselarij.vo.data.gift/id/mandatarissen/${mandateeId}> .
  ?procedurestap besluitvorming:isGeagendeerdVia ?agendaPunt .
  ?agenda <http://purl.org/dc/terms/hasPart> ?agendaPunt.
  ?agenda <http://data.vlaanderen.be/ns/besluit#isAangemaaktVoor> ?zitting .
  ?zitting <http://data.vlaanderen.be/ns/besluit#geplandeStart> ?geplandeStart .
  FILTER (?geplandeStart > "${endDateOfMandee}"^^xsd:date)
  }`;
  return await mu.query(query);
};

module.exports = {
  mandateeIsCompetentOnFutureAgendaItem
};
