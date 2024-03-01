import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import header from "./header";

export const Layouts = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={header}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
    >
      {children}
    </ThemedLayoutV2>
  );
};

