export type ProfileTextInputProps = {
  text: string;
  data?: string;
};

export type ProfileInfoTextProps = {
  text: string;
  data?: number;
};

export type ProfileButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export type ProfileRadioButtonProps = {
  icon: React.ReactNode;
  status: boolean;
};