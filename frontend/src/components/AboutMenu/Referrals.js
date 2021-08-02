import React from 'react'

function Referrals() {

    return (
        <div className="szakrendelesek">
            <p className="heading">Szakrendelések - beutalók</p>
            <hr />
            <p>A szakrendelőkbe általában beutaló szükséges. Ezt a betegrendelésen adjuk ki.</p>
            <br />
            <p className="no-need-header">Az alábbi szakrendeléskre nem kell beutaló:</p>
            <p>&nbsp;&nbsp;<span className="no-need">- szemészet:</span> időpontfoglalás kell! /pl. ZESZ* T:06-1 / 469-46-98/</p>
            <p>&nbsp;&nbsp;<span className="no-need">- fülészet:</span> (pl. KESZ**, ZESZ, Bethesda Kh., Heim Pál Kh.)</p>
            <p>&nbsp;&nbsp;<span className="no-need">- bőrgyógyászat:</span> időpontfoglalás kell! (pl. KESZ - neten vagy telefonon)</p>
            <p>&nbsp;&nbsp;<span className="no-need">- nőgyógyászat:</span> időpontfoglalás kell! (pl. KESZ - neten vagy telefonon)</p>
            <br />
            <br />
            <div className="help">
                <p>*ZESZ: Zuglói Egészségügyi Szolgálat</p>
                <p>**KESZ: Kertvárosi Egészségügyi Szolgálat</p>
            </div>
        </div>
    )
}

export default Referrals

