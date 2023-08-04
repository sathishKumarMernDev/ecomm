// Generated by CodiumAI

import React from "react";
import Dashboard from "../Dashboard";
import { act, render, fireEvent } from "../../../Redux/utils-test";
import api from "../../../Api";

const mockData = [
  {
    _id: "62bbedcbf88d6c5f471887fe",
    id: 23,
    title: "Product 1",
    description: "description",
    category: "bags",
    image: "test",
    rating: 0,
    netWeight: 100,
    grossWeight: 100,
    price: 100,
    discPrice: 100,
    __v: 0,
  },
  {
    _id: "62bbedcbf88d6c5f471887fe",
    id: 24,
    title: "Product 2",
    description: "description",
    category: "bags",
    image: "test",
    rating: 0,
    netWeight: 100,
    grossWeight: 100,
    price: 100,
    discPrice: 100,
    __v: 0,
  },
];

jest.mock("../../../Api", () => ({
  get: jest.fn(() => Promise.resolve(mockData)),
  delete: jest.fn(),
}));
jest.useFakeTimers();

describe("Dashboard_function", () => {
  const renderComponent = (state = {}) => render(<Dashboard />, state);

  it("renders_without_error", () => {
    const { getByText, queryByRole } = renderComponent();

    expect(getByText(/hi/i)).toBeInTheDocument();
    expect(queryByRole("table")).toBeFalsy();
  });

  it("Check_the_table_renders_with_mockData", () => {
    const mockedState = { Products: { products: mockData, loader: false } };//update the redux state
    const { queryByRole, getByText } = renderComponent(mockedState);

    expect(queryByRole("table")).toBeInTheDocument();
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText(23)).toBeInTheDocument();
  });

  it("Check_delete_product_flow", async () => {
    const mockDeleteAction = jest.spyOn(api, "delete");
    mockDeleteAction.mockResolvedValue({
      response: { message: "product deleted success" },
    });

    const mockedState = { Products: { products: mockData, loader: false } };
    const { getByTestId, queryByRole, getByText, getByRole } =
      renderComponent(mockedState);

    act(() => fireEvent.click(getByTestId("delete_23"))); //initiate delete popup

    expect(queryByRole("dialog")).toBeInTheDocument();
    expect(getByText("Are you sure to Delete ?")).toBeInTheDocument();

    act(() => fireEvent.click(getByRole("button", { name: "Confirm" }))); //give confirm delete
    
    //api wait time for deletion
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText("Product Deleted success")).toBeInTheDocument(); //deleted success
  });

  it("Check_the_edit_product_redirect", () => {
    const mockedState = { Products: { products: mockData, loader: false } };
    const { queryByRole, getByText } = renderComponent(mockedState);

    expect(queryByRole("table")).toBeInTheDocument();
    expect(getByText(23)).toBeInTheDocument();

    act(() => fireEvent.click(getByText(23)));

    expect(window.location.pathname).toBe("/edit/23");
  });

  it("Check_pagination_with_mockedData", () => {
    const mockedState = { Products: { products: mockData, loader: false } };
    const { getByText } = renderComponent(mockedState);

    expect(getByText(1)).toBeInTheDocument();
    act(() => fireEvent.click(getByText(1)));
  });
});