import { Direction, IShape, Position, EnumRtcLayout } from "../types";
import { Modal } from 'antd';
import { useMap } from "./hooks";

export const getRandomPositiveInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getScreenShareUid = (uid: string | number) => {
  uid = String(uid)
  uid += "0"
  return Number(uid)
}

export const getRandomUid = () => {
  return getRandomPositiveInt(10000000, 99999999)
}

export const getRandomInt = (limit = 300) => {
  return Math.floor(Math.random() * limit)
}

// string to Uint8Array
export function stringToUint8Array(str: string) {
  const arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  const tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}

// Uint8Array to  string
export function uint8ArrayToString(fileData: any) {
  let dataString = "";
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
}



export async function generateToken(uid: string | number, channelName: string) {
  const url = 'https://toolbox.bj2.agoralab.co/v2/token/generate';
  const data = {
    // appId: APP_ID,
    // appCertificate: APP_CERTIFICATE,
    channelName,
    expire: 3600,
    src: "ios",
    types: [1, 2],
    uid: uid + ""
  };
  let resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }) as any
  resp = await resp.json() || {}
  return resp?.data?.token || null
}


export const genPublicPath = (path: string) => {
  const PREFIX = "/web-meta"
  const mode = import.meta.env.MODE
  switch (mode) {
    case "production":
      return PREFIX + path
    default:
      return path
  }
}



export const getForwardDirection = (direction: Direction): Position => {
  switch (direction) {
    case "up":
      return [0, -1, 0]
    case "down":
      return [0, 1, 0]
    case "left":
      return [-1, 0, 0]
    case "right":
      return [1, 0, 0]
  }
}


export const getRightDirection = (direction: Direction): Position => {
  switch (direction) {
    case "up":
      return [1, 0, 0]
    case "down":
      return [-1, 0, 0]
    case "left":
      return [0, 1, 0]
    case "right":
      return [0, -1, 0]
  }
}





export const getInitPosition = (): Position => {
  let startX = 22
  let startY = 20
  let width = 38
  let height = 106
  let endX = startX + width
  let endY = startY + height
  const x = getRandomPositiveInt(startX, endX)
  const y = getRandomPositiveInt(startY, endY)

  return [x, y, 0] as Position

  // return [0, 0, 0] as Position
}


export const showModal = ({
  title,
  content
}: {
  title: string,
  content: string
}): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      content,
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    });
  });
};

