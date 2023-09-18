import { Direction, Position, UserPayload } from '../../../types';
import * as PIXI from 'pixi.js';

export interface IRenderOptions {
  node: HTMLElement,
  width: number,
  height: number,
  joinRoom?: (id: string) => boolean | Promise<boolean>
  leaveRoom?: (id: string) => boolean | Promise<boolean>
}


export interface IPersonOptions {
  isMe?: boolean;
  app?: PIXI.Application;
}

export interface IPersonDrawOptions {
  uid?: string
  position?: Position;
  direction?: Direction;
  scale?: number
}

export interface RemoteUserPayloads {
  [uid: string]: UserPayload
}


export type InOutEvents = {
  "join-room": string;  // 进入房间
  "leave-room": string  // 离开房间
};


export type EventHandler<T = unknown> = (event: T) => void;
