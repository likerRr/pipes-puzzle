import { useEffect, useRef } from 'react';

import EnterCodeScene from '../game/features/enterCodeScene/EnterCodeScene';
import PhaserGame from '../game/PhaserGame';
import config from '../game/config';
import EndGameScene from '../game/scenes/EndGameScene';
import GameScene from '../game/features/gameScene/GameScene';
import MenuScene from '../game/scenes/MenuScene';
import PreloadScene from '../game/scenes/PreloadScene';

const PipesPuzzle = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phaserGame = new PhaserGame(config);

    if (divRef.current) {
      const game = phaserGame.start(divRef.current, [PreloadScene, MenuScene, GameScene, EndGameScene, EnterCodeScene]);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return (
    <div ref={divRef} />
  );
};

export default PipesPuzzle;
