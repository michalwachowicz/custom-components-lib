import { act } from "react";
import { render, screen } from "@testing-library/react";
import TextField from "./TextField";
import type { InputVariant } from "../../types/InputVariant";
import userEvent from "@testing-library/user-event";

describe("<TextField />", () => {
  it("inputs text correctly", async () => {
    render(<TextField label='Name' />);

    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    expect(input).toHaveValue("");

    await act(async () => {
      await user.type(input, "test");
    });

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("does not allow input when disabled", async () => {
    render(<TextField label='Name' disabled />);

    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    expect(input).toHaveValue("");
    expect(input).toBeDisabled();

    await act(async () => {
      await user.type(input, "test");
    });

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("renders label correctly", () => {
    render(<TextField label='Name' />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("applies error class if error prop is true", () => {
    render(<TextField label='Name' error />);
    expect(screen.getByTestId("textfield")).toHaveClass("textfield-error");
  });

  it("shows error message if error prop is a string", () => {
    render(<TextField label='Name' error='Incorrect input.' />);

    expect(screen.getByTestId("textfield")).toHaveClass("textfield-error");
    expect(screen.getByText("Incorrect input.")).toBeInTheDocument();
  });

  it("applies focused class when input is focused", async () => {
    render(<TextField label='Name' />);

    const input = screen.getByRole("textbox");
    const user = userEvent.setup();
    const focusedClass = "textfield-focused";

    expect(screen.getByTestId("textfield")).not.toHaveClass(focusedClass);

    await act(async () => {
      await user.click(input);
    });

    expect(screen.getByTestId("textfield")).toHaveClass(focusedClass);
  });

  it("shows legend when variant is outlined and focused or not empty", async () => {
    render(
      <div>
        <TextField label='Name' variant='outlined' />
        <div data-testid='outside' />
      </div>
    );

    const input = screen.getByRole("textbox");
    const user = userEvent.setup();

    expect(screen.queryByTestId("textfield-fieldset")).not.toBeInTheDocument();

    await act(async () => {
      await user.click(input);
    });

    expect(screen.getByTestId("textfield-fieldset")).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByTestId("outside"));
    });

    expect(screen.queryByTestId("textfield-fieldset")).not.toBeInTheDocument();

    await act(async () => {
      await user.type(input, "test");
      await user.click(screen.getByTestId("outside"));
    });

    expect(screen.getByTestId("textfield-fieldset")).toBeInTheDocument();
  });

  describe("variants", () => {
    const variants = ["standard", "outlined", "filled"];
    const errorStates = [true, false, "error message"];
    const disabledStates = [true, false];

    const testCases = variants.flatMap((variant) =>
      errorStates.flatMap((error) =>
        disabledStates.map((disabled) => [variant, error, disabled])
      )
    );

    test.each(testCases)(
      "renders correctly with variant=%s, error=%s, disabled=%s",
      (variant, error, disabled) => {
        const { asFragment } = render(
          <TextField
            label='Name'
            variant={variant as InputVariant}
            error={error}
            disabled={!!disabled}
          />
        );

        expect(asFragment()).toMatchSnapshot();
      }
    );
  });
});
