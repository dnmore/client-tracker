import { verifySession } from "@/lib/dal";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("verifySession", () => {
  const mockAuth = auth as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return session when user exists", async () => {
    const mockSession = {
      user: { id: "123", name: "John" },
    };

    mockAuth.mockResolvedValue(mockSession);

    const result = await verifySession();

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(mockRedirect).not.toHaveBeenCalled();
    expect(result).toEqual(mockSession);
  });

  it("should redirect when session is null", async () => {
    mockAuth.mockResolvedValue(null);

    await verifySession();

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("should redirect when session has no user", async () => {
    mockAuth.mockResolvedValue({});

    await verifySession();

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("should redirect when user is undefined", async () => {
    mockAuth.mockResolvedValue({ user: undefined });

    await verifySession();

    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("should propagate error if auth throws", async () => {
    const error = new Error("Auth failed");
    mockAuth.mockRejectedValue(error);

    await expect(verifySession()).rejects.toThrow("Auth failed");

    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("should not return anything after redirect", async () => {
    mockAuth.mockResolvedValue(null);

    await verifySession();

    expect(mockRedirect).toHaveBeenCalled();
  });
});
