import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import alvissa1 from './assets/pfp/alvissa1.jpg';
import alvissa2 from './assets/pfp/alvissa2.jpg';

import click1 from './assets/click/click1.png';
import click2 from './assets/click/click2.png';
import click3 from './assets/click/click3.png';
import click4 from './assets/click/click4.png';
import click5 from './assets/click/click5.png';
import click6 from './assets/click/click6.png';
import click7 from './assets/click/click7.png';
import click8 from './assets/click/click8.png';
import click9 from './assets/click/click9.png';
import click10 from './assets/click/click10.png';
import click11 from './assets/click/click11.png';

import music1 from './assets/music/music1.m4a';

function App() {
  const clickImages = [click1, click2, click3, click4, click5, click6, click7, click8, click9, click10, click11];
  const [clickEffects, setClickEffects] = useState([]);
  const audioRef = useRef(null);

  // random img
  const handleClick = (e) => {
    const randomImage = clickImages[Math.floor(Math.random() * clickImages.length)];
    const id = Date.now();

    // new random img
    setClickEffects((prev) => [...prev, { id, src: randomImage, x: e.clientX, y: e.clientY, opacity: 1 }]);

    // fade after 0.25 sec
    setTimeout(() => {
      setClickEffects((prev) =>
        prev.map((effect) => (effect.id === id ? { ...effect, opacity: 0 } : effect))
      );
    }, 250);

    // remove img after 1 sec
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  };

  // autoplay bg music
  useEffect(() => {
    audioRef.current?.play().catch(() => {
      const startAudio = () => {
        audioRef.current?.play();
        window.removeEventListener('pointerdown', startAudio);
      };
      window.addEventListener('pointerdown', startAudio);
    });
  }, []);

  return (
    <div
      onPointerDown={handleClick}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: 'rgb(252, 214, 243)',
      }}
    >
      {/* bg music */}
      <audio ref={audioRef} src={music1} loop />

      {/* click effect */}
      {clickEffects.map((effect) => (
        <img
          key={effect.id}
          src={effect.src}
          alt="click effect"
          style={{
            position: 'absolute',
            top: effect.y - 50,
            left: effect.x - 50,
            width: 100,
            height: 100,
            pointerEvents: 'none',
            opacity: effect.opacity,
            transition: 'opacity 0.5s ease-in-out',
            zIndex: 9999,
          }}
        />
      ))}

      <title>Congrats</title>

      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ gap: '2rem', paddingTop: '20px' }}>
        <div className="card mb-3 custom-card-border" style={{ maxWidth: '800px', marginLeft: '10px', marginRight: '10px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={alvissa2} style={{ borderColor: '#636363', borderWidth: '1px', borderStyle: 'solid' }} className="img-fluid rounded-start" alt="alvissa2" />
            </div>

            <div className="col-md-8">
              <div className="card-body h-100 rounded" style={{ backgroundColor: 'rgba(253, 229, 248)' }}>
                <div className="card-header custom-card-border">
                  <h3 className="card-title"><strong>Congratulations</strong></h3>
                  <h6 className="card-title" style={{ paddingLeft: '2px' }}>Alvissa T. Caballa, RN</h6>
                </div>

                <p className="card-text mt-0">
                  I always knew you could do it!
                  I am so happy to see you pass your board exams and become a Registered Nurse.
                  All the stress and sleepless nights you endured was worth it. Your hard work had truly paid off.
                  I'm so proud of you and I love you so much! ❤️
                </p>

                <p className="card-text">
                  <small className="text-body-secondary">
                    November 26 2025
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;