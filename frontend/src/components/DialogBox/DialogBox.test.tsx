import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DialogBox from "./DialogBox";

describe("DialogBox Component", () => {
  const mockHandleClose = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const form = { title: "Test Title", content: "Test Content" };

  test("renders DialogBox when open is true", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        handleChange={mockHandleChange}
        form={form}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByText("Edit Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue("Test Title");
    expect(screen.getByLabelText("Content")).toHaveValue("Test Content");
  });

  test("calls handleChange when text fields are changed", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        handleChange={mockHandleChange}
        form={form}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Title" },
    });

    fireEvent.change(screen.getByLabelText("Content"), {
      target: { value: "New Content" },
    });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  test("calls handleClose when cancel button is clicked", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        handleChange={mockHandleChange}
        form={form}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("calls handleSubmit when update button is clicked", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        handleChange={mockHandleChange}
        form={form}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.click(screen.getByText("Update"));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("does not render DialogBox when open is false", () => {
    render(
      <DialogBox
        open={false}
        handleClose={mockHandleClose}
        handleChange={mockHandleChange}
        form={form}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.queryByText("Edit Post")).not.toBeInTheDocument();
  });
});
