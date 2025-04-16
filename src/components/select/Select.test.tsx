import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";
import { InputVariant } from "../../types/InputVariant";

describe("<Select />", () => {
  const options = [
    { value: "1", content: "Option 1" },
    { value: "2", content: "Option 2" },
  ];

  it("opens menu when button is clicked", async () => {
    render(<Select label='Select' options={options} />);

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("does not open menu when disabled", async () => {
    render(<Select label='Select' options={options} disabled />);

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes menu when clicking outside", async () => {
    render(<Select label='Select' options={options} />);

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders label correctly", () => {
    render(<Select label='Select' options={options} />);
    expect(screen.getByText("Select")).toBeInTheDocument();
  });

  it("renders error message if error prop is a string", () => {
    render(
      <Select label='Select' options={options} error='Incorrect input.' />
    );

    expect(screen.getByTestId("input")).toHaveClass("input-error");
    expect(screen.getByText("Incorrect input.")).toBeInTheDocument();
  });

  it("selects a proper option", async () => {
    render(<Select label='Select' options={options} />);

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    await act(async () => {
      await user.click(screen.getByText("Option 1"));
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("applies focused class when input is focused", async () => {
    render(<Select label='Name' options={options} />);

    const input = screen.getByRole("button");
    const user = userEvent.setup();
    const focusedClass = "input-focused";

    expect(screen.getByTestId("input")).not.toHaveClass(focusedClass);

    await act(async () => {
      await user.click(input);
    });

    expect(screen.getByTestId("input")).toHaveClass(focusedClass);
  });

  it("shows legend when variant is outlined and focused or not empty", async () => {
    render(
      <div>
        <Select label='Name' variant='outlined' options={options} />
        <div data-testid='outside' />
      </div>
    );

    const input = screen.getByRole("button");
    const user = userEvent.setup();

    expect(screen.queryByTestId("input-fieldset")).not.toBeInTheDocument();

    await act(async () => {
      await user.click(input);
    });

    expect(screen.getByTestId("input-fieldset")).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByTestId("outside"));
    });

    expect(screen.queryByTestId("input-fieldset")).not.toBeInTheDocument();
  });

  describe("snapshots", () => {
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
          <Select
            label='Name'
            variant={variant as InputVariant}
            error={error}
            disabled={!!disabled}
            options={options}
          />
        );

        expect(asFragment()).toMatchSnapshot();
      }
    );
  });
});
