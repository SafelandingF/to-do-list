import React from 'react';

interface TaskProps {
  task: string;

  isFinished: boolean;
  isPinned?: boolean;

  startTime: string;
  endTime?: string;
}

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  console.log(props);
  return <></>;
};
