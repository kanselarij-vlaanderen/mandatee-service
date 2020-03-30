import mu from 'mu';

const mandateeIsCompetentOnFutureAgendaItem = async (endDateOfMandee) => {
  const query = `
    PREFIX besluitvorming: <http://data.vlaanderen.be/ns/besluitvorming#>
  
 	ASK WHERE {
 	GRAPH <http://mu.semte.ch/graphs/organizations/kanselarij> {
    ?procedurestap besluitvorming:heeftBevoegde ?mandatee .
    ?procedurestap besluitvorming:isGeagendeerdVia ?agendaPunt .
    ?agenda <http://purl.org/dc/terms/hasPart> ?agendaPunt.
    ?agenda <http://data.vlaanderen.be/ns/besluit#isAangemaaktVoor> ?zitting .
    ?zitting <http://data.vlaanderen.be/ns/besluit#geplandeStart> ?geplandeStart .
    FILTER (?geplandeStart > "${endDateOfMandee}"^^xsd:date)
    }
    }`;
  return await mu.query(query);
};

module.exports = {
  mandateeIsCompetentOnFutureAgendaItem
};
