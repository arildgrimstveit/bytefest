"use client";

export default function Personvernerklaering() {
  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Personvernerklæring</h1>
          
          <div className="prose max-w-none">
            <p className="mb-6">
              Sopra Steria er ansvarlig for behandlingen av personopplysninger i forbindelse med den interne konferansen Bytefest. Vi behandler personopplysninger i samsvar med EUs personvernforordning (GDPR) (2016/679) og benytter berettiget interesse som behandlingsgrunnlag for innsamling og bruk av personopplysninger for selve eventet, og samtykke for innsamling av diettopplysninger.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Hvem vi er</h2>
            <p className="mb-6">
              Bytefest er en internkonferanse for ansatte i Sopra Steria.
            </p>
            <p className="mb-6">
              Kontaktinformasjon:<br />
              E-post: bytefest@soprasteria.com<br />
              Adresse: Biskop Gunnerus gate 14A
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Når vi samler inn personopplysninger</h2>
            <p className="mb-6">
              Vi samler inn personopplysninger når du:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Logger inn med Single Sign-On (SSO) via Microsoft Entra ID</li>
              <li>Registrerer deg som deltaker på konferansen</li>
              <li>Melder inn et foredrag</li>
              <li>Tar kontakt med oss via e-post</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Hvilke personopplysninger vi samler inn</h2>
            <p className="mb-4">
              Ved innlogging via Microsoft Entra ID SSO:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Profilbilde</li>
            </ul>
            <p className="mb-4">
              Ved påmelding til konferansen vil vi også be om diettpreferanser og tilhørighet til lokasjon og avdeling.
            </p>
            <p className="mb-6">
              Dersom du registrerer et foredrag, vil følgende informasjon lagres, og de som blir valgt ut til å holde foredrag får følgende informasjon publisert på nettsiden:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Profilbilde</li>
              <li>Foredragstittel og beskrivelse</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Behandlingsgrunnlag og hvordan vi bruker personopplysninger</h2>
            <p className="mb-6">
              Vi behandler personopplysninger basert på berettiget interesse, da Bytefest er en intern konferanse for ansatte i Sopra Steria, og registrering, administrasjon og gjennomføring av arrangementet krever behandling av personopplysninger.
            </p>
            <p className="mb-4">
              Hva personopplysningene brukes til:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Administrere påmeldinger til konferansen</li>
              <li>Publisere foredragsholdere med navn, bilde og beskrivelse internt</li>
              <li>Sende informasjon om konferansen</li>
              <li>Tilrettelegge for spesifikke behov, som diettpreferanser</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Lagring og sletting av personopplysninger</h2>
            <p className="mb-6">
              Vi lagrer opplysninger så lenge de er nødvendige for gjennomføringen av Bytefest:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Deltakerdata slettes manuelt 3 måneder etter konferansen</li>
              <li>Foredragsholderdata beholdes så lenge foredragene er relevante, men kan slettes på forespørsel</li>
              <li>Brukere kan be om sletting ved å kontakte bytefest@soprasteria.com</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Deling av opplysninger</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Foredragsinformasjon (navn, epost, bilde og beskrivelse) publiseres på nettsiden</li>
              <li>Ingen øvrige personopplysninger deles med eksterne tredjeparter</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Dine rettigheter</h2>
            <p className="mb-6">
              Du har rett til å:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Be om innsyn i dine personopplysninger</li>
              <li>Be om retting eller sletting av opplysninger</li>
              <li>Begrense eller protestere mot behandlingen av dine data</li>
              <li>Be om utlevering av dine data i et maskinlesbart format</li>
            </ul>
            <p className="mb-6">
              Henvendelser rettes til bytefest@soprasteria.com.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Informasjonskapsler (Cookies)</h2>
            <p className="mb-6">
              Nettsiden bruker kun nødvendige informasjonskapsler for SSO-pålogging.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">9. Sikkerhet</h2>
            <p className="mb-6">
              Vi sikrer dataene dine gjennom:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Lagring i Azure og Sanity med tilgangskontroll</li>
              <li>Begrenset tilgang til autoriserte personer</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">10. Endringer i personvernerklæringen</h2>
            <p className="mb-6">
              Vi kan oppdatere denne personvernerklæringen ved behov. Endringer publiseres på nettsiden, og vesentlige endringer varsles via e-post.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">11. Klage til Datatilsynet</h2>
            <p className="mb-6">
              Dersom du mener at vi ikke behandler dine data i samsvar med GDPR, har du rett til å klage til Datatilsynet:
            </p>
            <p className="mb-6">
              <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">www.datatilsynet.no</a>
            </p>
            <p className="mb-6">
              Du kan også kontakte oss på bytefest@soprasteria.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 