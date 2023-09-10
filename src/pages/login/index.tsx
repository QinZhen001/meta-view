import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography, Switch, message } from "antd"
import { useSelector, useDispatch } from 'react-redux';
import { setInfo } from "../../store/reducers/global-info"
import { getRandomUid } from "../../utils/utils"
import { STORAGE_INFO, saveToLocal } from "../../utils/storage"
import { RenderType } from "../../types/index"
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { DEFAULT_WORLD_ID, DEFAULT_RENDER_TYPE } from "../../utils/constant"
import "./index.scss"

const { Text } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uid, setUid] = useState(getRandomUid())
  const [worldId, setWorldId] = useState(DEFAULT_WORLD_ID)
  const [renderType, setRenderType] = useState<RenderType>(DEFAULT_RENDER_TYPE)

  const onClick = async () => {
    const info = {
      uid,
      worldId,
      renderType
    }
    dispatch(setInfo(info))
    saveToLocal(STORAGE_INFO, info)
    navigate("/main");
  }

  const onChangeUid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(parseInt(e.target.value))
  }

  const onChangeWorldId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorldId(e.target.value)
  }

  const onTypeChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    if (value == RenderType.Canvas) {
      message.info("Canvas mode is not supported yet")
    }
    setRenderType(value);
  }


  return <div className="login-page">
    <section className="card">
      <div className="title">Meta View</div>
      <div className="text">uid: </div>
      <Input placeholder="Please input uid" type="number" onChange={onChangeUid} value={uid}></Input>
      <div className="text">worldId: </div>
      <Input placeholder="Please input worldId" onChange={onChangeWorldId} value={worldId}></Input>
      <div className="text">render mode: </div>
      <Radio.Group onChange={onTypeChange} value={renderType}>
        <Radio value={RenderType.Dom}>Dom</Radio>
        <Radio value={RenderType.Canvas}>Canvas</Radio>
      </Radio.Group>
      <div className="btn-wrapper">
        <Button className="btn" type="primary" onClick={onClick}>Join</Button>
      </div>
    </section>
  </div>
}


export default LoginPage
