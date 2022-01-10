import React from 'react'
import profil from '../../images/profil.jpg'

function AboutMe() {
    
    return (
        <div className="rolam">
            <p className="heading">Rólam</p>
            <hr />
            <img src={profil} alt="profil" />
            <p>Dr. Baranyi Judit vagyok.</p>
            <p>2008 november 1.-től kezdtem házi gyermekorvosként dolgozni Rákosszentmihályon.</p>
            <p>Csecsemő és gyermekgyógyász, továbbá aneszteziológus és intenzívterápiás szakvizsgám van, továbbá 16 évig részállásban mentőrvosként is dolgoztam.</p>
            <p>Az alapellátásban szeretném hasznosítani mindazt a tapasztalatot és szakmai kapcsolatot, amit a korábbiakban kórházi munkám során szereztem. A modern farmakológiai és diagnosztikus módszerek, lehetőségek mellett, adott esetben azok ellenére fontosnak, sőt alapvetőnek tartom az egészségre, egészséges életre nevelést, a természetes gyógymódokat, a szervezet öngyógyító lehetőségeinek segítését.</p>
            <p>Az alapellátás mellett továbbra is dolgozom a Heim Pál Gyermekkórház Intenzív osztályán.</p>
            <p>A Hősök terén, a rendelőmben asszisztensnőm Farkas András Sándorné Gyöngyike.</p>
        </div>
    )
}

export default AboutMe
