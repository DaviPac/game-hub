import { useEffect, useRef } from "react";
import Phaser from "phaser";

function LoadingGame() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 300,
      height: 200,
      parent: gameRef.current,
      backgroundColor: "#1e1e2f",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
        },
      },
      scene: {
        create,
        update,
      },
    };

    let player: Phaser.GameObjects.Arc;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    function create(this: Phaser.Scene) {
      player = this.add.circle(150, 100, 15, 0x00ff00);
      this.physics.add.existing(player);
      if (this.input.keyboard) cursors = this.input.keyboard?.createCursorKeys();
    }

    function update(this: Phaser.Scene) {
      if (!player) return;
      const speed = 200;
      const body = player.body as Phaser.Physics.Arcade.Body;
      body.setVelocity(0);

      if (cursors.left?.isDown) body.setVelocityX(-speed);
      else if (cursors.right?.isDown) body.setVelocityX(speed);

      if (cursors.up?.isDown) body.setVelocityY(-speed);
      else if (cursors.down?.isDown) body.setVelocityY(speed);
    }

    phaserRef.current = new Phaser.Game(config);

    return () => {
      phaserRef.current?.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
}

export default LoadingGame;