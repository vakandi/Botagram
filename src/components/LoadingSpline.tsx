import { useEffect, useState } from "react";

const LoadingSpline = () => {
  const [Comp, setComp] = useState<any>(null);
  
  useEffect(() => {
    let mounted = true;
    import("@splinetool/react-spline").then((m) => {
      if (mounted) setComp(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Comp) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <Comp scene="loading..." className="w-full h-full" />;
};

export default LoadingSpline;
