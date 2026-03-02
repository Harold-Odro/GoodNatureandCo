import { Component } from 'react'
import { Button } from './Button'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            {/* Decorative element */}
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-sage-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal-800 mb-4">
              Something went wrong
            </h1>

            <p className="text-charcoal-600 mb-8 leading-relaxed">
              We apologize for the inconvenience. An unexpected error has occurred.
              Please try refreshing the page or return to the homepage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={this.handleReset} variant="primary">
                Try Again
              </Button>
              <Button href="/" variant="outline">
                Return Home
              </Button>
            </div>

            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left bg-linen-100 p-4 rounded-lg">
                <summary className="cursor-pointer text-charcoal-700 font-medium mb-2">
                  Error Details (Dev Mode)
                </summary>
                <pre className="text-sm text-red-600 overflow-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
