import { useEffect, useRef } from 'react';

import EnterCodeScene from '../game/features/enterCodeScene/EnterCodeScene';
import FrameScene from '../game/features/frameScene/FrameScene';
import PhaserGame from '../game/PhaserGame';
import config from '../game/config';
import EndGameScene from '../game/features/endGameScene/EndGameScene';
import GameScene from '../game/features/gameScene/GameScene';
import MenuScene from '../game/features/menuScene/MenuScene';
import PreloadScene from '../game/features/preloadScene/PreloadScene';

const PipesPuzzle = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phaserGame = new PhaserGame(config);

    if (divRef.current) {
      const game = phaserGame.start(divRef.current, [
        PreloadScene,
        MenuScene,
        GameScene,
        EndGameScene,
        EnterCodeScene,
        FrameScene,
      ]);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return (
    <>
      <div ref={divRef} />
      <div style={{ textAlign: 'center' }}>&copy; <a href="https://github.com/likerRr">likerRr</a> 2021</div>
    </>
  );
};

export default PipesPuzzle;
