import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [today, setToday] = useState(new Date());
  const [clockName, setClockName] = useState('Clock-0');
  const [hasClock, setHasClock] = useState(true);

  useEffect(() => {
    const timeId = window.setInterval(() => {
      if (hasClock) {
        setToday(new Date());
        // eslint-disable-next-line no-console
        console.log(today.toUTCString().slice(-12, -4));
      }
    }, 1000);

    return () => {
      // this code stops the timer and time
      window.clearInterval(timeId);
    };
  }, [today, hasClock]);

  useEffect(() => {
    // This code starts a timer
    const timerId = window.setInterval(() => {
      if (hasClock) {
        setClockName(prevClockName => {
          const newName = getRandomName();

          // eslint-disable-next-line no-console
          console.log(`Renamed from ${prevClockName} to ${newName}`);

          return newName;
        });
      }
    }, 3300);

    return () => {
      window.clearInterval(timerId);
    };
  }, [clockName, hasClock]);

  useEffect(() => {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault(); // not to show the context menu

      setHasClock(false);
    });
  }, []);

  useEffect(() => {
    document.addEventListener('click', () => {
      setHasClock(true);
    });
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>

      <div className={`Clock ${hasClock ? '' : 'is-hidden'}`}>
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    </div>
  );
};
