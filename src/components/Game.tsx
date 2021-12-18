import { useEffect, useRef } from 'react';

import PhaserGame from '../game/PhaserGame';
import config from '../game/config';
import PreloadScene from '../game/scenes/PreloadScene';

const Game = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phaserGame = new PhaserGame(config);

    if (divRef.current) {
      const game = phaserGame.start(divRef.current, [PreloadScene]);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return (
    <div ref={divRef} />
  );
};

export default Game;
