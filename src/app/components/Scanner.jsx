import { Html5QrcodeScanner } from 'html5-qrcode'
import React, { useEffect, useState } from 'react'

const Scanner = () => {

    const [scanner, setScanner ] = useState(null); 


    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", { 
            qrbox: { 
                width: 250, 
                height: 250
            },
            fps: 5
        })

        scanner.render(success ,error); 

        function success(res){  
            scanner.clear(); 
            setScanner(res); 
        }

        function error(err){ 
            console.warn(err); 
        }

    }, [])
  return (
    <div>
        { scanner
        ? <div> Success: <a href={scanner}>{scanner}</a></div>
        : <div id='reader'></div>
        }
    </div>
  
  )
}

export default Scanner