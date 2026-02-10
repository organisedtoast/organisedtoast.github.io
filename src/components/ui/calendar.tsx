// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";
// Import ChevronLeft and ChevronRight icons from lucide-react icon library for navigation
import { ChevronLeft, ChevronRight } from "lucide-react";
// Import DayPicker component from react-day-picker library for calendar functionality
import { DayPicker } from "react-day-picker";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";
// Import button variants to apply consistent styling to calendar buttons
import { buttonVariants } from "@/components/ui/button";

// Define CalendarProps type that extends the props from the DayPicker component
// This allows us to pass through any valid DayPicker props to our Calendar component
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Calendar component - interactive date picker with customizable styling
// Wraps the react-day-picker library with custom styling and UI components
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    // DayPicker component with custom styling and navigation components
    <DayPicker
      // Show days from adjacent months in the current view (defaults to true)
      showOutsideDays={showOutsideDays}
      // Apply base padding and any additional classes passed to the component
      className={cn("p-3", className)}
      // Custom CSS class names for different parts of the calendar UI
      classNames={{
        // Container for all months - flex column on small screens, row on larger screens
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // Individual month container with vertical spacing
        month: "space-y-4",
        // Caption container (month/year header) with centering and relative positioning
        caption: "flex justify-center pt-1 relative items-center",
        // Month/year label styling
        caption_label: "text-sm font-medium",
        // Navigation controls container with horizontal spacing and centering
        nav: "space-x-1 flex items-center",
        // Navigation button styling using outline button variant with custom dimensions
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        // Previous month button positioned absolutely on the left
        nav_button_previous: "absolute left-1",
        // Next month button positioned absolutely on the right
        nav_button_next: "absolute right-1",
        // Table container for calendar days
        table: "w-full border-collapse space-y-1",
        // Header row container for day names
        head_row: "flex",
        // Individual day name header styling
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        // Row container for calendar days with full width and top margin
        row: "flex w-full mt-2",
        // Individual day cell styling with hover and selection states
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // Day button styling using ghost button variant with custom dimensions
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        // End of range day styling
        day_range_end: "day-range-end",
        // Selected day styling with primary colors
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        // Today's date styling with accent colors
        day_today: "bg-accent text-accent-foreground",
        // Days from outside months styling with reduced opacity
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        // Disabled day styling with reduced opacity
        day_disabled: "text-muted-foreground opacity-50",
        // Middle days in a range selection
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // Hidden day styling
        day_hidden: "invisible",
        // Spread any additional custom class names passed to the component
        ...classNames,
      }}
      // Custom UI components for navigation icons
      components={{
        // Left arrow icon for previous month navigation
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        // Right arrow icon for next month navigation
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      // Spread any additional props passed to the component (like onDayClick, mode, etc.)
      {...props}
    />
  );
}
// Set display name for debugging purposes in React DevTools
Calendar.displayName = "Calendar";

// Export the Calendar component for use in other parts of the application
export { Calendar };
