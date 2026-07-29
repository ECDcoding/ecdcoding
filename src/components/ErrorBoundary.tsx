import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  /** Optional label to identify where the error happened (e.g. route name). */
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches render/runtime errors in its subtree so a single broken component
 * never white-screens the whole app.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`, error, errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4 rounded-xl border border-border bg-card p-8 shadow-lg">
          <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            This part of the page failed to load. You can try again, or go back to the home page.
          </p>
          {this.state.error?.message && (
            <p className="text-xs text-muted-foreground/80 break-words font-mono">
              {this.state.error.message}
            </p>
          )}
          <div className="flex gap-3 justify-center pt-2">
            <Button variant="outline" onClick={this.handleReset}>Try again</Button>
            <Button onClick={() => { window.location.href = "/"; }}>Go home</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
