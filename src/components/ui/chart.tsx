// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import Recharts primitive components for chart functionality
import * as RechartsPrimitive from "recharts";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Define available themes and their corresponding CSS selectors
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

// Define ChartConfig type for configuring chart appearance and behavior
export type ChartConfig = {
  // Index signature for dynamic configuration keys
  [k in string]: {
    // Optional label for the chart element
    label?: React.ReactNode;
    // Optional icon component for the chart element
    icon?: React.ComponentType;
  } & (
    // Either color property OR theme property (but not both)
    { color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

// Define ChartContextProps type for the chart context
type ChartContextProps = {
  // Configuration object for the chart
  config: ChartConfig;
};

// Create a React context to share chart configuration with child components
const ChartContext = React.createContext<ChartContextProps | null>(null);

// Custom hook to access chart context values
function useChart() {
  // Get the context value
  const context = React.useContext(ChartContext);

  // Throw an error if the hook is used outside of a ChartContainer provider
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  // Return the context value
  return context;
}

// ChartContainer component - main container for charts with responsive sizing
// Uses React.forwardRef to allow parent components to reference the DOM element
const ChartContainer = React.forwardRef<
  HTMLDivElement, // Type for the DOM element being referenced
  React.ComponentProps<"div"> & { // Props type combining div element props with custom props
    config: ChartConfig; // Chart configuration object
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]; // Child elements
  }
>(({ id, className, children, config, ...props }, ref) => {
  // Generate a unique ID for the chart
  const uniqueId = React.useId();
  // Create chart ID using provided id or generated uniqueId
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    // Provide chart configuration to child components
    <ChartContext.Provider value={{ config }}>
      {/* Main chart container with predefined styling and responsive behavior */}
      <div
        data-chart={chartId} // Data attribute for identifying the chart
        ref={ref} // Reference to the DOM element
        // Apply flex layout, video aspect ratio, centering, small text size, and Recharts-specific styles
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className, // Additional custom classes
        )}
        {...props} // Spread any additional props
      >
        {/* Apply chart-specific styles */}
        <ChartStyle id={chartId} config={config} />
        {/* Responsive container for the chart content */}
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
// Set display name for debugging purposes in React DevTools
ChartContainer.displayName = "Chart";

// ChartStyle component - generates CSS variables for chart colors based on theme
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // Filter configuration entries that have either theme or color properties
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  // Return null if no color configurations exist
  if (!colorConfig.length) {
    return null;
  }

  // Generate CSS styles for different themes
  return (
    <style
      // Dangerously set inner HTML to inject CSS variables
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    // Get color from theme (for specific theme) or directly from color property
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    // Return CSS variable declaration if color exists
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")} // Join color declarations with newlines
}
`,
          )
          .join("\n"), // Join theme declarations with newlines
      }}
    />
  );
};

// ChartTooltip component - Recharts primitive for displaying tooltips
const ChartTooltip = RechartsPrimitive.Tooltip;

// ChartTooltipContent component - custom content for chart tooltips
// Uses React.forwardRef to allow parent components to reference the DOM element
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement, // Type for the DOM element being referenced
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & // Recharts tooltip props
    React.ComponentProps<"div"> & { // Div element props
      hideLabel?: boolean; // Flag to hide the label
      hideIndicator?: boolean; // Flag to hide the indicator
      indicator?: "line" | "dot" | "dashed"; // Type of indicator to show
      nameKey?: string; // Key for the name property
      labelKey?: string; // Key for the label property
    }
>(
  (
    {
      active, // Whether tooltip is active
      payload, // Data payload for the tooltip
      className, // Additional CSS classes
      indicator = "dot", // Indicator type (defaults to dot)
      hideLabel = false, // Whether to hide the label (defaults to false)
      hideIndicator = false, // Whether to hide the indicator (defaults to false)
      label, // Label for the tooltip
      labelFormatter, // Function to format the label
      labelClassName, // CSS classes for the label
      formatter, // Function to format the content
      color, // Color for the indicator
      nameKey, // Name key for the data
      labelKey, // Label key for the data
    },
    ref, // Reference to the DOM element
  ) => {
    // Get chart configuration from context
    const { config } = useChart();

    // Memoize the tooltip label to prevent unnecessary re-renders
    const tooltipLabel = React.useMemo(() => {
      // Return null if label should be hidden or no payload exists
      if (hideLabel || !payload?.length) {
        return null;
      }

      // Get the first item from the payload
      const [item] = payload;
      // Determine the key for the label
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      // Get configuration for the item
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      // Determine the value to display
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      // Format the label if a formatter is provided
      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      // Return null if no value exists
      if (!value) {
        return null;
      }

      // Return the formatted label
      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]); // Dependencies for memoization

    // Return null if tooltip is not active or no payload exists
    if (!active || !payload?.length) {
      return null;
    }

    // Determine if the label should be nested inside the item
    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      // Tooltip container with grid layout and styling
      <div
        ref={ref} // Reference to the DOM element
        // Apply grid layout, minimum width, item alignment, gap, rounded corners, border, background, padding, text size, and shadow
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className, // Additional custom classes
        )}
      >
        {/* Display the tooltip label if not nesting */}
        {!nestLabel ? tooltipLabel : null}
        {/* Grid container for the payload items */}
        <div className="grid gap-1.5">
          {/* Map through each item in the payload */}
          {payload.map((item, index) => {
            // Determine the key for the item
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            // Get configuration for the item
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            // Determine the color for the indicator
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              // Container for each payload item
              <div
                key={item.dataKey} // Unique key for the item
                // Apply flex layout, full width, flex wrap, item stretching, gap, and SVG styling
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center", // Center items if indicator is dot
                )}
              >
                {/* Use custom formatter if provided */}
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  // Default content structure
                  <>
                    {/* Display custom icon if provided */}
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      // Display indicator if not hidden
                      !hideIndicator && (
                        <div
                          // Apply shrinking, rounded corners, and dynamic border/background colors
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot", // Dot size
                            "w-1": indicator === "line", // Line width
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", // Dashed line
                            "my-0.5": nestLabel && indicator === "dashed", // Margin for dashed nested labels
                          })}
                          // Apply dynamic color styles
                          style={
                            {
                              "--color-bg": indicatorColor, // Background color CSS variable
                              "--color-border": indicatorColor, // Border color CSS variable
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    {/* Container for the item content */}
                    <div
                      // Apply flex layout, full width, space distribution, no leading, and dynamic alignment
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center", // Align differently based on nesting
                      )}
                    >
                      {/* Container for the label */}
                      <div className="grid gap-1.5">
                        {/* Display nested label if applicable */}
                        {nestLabel ? tooltipLabel : null}
                        {/* Display the item label or name */}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {/* Display the item value if it exists */}
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()} {/* Format the number with commas */}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
// Set display name for debugging purposes in React DevTools
ChartTooltipContent.displayName = "ChartTooltip";

// ChartLegend component - Recharts primitive for displaying legends
const ChartLegend = RechartsPrimitive.Legend;

// ChartLegendContent component - custom content for chart legends
// Uses React.forwardRef to allow parent components to reference the DOM element
const ChartLegendContent = React.forwardRef<
  HTMLDivElement, // Type for the DOM element being referenced
  React.ComponentProps<"div"> & // Div element props
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & { // Selected Recharts legend props
      hideIcon?: boolean; // Flag to hide the icon
      nameKey?: string; // Key for the name property
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  // Get chart configuration from context
  const { config } = useChart();

  // Return null if no payload exists
  if (!payload?.length) {
    return null;
  }

  return (
    // Legend container with flex layout and alignment
    <div
      ref={ref} // Reference to the DOM element
      // Apply flex layout, item centering, space distribution, gap, and vertical padding based on alignment
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {/* Map through each item in the payload */}
      {payload.map((item) => {
        // Determine the key for the item
        const key = `${nameKey || item.dataKey || "value"}`;
        // Get configuration for the item
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          // Container for each legend item
          <div
            key={item.value} // Unique key for the item
            // Apply flex layout, item alignment, gap, and SVG styling
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {/* Display custom icon if provided and not hidden */}
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              // Display color indicator
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]" // Size and shape
                style={{
                  backgroundColor: item.color, // Dynamic background color
                }}
              />
            )}
            {/* Display the item label */}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
// Set display name for debugging purposes in React DevTools
ChartLegendContent.displayName = "ChartLegend";

// Helper function to extract item configuration from a payload
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  // Return undefined if payload is not an object or is null
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  // Extract nested payload if it exists
  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  // Initialize config label key with the provided key
  let configLabelKey: string = key;

  // Check if key exists in payload and is a string
  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    // Check if key exists in nested payload and is a string
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  // Return configuration for the label key if it exists, otherwise return configuration for the original key
  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

// Export all chart components for use in other parts of the application
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
