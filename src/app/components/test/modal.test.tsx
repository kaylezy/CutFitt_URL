// src/components/LoginModal.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginModal from "../../pages/modal/modal";
import { describe, test, it, expect, vi } from "vitest";

describe("<LoginModal/>", () => {
  test("renders loginModal", () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByText("Login Required")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You need to be logged in before you can perform that operation."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <LoginModal isOpen={false} onClose={() => {}} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("calls onClose when the Close button is clicked", () => {
    const handleClose = vi.fn();
    render(<LoginModal isOpen={true} onClose={handleClose} />);

    fireEvent.click(screen.getByText("Close"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
