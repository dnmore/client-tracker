import { render, screen } from "@testing-library/react";
import Page, { metadata } from "@/app/dashboard/page";

const mockSidebarTrigger = jest.fn();
const mockBreadcrumb = jest.fn();
const mockBreadcrumbList = jest.fn();
const mockBreadcrumbItem = jest.fn();
const mockBreadcrumbLink = jest.fn();
const mockBreadcrumbPage = jest.fn();
const mockBreadcrumbSeparator = jest.fn();
const mockDashboardCards = jest.fn();
const mockDashboardSkeleton = jest.fn();

jest.mock("@/components/dashboard/dashboard-skeleton", () => ({
  __esModule: true,
  default: () => {
    mockDashboardSkeleton();

    return (
      <div role="status" aria-label="Loading dashboard">
        Loading dashboard...
      </div>
    );
  },
}));

jest.mock("@/components/ui/dashboard-cards", () => ({
  __esModule: true,
  default: () => {
    mockDashboardCards();

    return (
      <section aria-label="Dashboard cards">
        <h1>Dashboard cards</h1>
        <button type="button">Dashboard action</button>
      </section>
    );
  },
}));

jest.mock("@/components/ui/sidebar", () => ({
  SidebarTrigger: ({
    className,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    mockSidebarTrigger();

    return (
      <button
        type="button"
        aria-label="Toggle sidebar"
        className={className}
        {...props}
      >
        Toggle sidebar
      </button>
    );
  },
}));

jest.mock("@/components/ui/breadcrumb", () => ({
  Breadcrumb: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    mockBreadcrumb();

    return (
      <nav aria-label="breadcrumb" {...props}>
        {children}
      </nav>
    );
  },

  BreadcrumbList: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLOListElement>) => {
    mockBreadcrumbList();

    return <ol {...props}>{children}</ol>;
  },

  BreadcrumbItem: ({
    children,
    ...props
  }: React.LiHTMLAttributes<HTMLLIElement>) => {
    mockBreadcrumbItem();

    return <li {...props}>{children}</li>;
  },

  BreadcrumbLink: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    mockBreadcrumbLink();

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },

  BreadcrumbPage: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>) => {
    mockBreadcrumbPage();

    return (
      <span aria-current="page" {...props}>
        {children}
      </span>
    );
  },

  BreadcrumbSeparator: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLLIElement>) => {
    mockBreadcrumbSeparator();

    return (
      <li aria-hidden="true" {...props}>
        {children ?? "/"}
      </li>
    );
  },
}));

describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("metadata", () => {
    it("exports the correct page title", () => {
      expect(metadata).toEqual({
        title: "Dashboard",
      });
    });
  });

  describe("rendering", () => {
    it("renders the header", async () => {
      const element = await Page();
      render(element);

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the sidebar trigger", async () => {
      const element = await Page();
      render(element);

      expect(
        screen.getByRole("button", {
          name: /toggle sidebar/i,
        }),
      ).toBeInTheDocument();

      expect(mockSidebarTrigger).toHaveBeenCalledTimes(1);
    });

    it("renders the breadcrumb navigation", async () => {
      const element = await Page();
      render(element);

      expect(
        screen.getByRole("navigation", {
          name: /breadcrumb/i,
        }),
      ).toBeInTheDocument();

      expect(mockBreadcrumb).toHaveBeenCalledTimes(1);
    });
  });

  it("renders the DashboardCards component after the Suspense boundary resolves", async () => {
    const element = await Page();
    render(element);

    expect(
      await screen.findByRole("region", {
        name: /dashboard cards/i,
      }),
    ).toBeInTheDocument();

    expect(mockDashboardCards).toHaveBeenCalled();
  });
});
