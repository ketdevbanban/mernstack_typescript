import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import axios from 'axios';

interface UserStatusSwitchProps {
  id: number;
  status: boolean ;
  loadUserData: () => void;
}

const UserStatusSwitch = ({ id, status, loadUserData }: UserStatusSwitchProps) => {
  const [checked, setChecked] = useState<boolean>(status);

  const handleStatusChange = async (checked: boolean) => {
    try {
      await axios.put(`/users/${id}/status`, { status: checked });
      loadUserData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleStatusChange(checked);
  }, [id, checked]);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <Switch
      className="bg-gray-500"
      checked={checked}
      onChange={handleChange}
      disabled={status === undefined}
    />
  );
};

export default UserStatusSwitch;
