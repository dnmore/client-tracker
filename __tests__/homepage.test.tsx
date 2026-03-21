import { render, screen } from "@testing-library/react";

// Mock UI components
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h1>{children}</h1>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}));

jest.mock("@hugeicons/react", () => ({
  HugeiconsIcon: () => <span data-testid="icon" />,
}));

jest.mock("@/components/auth/auth-components", () => ({
  SignIn: ({ provider }: any) => (
    <button>{`Sign in with ${provider}`}</button>
  ),
  DemoSignIn: () => <div>Demo Sign In</div>,
}));

// Helper to mock config dynamically
const mockConfig = (demoMode: boolean) => {
  jest.doMock("@/lib/config", () => ({
    DEMO_MODE: demoMode,
  }));
};

describe("Page", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("renders main heading and description", async () => {
    mockConfig(false);
    const PageComp = (await import("../app/page")).default;

    render(await PageComp());

    expect(
      screen.getByText(/Track Clients, Deals, Revenue/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Manage leads, track deal progress/i)
    ).toBeInTheDocument();
  });

  it("renders OAuth sign-in buttons when DEMO_MODE is false", async () => {
    mockConfig(false);
    const PageComp = (await import("../app/page")).default;

    render(await PageComp());

    expect(screen.getByText(/Sign in with google/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in with github/i)).toBeInTheDocument();
  });

  it("renders demo mode UI when DEMO_MODE is true", async () => {
    mockConfig(true);
    const PageComp = (await import("../app/page")).default;

    render(await PageComp());

    expect(
      screen.getByText(/Demo Mode: OAuth disabled/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Login With Google/i)
    ).toBeDisabled();

    expect(
      screen.getByText(/Login With GitHub/i)
    ).toBeDisabled();
  });

  it("always renders DemoSignIn component", async () => {
    mockConfig(false);
    const PageComp = (await import("../app/page")).default;

    render(await PageComp());

    expect(screen.getByText(/Demo Sign In/i)).toBeInTheDocument();
  });

  it("renders ModeToggle", async () => {
    mockConfig(false);
    const PageComp = (await import("../app/page")).default;

    render(await PageComp());

    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });
});