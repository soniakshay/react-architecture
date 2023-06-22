import React  from 'react';


class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <div className="error-container-main">
          <div className="error-container">

            <h1 className="error-heading">Something went wrong!</h1>
            <p>Oops! Something went wrong. Please reload the page to continue.</p>


          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}


export default ErrorBoundary;
