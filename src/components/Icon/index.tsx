import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import "./index.scss"

// camera
import { ReactComponent as CameraOnSvg } from './assets/fcr_cameraon.svg';
import { ReactComponent as CameraOffSvg } from './assets/fcr_cameraoff.svg';
// mic 
import { ReactComponent as MicOnSvg } from './assets/fcr_mute.svg';
import { ReactComponent as MicOffSvg } from "./assets/fcr_nomute.svg"
// rtc layout
import { ReactComponent as LayoutTopSvg } from "./assets/fcr_topwindows2.svg"
import { ReactComponent as LayoutContentSvg } from "./assets/fcr_topwindows.svg"
import { ReactComponent as LayoutGridSvg } from "./assets/fcr_fourwindows.svg"
// screen share 
import { ReactComponent as ScreenSharingSvg } from "./assets/fcr_screensharing.svg"
import { ReactComponent as ScreenShareCloseSvg } from "./assets/fcr_screensharing_close.svg"
// arrow
import { ReactComponent as LeftSvg } from "./assets/fcr_left.svg"
import { ReactComponent as RightSvg } from "./assets/fcr_right.svg"
import { ReactComponent as LeftSvg1 } from "./assets/fcr_left1.svg"
import { ReactComponent as RightSvg1 } from "./assets/fcr_right1.svg"
// other
import { ReactComponent as SettingSvg } from "./assets/fcr_setting.svg"
import { ReactComponent as DropdownSvg } from "./assets/fcr_dropdown.svg"

export * from "./mic"

interface IconComponentProps extends CustomIconComponentProps {
  onClick?: () => void;
}

export const CameraOnIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={CameraOnSvg} {...props} />
);

export const CameraOffIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={CameraOffSvg} {...props} />
)

export const MicOnIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MicOnSvg} {...props} />
)

export const MicOffIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={MicOffSvg} {...props} />
)

export const ScreenSharingIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ScreenSharingSvg} {...props} />
)

export const ScreenShareCloseIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={ScreenShareCloseSvg} {...props} />
)

export const SettingIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={SettingSvg} {...props} />
)

export const LayoutTopIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={LayoutTopSvg} {...props} />
)

export const LayoutContentIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={LayoutContentSvg} {...props} />
)

export const LayoutGridIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={LayoutGridSvg} {...props} />
)


export const LeftIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={LeftSvg} {...props} />
)

export const RightIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={RightSvg} {...props} />
)


export const LeftIcon1 = (props: Partial<IconComponentProps>) => (
  <Icon component={LeftSvg1} {...props} />
)

export const RightIcon1 = (props: Partial<IconComponentProps>) => (
  <Icon component={RightSvg1} {...props} />
)


export const DropdownIcon = (props: Partial<IconComponentProps>) => (
  <Icon component={DropdownSvg} {...props} />
)

