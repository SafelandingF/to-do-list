interface CheckBoxProps {
  size: string | number;
  disable: boolean;
  color: string;
}

export const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { color, disable, size } = props;

  return (
    <>
      <div>123</div>
    </>
  );
};
