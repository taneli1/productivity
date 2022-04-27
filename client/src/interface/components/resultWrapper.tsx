import { Result } from "../../data/result";

interface ResultWrapperProps {
  result: Result<any>;
}

export const ResultWrapper: React.FunctionComponent<ResultWrapperProps> = ({
  result,
  children,
}) => {
  return (
    <>
      {result.isLoading() && (
        <div className="centered-page">
          <p className="loading-spinner"></p>
        </div>
      )}

      {result.isError() && (
        <div className="centered-page">
          <p className="pop">Something went wrong.</p>
        </div>
      )}

      {(result.isIdle() || result.isSuccess()) && <>{children}</>}
    </>
  );
};
