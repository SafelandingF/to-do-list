import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type BooleanNumber = 0 | 1;

export interface Task {
  id: string; //mainKey use uuid
  task: string;

  // 0: false 1: true
  //indexDB 不支持boolean类型
  isFinished: BooleanNumber;
  isPinned: BooleanNumber;
  isOverdue?: BooleanNumber;
  // 'YYYY-MM-DD HH:mm:ss'
  startTime: string;
  endTime?: string;
}

interface TaskProps extends Task {
  handleOverdue?: (isOverdue: boolean) => void;
}

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  const [isOverdue, setIsOverdue] = useState(
    dayjs(props.endTime).isBefore(dayjs())
  );

  useEffect(() => {
    if (props.handleOverdue) {
      props.handleOverdue(isOverdue);
    }
  }, [isOverdue, props]);

  if (props.endTime) {
    window.electron.handleCheckOverdueTask((time) => {
      const ans = dayjs(time).isBefore(dayjs());
      setIsOverdue(ans);
    });
  }

  return (
    <>
      <div className={isOverdue ? ' w-48' : 'w-2'}></div>
    </>
  );
};
