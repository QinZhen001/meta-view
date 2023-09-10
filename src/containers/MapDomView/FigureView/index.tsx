import Figure from "../../../components/Figure";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import "./index.scss"

const FigureView = () => {
  const position = useSelector((state: RootState) => state.globalInfo.position);
  const remoteUserPayloads = useSelector((state: RootState) => state.globalInfo.remoteUserPayloads);
  const direction = useSelector((state: RootState) => state.globalInfo.direction);
  const { uid } = useSelector((state: RootState) => state.globalInfo.info);

  return < >
    <Figure
      x={position[0]}
      y={position[1]}
      uid={uid}
      key={uid}
      r1={0}
      r2={0}
      isMe={true}
      direction={direction}
      style={{ color: "#eb2f96" }}></Figure>
    {Object.keys(remoteUserPayloads).map(uid => {
      const { position = [0, 0], direction = "down" } = remoteUserPayloads[uid]
      const [x, y] = position
      return x !== undefined ?
        <Figure
          x={x}
          y={y}
          uid={uid}
          key={uid}
          direction={direction}
          style={{ color: "white" }}></Figure> : null
    })}
  </>
}



export default FigureView
