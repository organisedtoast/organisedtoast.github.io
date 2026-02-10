// Import GripVertical icon from lucide-react icon library for the resize handle
import { GripVertical } from "lucide-react";
// Import ResizablePrimitive components from react-resizable-panels library for creating resizable panels
import * as ResizablePrimitive from "react-resizable-panels";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// ResizablePanelGroup component - container for a group of resizable panels
// This component manages the layout and resizing behavior of multiple panels
const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  // Panel group with flex layout that defaults to horizontal arrangement (vertical when direction is set to vertical)
  <ResizablePrimitive.PanelGroup
    // CSS classes for flex layout, full height, full width, and vertical flex layout when direction is vertical
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props} // Spread any additional props passed to the component
  />
);

// ResizablePanel component - individual panel that can be resized within the group
// This is a direct export of the primitive component with no additional styling
const ResizablePanel = ResizablePrimitive.Panel;

// ResizableHandle component - draggable handle that allows users to resize panels
// Includes an optional grip handle icon for better UX
const ResizableHandle = ({
  withHandle, // Optional flag to show the grip handle icon
  className, // Additional CSS classes to apply
  ...props // Additional props to spread to the component
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean; // Extended prop to control whether to show the handle icon
}) => (
  // Resize handle with relative positioning, thin width, centering, border background, and interactive states
  <ResizablePrimitive.PanelResizeHandle
    // CSS classes for relative positioning, thin width, item centering, border background, pseudo-element for extended hit area,
    // vertical/horizontal layout adjustments, focus states, and rotation for vertical orientation
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className, // Allow additional custom classes to be passed in
    )}
    {...props} // Spread any additional props passed to the component
  >
    {/* Optional grip handle icon for better visual affordance */}
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        {/* Grip icon that indicates the handle can be dragged */}
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

// Export all resizable components for use in other parts of the application
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
