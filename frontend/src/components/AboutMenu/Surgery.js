import React from 'react'
import surgery from '../../images/rendelo.jpg'
import bed from '../../images/agy.jpg'

function Surgery() {

    return (
        <div className="rendelo">
            <p className="heading">Rendelő</p>
            <hr />
            <img src={bed} alt="ágy" id="bed" />
            <p>A betegrendelőnk a magasföldszinten jobb kéz felől található.</p>
            <p>A betegrendelésen minden gyermeket megnézünk, de a várakozási idő lecsökkentésére érdemes időpontot kérni.</p>
            <p>A tanácsadás, oltások a magasföldszinten bal oldalon, a betegektől teljesen elválasztva történik, kizárólag előjegyzett, egészséges gyermekek számára.</p>
            <p>A fertőző betegek ellátása a betegrendelés idején soron kívül, a Fertőző Elkülönítőben történik /magasföldszinten egyenesen/. Ha fertőző gyermekkel érkezett, az Elkülönítő folyosó végén lévő ajtón kopogtasson: ez a rendelőm hátsó kijárata.</p>
            <p>Ugyanitt lehetőség van súlyosabb betegek néhány órás megfigyelésére, esetlegesen infúziós folyadékpótlásra.</p>
            <div className="img-container">
                <img src={surgery} alt="rendelő" id="surgery" />
            </div>
        </div>
    )
}

export default Surgery
