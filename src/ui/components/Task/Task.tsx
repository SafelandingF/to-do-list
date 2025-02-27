import React from 'react';

export interface TaskProps {
  id: string; //mainKey use uuid
  task: string;

  isFinished: boolean;
  isPinned: boolean;

  startTime: string;
  endTime?: string;
}

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  console.log(props);
  return <></>;
};
