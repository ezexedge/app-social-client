import React from 'react';

let year = new Date()
let newYear = year.getFullYear()
const Footer = () => (
    
    <>
    <div className="footer">
        creado por ezequiel gallardo {newYear}
    </div>
    </>
)
 
export default Footer;

