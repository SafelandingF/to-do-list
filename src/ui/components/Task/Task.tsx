import React from 'react';

type BooleanNumber = 0 | 1;

export interface TaskProps {
  id: string; //mainKey use uuid
  task: string;

  // 0: false 1: true
  //indexDB 不支持boolean类型
  isFinished: BooleanNumber;
  isPinned: BooleanNumber;

  startTime: string;
  endTime?: string;
}

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  console.log(props);
  return <></>;
};
