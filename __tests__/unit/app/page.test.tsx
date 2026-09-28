import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

const mockModeToggle = jest.fn();
const mockSignIn = jest.fn();
const mockDemoSignIn = jest.fn();
const mockPainPoints = jest.fn();
const mockFeatures = jest.fn();
const mockFooter = jest.fn();

let mockDemoSignInShouldThrow = false;

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    disabled,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button disabled={disabled} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
}));

jest.mock("@/components/ui/mode-toggle", () => ({
  ModeToggle: () => {
    mockModeToggle();
    return (
      <button type="button" aria-label="Toggle theme">
        Toggle theme
      </button>
    );
  },
}));

jest.mock("@hugeicons/react", () => ({
  HugeiconsIcon: ({
    icon,
    ...props
  }: {
    icon: unknown;
    className?: string;
    "data-icon"?: string;
  }) => (
    <span data-testid="huge-icon" data-icon-name={String(icon)} {...props} />
  ),
}));

jest.mock("@hugeicons/core-free-icons", () => ({
  ThreeDRotateIcon: "ThreeDRotateIcon",
  GithubIcon: "GithubIcon",
  GoogleIcon: "GoogleIcon",
  Tick01Icon: "Tick01Icon",
}));

jest.mock("@/components/layout/footer", () => ({
  Footer: () => {
    mockFooter();
    return <footer data-testid="footer">Footer</footer>;
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: unknown;
    alt: string;
    [key: string]: unknown;
  }) => (
    <img
      src={typeof src === "string" ? src : "hero-image.png"}
      alt={alt}
      {...props}
    />
  ),
}));

jest.mock("@/components/auth/auth-components", () => ({
  SignIn: ({ provider }: { provider: "google" | "github"; icon: unknown }) => {
    mockSignIn(provider);
    return (
      <button type="button" aria-label={`Sign in with ${provider}`}>
        Sign in with {provider}
      </button>
    );
  },
  DemoSignIn: () => {
    mockDemoSignIn();

    if (mockDemoSignInShouldThrow) {
      throw new Error("Demo sign-in failed");
    }

    return (
      <button type="button" aria-label="Try demo">
        Try demo
      </button>
    );
  },
}));

jest.mock("@/lib/config", () => ({
  DEMO_MODE: false,
}));

jest.mock("@/components/landing/painpoints", () => ({
  PainPoints: () => {
    mockPainPoints();
    return <section data-testid="pain-points">Pain Points</section>;
  },
}));

jest.mock("@/components/landing/features", () => ({
  Features: () => {
    mockFeatures();
    return <section data-testid="features">Features</section>;
  },
}));

async function renderPage() {
  const element = await Page();
  return render(element);
}

describe("Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDemoSignInShouldThrow = false;
  });

  describe("rendering", () => {
    it("renders the application branding", async () => {
      await renderPage();

      expect(screen.getByText("Client")).toBeInTheDocument();
      expect(screen.getByText("Tracker")).toBeInTheDocument();
    });

    it("renders the theme toggle", async () => {
      await renderPage();

      expect(
        screen.getByRole("button", { name: /toggle theme/i }),
      ).toBeInTheDocument();

      expect(mockModeToggle).toHaveBeenCalledTimes(1);
    });

    it("renders the CRM badge", async () => {
      await renderPage();

      expect(
        screen.getByText("All-in-one CRM for freelancer & small business"),
      ).toBeInTheDocument();
    });

    it("renders the main heading", async () => {
      await renderPage();

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /track clients, deals, revenue — all in one place/i,
        }),
      ).toBeInTheDocument();
    });

    it("renders the main description", async () => {
      await renderPage();

      expect(
        screen.getByText(
          /manage leads, track deal progress, and monitor your revenue in one clean workspace/i,
        ),
      ).toBeInTheDocument();
    });

    it("renders the Google and GitHub sign-in options when demo mode is disabled", async () => {
      await renderPage();

      expect(
        screen.getByRole("button", { name: /sign in with google/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /sign in with github/i }),
      ).toBeInTheDocument();

      expect(mockSignIn).toHaveBeenCalledWith("google");
      expect(mockSignIn).toHaveBeenCalledWith("github");
    });

    it("renders the demo sign-in control", async () => {
      await renderPage();

      expect(screen.getAllByRole("button", { name: /try demo/i })).toHaveLength(
        2,
      );

      expect(mockDemoSignIn).toHaveBeenCalledTimes(2);
    });

    it("renders the hero image with accessible alt text", async () => {
      await renderPage();

      const image = screen.getByRole("img", {
        name: /screenshot of the dashboard/i,
      });

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "Screenshot of the dashboard");
    });

    it("renders the pain points section", async () => {
      await renderPage();

      expect(screen.getByTestId("pain-points")).toBeInTheDocument();
      expect(mockPainPoints).toHaveBeenCalledTimes(1);
    });

    it("renders the features section", async () => {
      await renderPage();

      expect(screen.getByTestId("features")).toBeInTheDocument();
      expect(mockFeatures).toHaveBeenCalledTimes(1);
    });

    it("renders the demo section heading", async () => {
      await renderPage();

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: /explore before you commit/i,
        }),
      ).toBeInTheDocument();
    });

    it("renders the demo section description", async () => {
      await renderPage();

      expect(
        screen.getByText(
          /try a pre-populated demo workspace: explore leads, deals, analytics, and billing without creating an account/i,
        ),
      ).toBeInTheDocument();
    });

    it("renders the footer", async () => {
      await renderPage();

      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(mockFooter).toHaveBeenCalledTimes(1);
    });
  });

  describe("conditional rendering", () => {
    it("renders OAuth sign-in buttons when DEMO_MODE is false", async () => {
      await renderPage();

      expect(
        screen.getByRole("button", { name: /sign in with google/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /sign in with github/i }),
      ).toBeInTheDocument();
    });

    it("does not render OAuth sign-in buttons when DEMO_MODE is true", async () => {
      jest.resetModules();

      jest.doMock("@/lib/config", () => ({
        DEMO_MODE: true,
      }));

      const { default: DemoModePage } = await import("@/app/page");
      const element = await DemoModePage();

      render(element);

      expect(
        screen.queryByRole("button", { name: /sign in with google/i }),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByRole("button", { name: /sign in with github/i }),
      ).not.toBeInTheDocument();
    });
  });
});
