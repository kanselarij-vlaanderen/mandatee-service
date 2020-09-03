import mu from 'mu';
import { sparqlEscapeString, sparqlEscapeDate } from 'mu';

const mandateeIsCompetentOnFutureAgendaItem = async (endDateOfMandee, mandateeId) => {
  const query = `
  PREFIX besluitvorming: <http://data.vlaanderen.be/ns/besluitvorming#>
  PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
  PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
  PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX dossier: <https://data.vlaanderen.be/ns/dossier#>


  ASK WHERE {
  ?procedurestap a dossier:Procedurestap .
  ?procedurestap besluitvorming:heeftBevoegde ?mandataris .
  ?mandataris a mandaat:Mandataris .
  ?mandataris mu:uuid ${sparqlEscapeString(mandateeId)} .
  ?procedurestap ^besluitvorming:vindtPlaatsTijdens / besluitvorming:genereertAgendapunt ?agendapunt .
  ?agendaPunt a besluit:Agendapunt .
  ?agenda dct:hasPart ?agendaPunt.
  ?agenda a besluitvorming:Agenda .
  ?agenda besluitvorming:isAgendaVoor ?zitting .
  ?zitting a besluit:Vergaderactiviteit .
  ?zitting besluit:geplandeStart ?geplandeStart .
  FILTER (?geplandeStart > ${sparqlEscapeDate(endDateOfMandee)})
  }`;
  return await mu.query(query);
};

module.exports = {
  mandateeIsCompetentOnFutureAgendaItem
};
