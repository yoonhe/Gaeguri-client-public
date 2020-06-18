import React, { useRef } from 'react';
import Drawer from 'react-native-drawer';

function RoomDrawer() {
  const _drawer = useRef(null);

  const closeControlPanel = () => {
    _drawer.close();
  };
  const openControlPanel = () => {
    _drawer.open();
  };
  return <Drawer ref={ref => (_drawer = ref)} content={<ControlPanel />} />;
}

export default RoomDrawer();
