export type ButtonProps = {
  style?: React.CSSProperties | undefined;
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
};
