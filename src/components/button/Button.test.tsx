import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Button, { ButtonSize, ButtonVariant } from "./Button";

describe("<Button />", () => {
  const sizes = ["small", "medium", "large"];
  const variants = ["text", "contained", "outlined"];
  const disabledStates = [true, false];

  it("renders children properly", () => {
    render(<Button size='medium'>Test</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test");
  });

  it("sets disabled status properly", () => {
    const { rerender } = render(<Button size='medium'>Test</Button>);
    expect(screen.getByRole("button")).not.toBeDisabled();

    rerender(
      <Button size='medium' disabled>
        Test
      </Button>
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  describe("applies the correct size class", () => {
    test.each(sizes)('applies "btn-%s" class when size="%s"', (size) => {
      render(<Button size={size as ButtonSize}>Test</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass(`btn-${size}`);
    });
  });

  describe("applies the correct variant class", () => {
    test.each(variants)(
      'applies "btn-%s" class when variant="%s"',
      (variant) => {
        render(
          <Button variant={variant as ButtonVariant} size='medium'>
            Test
          </Button>
        );
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass(`btn-${variant}`);
      }
    );
  });

  describe("renders correctly with different props and matches snapshot", () => {
    const testCases = sizes.flatMap((size) =>
      variants.flatMap((variant) =>
        disabledStates.map((disabled) => [size, variant, disabled])
      )
    );

    test.each(testCases)(
      "renders correctly with size=%s, variant=%s, disabled=%s",
      (size, variant, disabled) => {
        const { asFragment } = render(
          <Button
            size={size as ButtonSize}
            variant={variant as ButtonVariant}
            disabled={!!disabled}
          >
            Test
          </Button>
        );

        expect(asFragment()).toMatchSnapshot();
      }
    );
  });

  it("runs click handler and spawns entity", async () => {
    jest.useFakeTimers();

    const onClick = jest.fn();
    const user = userEvent.setup({ delay: null });

    render(
      <Button size='medium' onClick={onClick}>
        Test
      </Button>
    );

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId("btn-entity")).not.toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("btn-entity")).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId("btn-entity")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("does not run when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup({ delay: null });

    render(
      <Button size='medium' onClick={onClick} disabled>
        Test
      </Button>
    );

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId("btn-entity")).not.toBeInTheDocument();
  });
});
