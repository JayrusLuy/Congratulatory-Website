import React, { useState, useRef, useEffect } from 'react';
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
import click12 from './assets/click/click12.png';
import click13 from './assets/click/click13.png';
import click14 from './assets/click/click14.png';
import click15 from './assets/click/click15.png';
import click16 from './assets/click/click16.png';
import click17 from './assets/click/click17.png';
import click18 from './assets/click/click18.png';
import click19 from './assets/click/click19.png';
import click20 from './assets/click/click20.png';
import click21 from './assets/click/click21.png';
import click22 from './assets/click/click22.png';
import click23 from './assets/click/click23.png';
import click24 from './assets/click/click24.png';
import click25 from './assets/click/click25.png';
import click26 from './assets/click/click26.png';
import click27 from './assets/click/click27.png';
import click28 from './assets/click/click28.png';
import click29 from './assets/click/click29.png';
import click30 from './assets/click/click30.png';
import click31 from './assets/click/click31.png';
import click32 from './assets/click/click32.png';
import click33 from './assets/click/click33.png';
import click34 from './assets/click/click34.png';
import click35 from './assets/click/click35.png';
import click36 from './assets/click/click36.png';

import music1 from './assets/music/music1.m4a';

function App() {
  const clickImages = [click1, click2, click3, click4, click5, click6, click7, click8, click9, click10, 
                      click11, click12, click13, click14, click15, click16, click17, click18, click19, click20,
                      click21, click22, click23, click24, click25, click26, click27, click28, click29, click30,
                      click31, click32, click33, click34, click35, click36];
  const [clickEffects, setClickEffects] = useState([]);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const audioRef = useRef(null);
  const musicStartedRef = useRef(false);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // show modal on mobile only
  useEffect(() => {
    if (isMobile) {
      setShowMobileModal(true);
    } else {
      // desktop autoplay
      audioRef.current?.play().catch(() => {});
      musicStartedRef.current = true;
    }
  }, [isMobile]);

  // play bg music on ok press
  const startMusic = () => {
    audioRef.current?.play().catch(() => {});
    musicStartedRef.current = true;
    setShowMobileModal(false);
  };

  // click effect
  const handleClick = (e) => {
    const randomImage = clickImages[Math.floor(Math.random() * clickImages.length)];
    const id = Date.now();

    setClickEffects((prev) => [...prev, { id, src: randomImage, x: e.clientX, y: e.clientY, opacity: 1 }]);

    // fade out at 0.5 sec
    setTimeout(() => {
      setClickEffects((prev) =>
        prev.map((effect) => (effect.id === id ? { ...effect, opacity: 0 } : effect))
      );
    }, 500);
    
    // remove at 1 sec
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  };

  // pause or resume music if website visible or not
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        // site hidden pause
        audioRef.current.pause();
        musicStartedRef.current = false;
      } else {
        // site visible play
        if (!musicStartedRef.current) {
          audioRef.current.play().catch(() => {});
          musicStartedRef.current = true;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // fallback for site visibility 
  useEffect(() => {
    const handlePageHide = () => audioRef.current?.pause();
    const handlePageShow = () => {
      if (!musicStartedRef.current) {
        audioRef.current?.play().catch(() => {});
        musicStartedRef.current = true;
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <div
      onPointerDown={handleClick}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: 'rgb(252,214,243)',
        ...(isMobile && {
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        })
      }}
    >
      <audio ref={audioRef} src={music1} loop preload="auto" />

      {/* Mobile modal */}
      {showMobileModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Congratulations</h5>
              </div>

              <div className="modal-body">
                Press OK to start website music
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={startMusic}>
                  OK
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* click images */}
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
            zIndex: 9999
          }}
        />
      ))}

      <title>Congrats</title>

      <div
        className="d-flex flex-column align-items-center justify-content-center min-vh-100"
        style={{ gap: '2rem', paddingTop: '20px' }}
      >
        <div className="card mb-3 custom-card-border" style={{ maxWidth: '800px', marginLeft: '10px', marginRight: '10px' }}>
          <div className="row g-0">

            <div className="col-md-4">
              <img
                src={alvissa2}
                id="large-card-img"
                style={{ borderColor: '#636363', borderWidth: '1px', borderStyle: 'solid' }}
                className="img-fluid rounded"
                alt="alvissa2"
              />
            </div>

            <div className="col-md-8">
              <div className="card-body h-100 rounded">
                <div className="card-header custom-card-border">
                  <h3 className="card-title" style={{userSelect: 'none'}}><strong>Congratulations</strong></h3>
                  <h6 className="card-title" style={{ paddingLeft: '2px', userSelect: 'none'}}>Alvissa T. Caballa, RN</h6>
                </div>

                <p className="card-text mt-0" style={{userSelect: 'none'}}>
                  I always knew you could do it!
                  I am so happy to see you pass your board exams and become a Registered Nurse.
                  All the stress and sleepless nights you endured was worth it. Your hard work had truly paid off.
                  I'm so proud of you and I love you so much! ❤️
                </p>

                <p className="card-text">
                  <small className="text-body-secondary" style={{userSelect: 'none'}}>November 26 2025</small>
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