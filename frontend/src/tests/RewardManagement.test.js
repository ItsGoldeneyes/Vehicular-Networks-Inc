import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RewardsManagement from "../pages/RewardsManagement";
import axios from "axios";

// Mock axios to avoid actual API calls
jest.mock("axios");

describe("RewardsManagement", () => {
  beforeEach(() => {
    // Reset mock data before each test
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
  });

  test("displays rewards", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { Reward_ID: 1, rewardName: "Free Coffee", RewardsDescription: "Enjoy a free coffee", Points_required: 100, Status: "Active" },
        { Reward_ID: 2, rewardName: "Discount Voucher", RewardsDescription: "10% off on your next purchase", Points_required: 200, Status: "Inactive" },
      ]
    });

    render(<RewardsManagement />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    // Check if the rewards are displayed in the table
    expect(screen.getByText("Free Coffee")).toBeInTheDocument();
    expect(screen.getByText("Discount Voucher")).toBeInTheDocument();
  });

  test("edit reward functionality", async () => {
    const mockReward = {
      Reward_ID: 1,
      rewardName: "Free Coffee",
      RewardsDescription: "Enjoy a free coffee",
      Points_required: 100,
      Status: "Active"
    };

    axios.get.mockResolvedValueOnce({ data: [mockReward] });

    render(<RewardsManagement />);

    // Wait for the reward to load
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Click the "Edit" button
    fireEvent.click(screen.getByText(/Edit/i));

    // Verify that the modal is open and the reward details are loaded
    expect(screen.getByLabelText(/Points:/i).value).toBe("100");
    expect(screen.getByLabelText(/Status:/i).value).toBe("Active");

    // Change values in the modal
    fireEvent.change(screen.getByLabelText(/Points:/i), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText(/Status:/i), { target: { value: "Inactive" } });

    // Simulate saving the reward
    axios.put.mockResolvedValueOnce({ data: {} });
    fireEvent.click(screen.getByText(/Save/i));

    // Check if the success message is shown
    await waitFor(() => expect(screen.getByText("Reward updated successfully")).toBeInTheDocument());

    // Verify that the API call to save the reward is made
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:5000/api/rewards/1",
      expect.objectContaining({
        Points: "150",
        Status: "Inactive",
        Name: expect.any(String),
        Description: expect.any(String),
      })
    );
  });

  test("handles error when adding or editing reward", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.post.mockRejectedValueOnce(new Error("Failed to add reward"));

    render(<RewardsManagement />);
    // Fill out the form to add a new reward
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: "Free Tea" } });
    fireEvent.change(screen.getByLabelText(/Points:/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: "Enjoy a free tea" } });
    fireEvent.change(screen.getByLabelText(/Status:/i), { target: { value: "Active" } });

    fireEvent.click(screen.getByText(/Add Reward/i));

    // Check if the error handling works
    await waitFor(() => expect(screen.queryByText("Reward added successfully")).not.toBeInTheDocument());
  });
});
