export type TextProps = {
  style?: React.CSSProperties | undefined;
  text: string;
  className?: string;
  type?: 'p' | 'span' | 'title';
  color?: string;
  onClick?: () => void;
};
