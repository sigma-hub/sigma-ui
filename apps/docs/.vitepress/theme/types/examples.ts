export type Example = {
  name: 'mix'
    | 'mail'
    | 'dashboard'
    | 'table'
    | 'settings'
    | 'authentication';
  code: string;
  /**
   * `content` grows the frame to the demo's height so the page scrolls instead of the frame.
   * `fixed` keeps the default height for full-app layouts that fill the frame and scroll their own panes.
   */
  frameHeight: 'content' | 'fixed';
};
