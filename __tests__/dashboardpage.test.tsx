import { render, screen } from "@testing-library/react";


// Mock UI components
jest.mock("@/components/dashboard/dashboard-skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-skeleton" />,
}));

jest.mock("@/components/ui/dashboard-cards", () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-cards">Cards Loaded</div>,
}));

describe("Dashboard Page", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("renders heading and description", async () => {
    const Page = (await import("../app/dashboard/page")).default;

    render(await Page());

    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()

    
    expect(
      screen.getByText(/Welcome to your dashboard/i)
    ).toBeInTheDocument();
  });

  it("renders DashboardCards component", async () => {
    const Page = (await import("../app/dashboard/page")).default;

    render(await Page());

    expect(
      screen.getByTestId("dashboard-cards")
    ).toBeInTheDocument();
  });

  it("does not show fallback when component resolves immediately", async () => {
    const Page = (await import("../app/dashboard/page")).default;

    render(await Page());

    expect(
      screen.queryByTestId("dashboard-skeleton")
    ).not.toBeInTheDocument();
  });
});