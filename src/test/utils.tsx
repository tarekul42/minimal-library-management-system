import { type ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/api/baseApi";
import authReducer from "@/redux/features/authSlice";

export function createTestStore() {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (gdm) => gdm().concat(baseApi.middleware),
  });
}

interface WrapperOptions {
  initialEntries?: string[];
}

function AllTheProviders({ children, initialEntries = ["/"] }: { children: React.ReactNode } & WrapperOptions) {
  const store = createTestStore();
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </Provider>
  );
}

function customRender(
  ui: ReactElement,
  options?: RenderOptions & WrapperOptions,
) {
  const { initialEntries, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// eslint-disable-next-line react-refresh/only-export-components
export { customRender as render };
