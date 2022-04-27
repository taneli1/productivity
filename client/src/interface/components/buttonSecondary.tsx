interface ButtonSecondaryProps {
  text: string;
  onClick: () => void;
}

export const SecondaryButton: React.FunctionComponent<ButtonSecondaryProps> = ({
  children,
  text,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="pop hover-shadow  shadow-sm hover-op d-flex align-content-center p-2"
      style={{ border: "1px solid #cecece", borderRadius: 4 }}
    >
      {children}
      <span className="p-1"></span>
      {text}
    </div>
  );
};
