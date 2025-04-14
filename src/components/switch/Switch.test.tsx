import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "./Switch";

describe("<Switch />", () => {
  it("renders with label properly", () => {
    render(<Switch label='Test' />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("is checked when checked prop is true", () => {
    render(<Switch checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is not checked when checked prop is false", () => {
    render(<Switch />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("is not disabled when disabled prop is false", () => {
    render(<Switch />);
    expect(screen.getByRole("checkbox")).not.toBeDisabled();
  });

  it("runs onChange when clicked", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Switch onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(screen.getByTestId("switch"));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not run onChange when disabled", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Switch onChange={onChange} disabled />);

    await act(async () => {
      await user.click(screen.getByRole("checkbox"));
    });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("spawns entity on click", async () => {
    jest.useFakeTimers();

    render(<Switch />);
    const user = userEvent.setup({ delay: null });

    await act(async () => {
      await user.click(screen.getByTestId("switch"));
    });

    expect(screen.getByTestId("entity")).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId("entity")).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("does not spawn entity when disabled", async () => {
    render(<Switch disabled />);

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByTestId("switch"));
    });

    expect(screen.queryByTestId("entity")).not.toBeInTheDocument();
  });

  it("toggles the switch with the spacebar", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Switch onChange={handleChange} />);
    expect(handleChange).toHaveBeenCalledTimes(0);

    const checkbox = screen.getByRole("checkbox");

    await act(async () => {
      await user.tab();
    });

    expect(checkbox).toHaveFocus();

    await act(async () => {
      await user.keyboard("[Space]");
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  describe("snapshots", () => {
    const labels = [undefined, "Test"];
    const booleans = [true, false];

    const testCases = labels.flatMap((label) =>
      booleans.flatMap((checked) =>
        booleans.map((disabled) => ({
          label,
          checked,
          disabled,
        }))
      )
    );

    test.each(testCases)(
      "renders correctly with label=%s, checked=%s, disabled=%s",
      ({ label, checked, disabled }) => {
        const { asFragment } = render(
          <Switch label={label} checked={checked} disabled={disabled} />
        );

        expect(asFragment()).toMatchSnapshot();
      }
    );
  });
});
