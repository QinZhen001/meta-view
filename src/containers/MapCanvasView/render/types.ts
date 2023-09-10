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
  uid: string | number
  position?: Position;
  direction?: Direction;
  isMe?: boolean;
  app?: PIXI.Application;
}

export interface IPersonUpdateOptions {
  position?: Position;
  direction?: Direction;
}

export interface RemoteUserPayloads {
  [uid: string]: UserPayload
} 


export type InOutEvents = {
  "join-room": string;  // 进入房间
  "leave-room": string  // 离开房间
};


export type EventHandler<T = unknown> = (event: T) => void;
