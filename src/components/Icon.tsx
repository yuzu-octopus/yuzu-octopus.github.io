interface IconProps {
  name: string;
  size?: number;
}

export function Icon({ name, size = 24 }: IconProps) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
