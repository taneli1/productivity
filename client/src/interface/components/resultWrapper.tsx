import { Result } from "../../data/result";

interface ResultWrapperProps {
  result: Result<any>;
  pageCentered?: boolean;
}

export const ResultWrapper: React.FunctionComponent<ResultWrapperProps> = ({
  result,
  children,
  pageCentered = false,
}) => {
  const centerClass = pageCentered ? "centered-page" : "centered";
  return (
    <>
      {result.isLoading() && (
        <div className={centerClass}>
          <p className="loading-spinner"></p>
        </div>
      )}

      {result.isError() && (
        <div className={centerClass}>
          <p className="pop">Something went wrong.</p>
        </div>
      )}

      {(result.isIdle() || result.isSuccess()) && <>{children}</>}
    </>
  );
};
