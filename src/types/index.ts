import { ICameraVideoTrack, IMicrophoneAudioTrack, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"

export type Position = [number, number, number];
export type Direction = "up" | "down" | "left" | "right";



export interface UserPayload {
  uid?: string | number,
  position?: Position
  direction?: Direction
}




export interface IShape {
  x: number,
  y: number,
  width: number,
  height: number
}


export enum InOutState {
  JoinRoom1 = 1,
  LeaveRoom1,
  JoinRoom2,
  LeaveRoom2
}

export type IArea = "world" | "room1" | "room2";

export enum RenderType {
  "Canvas" = "canvas",
  "Dom" = "dom"
}
