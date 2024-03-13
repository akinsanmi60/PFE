type SpinnerProps = {
  size?: number;
  thickness?: number;
  color?: string;
};

export default function Spinner(props: SpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full"
      style={{
        width: props.size ?? 20,
        height: props.size ?? 20,
        borderColor: props.color ?? '#055E35',
        borderTopColor: 'transparent',
        borderWidth: props.thickness ?? 2,
      }}
    />
  );
}
