import React, { ComponentProps } from "react";

type TBtn = ComponentProps<"button"> & { variant: BtnVariant };

type BtnVariant = "primary" | "secondary" | "warning" | "success" | "danger";

const Button = ({ children, variant, style, ...rest }: TBtn) => {
  return (
    <button
      className="mt-2"
      style={{
        padding: ".25rem",
        borderRadius: ".215rem",
        ...style,
        ...checkVariant(variant),
      }}
      {...rest}>
      {children}
    </button>
  );
};

function checkVariant(variant: BtnVariant) {
  switch (variant) {
    case "primary": {
      return { backgroundColor: "#0891b2", color: "#fff" };
    }
    case "secondary": {
      return { backgroundColor: "#3f3f46", color: "#fff" };
    }
    case "warning": {
      return { backgroundColor: "#fb923c", color: "#fff" };
    }
    case "success": {
      return { backgroundColor: "#22c55e", color: "#fff" };
    }
    case "danger": {
      return { backgroundColor: "#ef4444", color: "#fff" };
    }

    default: {
      return variant;
    }
  }
}

export default Button;
