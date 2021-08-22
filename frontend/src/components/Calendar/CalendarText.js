import React from 'react'

function CalendarText() {

    return (
        <div className="card-box calendar-info">
            <p>Ezen a felületen gyermekét előjegyezheti 
                <span className="hl-green"> betegrendelésre</span> illetve 
                <span className="hl-green"> tanácsadásra</span>, oltásra.
            </p>
            <p>Kérjük, <span className="hl-red">egy </span>
                időpontot válasszon, változás esetén időpontját módosítsa illetve
                <span className="hl-red"> törölje</span>.
            </p>
            <p>A betegrendelésre az előjegyzés 
                <span className="hl-green"> nem kötelező</span>.
                Minden beteg gyermeket megnézünk. De a várakozási idő csökkentéséhez célszerű időpontot foglalni, akár aznapra is.
            </p>
            <p>Az oltásra az előjegyzés
                <span className="hl-red"> kötelező!</span>
            </p>
            <p>Kérem a gyermek neve mellet röviden jelezze milyen oltást kérnek.</p>
            <p>Oltásokat kedden 14-16 és szerdán 8-10 óra közt adunk be. Ide
                <span className="hl-green"> csak egészséges </span>
                gyermekkel jöjjenek. Kérem, ha gyermeke beteg lett, a tanácsadási-oltási listáról törölje. Szükség esetén betegrendelésen jelentkezzenek.
            </p>
            <p>Ha az időpontok telítettek, oltás beadására még csütörtökön 14-16 óra közt van mód. Egyéb időpontokban sajnos a betegektől való elkülönítést nem tudjuk megoldani.</p>
        </div>
    )
}

export default CalendarText
