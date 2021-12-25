export type MenuSceneFromLimitReached = {
  wasted: boolean,
}

export type MenuSceneFromPause = {
  isPause: boolean,
  resume(): void,
  restart(): void,
}

type MenuSceneCreateData = MenuSceneFromLimitReached & MenuSceneFromPause;

export default MenuSceneCreateData;
