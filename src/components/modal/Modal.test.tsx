import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("<Modal />", () => {
  it("displays the modal when open is true", () => {
    render(<Modal open />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("modal-backdrop")).toBeInTheDocument();
  });

  it("does not display the modal when open is false", () => {
    render(<Modal>Test</Modal>);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-backdrop")).not.toBeInTheDocument();
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });

  it("shows the children when passed", () => {
    render(<Modal open>Test</Modal>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("closes the modal when backdrop is clicked", async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();

    render(<Modal open onClose={handleClose} />);

    await act(async () => {
      await user.click(screen.getByRole("dialog"));
    });

    expect(handleClose).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(screen.getByTestId("modal-backdrop"));
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  describe("snapshots", () => {
    const children = ["Test", undefined];
    const onClose = [undefined, jest.fn()];
    const open = [true, false];

    const testCases = open.flatMap((o) =>
      onClose.flatMap((c) =>
        children.map((child) => ({
          open: o,
          onClose: c,
          children: child,
        }))
      )
    );

    test.each(testCases)(
      "renders correctly with open=%s, onClose=%s, children=%s",
      ({ open, onClose, children }) => {
        const { asFragment } = render(
          <Modal open={open} onClose={onClose}>
            {children}
          </Modal>
        );

        expect(asFragment()).toMatchSnapshot();
      }
    );
  });
});
