import mu from 'mu';
import { sparqlEscapeString, sparqlEscapeDate } from 'mu';

const mandateeIsCompetentOnFutureAgendaItem = async (endDateOfMandee, mandateeId) => {
  const query = `
  PREFIX besluitvorming: <http://data.vlaanderen.be/ns/besluitvorming#>
  PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
  PREFIX dbpedia: <http://dbpedia.org/ontology/>
  PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
  PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
  PREFIX dct: <http://purl.org/dc/terms/>


  ASK WHERE {
  ?procedurestap a dbpedia:UnitOfWork .
  ?procedurestap besluitvorming:heeftBevoegde ?mandataris .
  ?mandataris a mandaat:Mandataris .
  ?mandataris mu:uuid ${sparqlEscapeString(mandateeId)} .
  ?procedurestap besluitvorming:isGeagendeerdVia ?agendaPunt .
  ?agendaPunt a besluit:Agendapunt .
  ?agenda dct:hasPart ?agendaPunt.
  ?agenda a besluitvorming:Agenda .
  ?agenda besluit:isAangemaaktVoor ?zitting .
  ?zitting a besluit:Zitting .
  ?zitting besluit:geplandeStart ?geplandeStart .
  FILTER (?geplandeStart > ${sparqlEscapeDate(endDateOfMandee)})
  }`;
  return await mu.query(query);
};

module.exports = {
  mandateeIsCompetentOnFutureAgendaItem
};
