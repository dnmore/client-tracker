import { render, screen } from "@testing-library/react";
import CreateLeadForm from "@/components/leads/create-lead";
import { GuardedButton } from "@/components/ui/guarded-button";



jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));


jest.mock("@/lib/actions", () => ({
  createLead: jest.fn(),
}));


jest.mock("@/components/ui/guarded-button", () => ({
  GuardedButton: ({ role, requiredRole, children }: any) => {
    const isAllowed = role === requiredRole;

    return (
      <button disabled={!isAllowed}>
        {children}
      </button>
    );
  },
}));

const mockUseActionState = require("react").useActionState;

describe("CreateLeadForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      jest.fn(),
    ]);

    render(<CreateLeadForm role="OWNER" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
  });

  it("renders validation errors from state", () => {
    mockUseActionState.mockReturnValue([
      {
        message: null,
        errors: {
          name: ["Name is required"],
          email: ["Invalid email"],
        },
      },
      jest.fn(),
    ]);

    render(<CreateLeadForm role="OWNER" />);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders form-level error message", () => {
    mockUseActionState.mockReturnValue([
      {
        message: "Something went wrong",
        errors: {},
      },
      jest.fn(),
    ]);

    render(<CreateLeadForm role="OWNER" />);

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });

  it("disables Save button for VIEWER role and enables for OWNER", () => {
  mockUseActionState.mockReturnValue([
    { message: null, errors: {} },
    jest.fn(),
  ]);

  const { rerender } = render(<CreateLeadForm role="OWNER" />);

  const saveButton = screen.getByRole("button", { name: /save/i });


  expect(saveButton).toBeEnabled();

 
  rerender(<CreateLeadForm role="VIEWER" />);
  expect(saveButton).toBeDisabled();
});

  it("renders Cancel link", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      jest.fn(),
    ]);

    render(<CreateLeadForm role="OWNER" />);

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    expect(cancelLink).toHaveAttribute("href", "/dashboard/leads");
  });
});