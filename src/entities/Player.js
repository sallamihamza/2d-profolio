import {
  isEmailModalVisibleAtom,
  isProjectModalVisibleAtom,
  isSocialModalVisibleAtom,
  store,
} from "../store";

export default function makePlayer(k, posVec2, speed) {
  const DIAGONAL_FACTOR = 1 / Math.sqrt(2);

  const player = k.add([
    k.sprite("player", { anim: "walk-down-idle" }),
    k.scale(2.5),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0), 5, 10) }),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
      directionName: "walk-down",
    },
  ]);

  let isMouseDown = false;
  const game = document.getElementById("game");

  const setMouse = (state) => (isMouseDown = state);

  ["mousedown", "touchstart"].forEach((e) =>
    game.addEventListener(e, () => setMouse(true))
  );
  ["mouseup", "touchend", "focusout"].forEach((e) =>
    game.addEventListener(e, () => setMouse(false))
  );

  player.onUpdate(() => {
    // Smooth camera follow
    if (!k.getCamPos().eq(player.pos)) {
      k.tween(
        k.getCamPos(),
        player.pos,
        0.2,
        (pos) => k.setCamPos(pos),
        k.easings.linear
      );
    }

    if (
      store.get(isSocialModalVisibleAtom) ||
      store.get(isEmailModalVisibleAtom) ||
      store.get(isProjectModalVisibleAtom)
    )
      return;

    // Reset direction
    player.direction = k.vec2(0, 0);

    // Keyboard movement (Arrows + WASD)
    const left = k.isKeyDown("left") || k.isKeyDown("a");
    const right = k.isKeyDown("right") || k.isKeyDown("d");
    const up = k.isKeyDown("up") || k.isKeyDown("w");
    const down = k.isKeyDown("down") || k.isKeyDown("s");

    if (left) player.direction.x = -1;
    if (right) player.direction.x = 1;
    if (up) player.direction.y = -1;
    if (down) player.direction.y = 1;

    // Mouse movement (override keyboard if mouse is down)
    if (isMouseDown) {
      const worldMousePos = k.toWorld(k.mousePos());
      player.direction = worldMousePos.sub(player.pos).unit();
    }

    // No movement → idle animation
    if (player.direction.eq(k.vec2(0, 0))) {
      const idleAnim = `${player.directionName}-idle`;
      if (player.getCurAnim().name !== idleAnim) {
        player.play(idleAnim);
      }
      return;
    }

    // Determine direction name (4 directions only)
    const dx = player.direction.x;
    const dy = player.direction.y;

    // Choisir la direction dominante pour les diagonales
    if (Math.abs(dx) > Math.abs(dy)) {
      // Mouvement horizontal dominant
      player.directionName = dx > 0 ? "walk-right" : "walk-left";
    } else {
      // Mouvement vertical dominant ou égal
      player.directionName = dy > 0 ? "walk-down" : "walk-up";
    }

    // Switch animation only when changed
    if (player.getCurAnim().name !== player.directionName) {
      player.play(player.directionName);
    }

    // Apply movement with diagonal normalization
    const moveSpeed =
      player.direction.x && player.direction.y
        ? DIAGONAL_FACTOR * speed
        : speed;

    player.move(player.direction.scale(moveSpeed));
  });

  return player;
}
