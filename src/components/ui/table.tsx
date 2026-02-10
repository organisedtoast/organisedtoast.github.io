// Import React library to enable JSX syntax for creating UI elements
import * as React from "react";

// Import utility function to conditionally join CSS classes together
import { cn } from "@/lib/utils";

// Table component - main container for the table element with responsive scrolling
// Uses React.forwardRef to allow parent components to reference the DOM element
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    // Wrapper div with relative positioning, full width, and auto overflow to enable scrolling
    <div className="relative w-full overflow-auto">
      {/* Table element with full width, bottom caption alignment, and small text size */}
      <table
        ref={ref} // Reference to the underlying DOM element
        // CSS classes for full width, bottom caption alignment, and small text size
        className={cn("w-full caption-bottom text-sm", className)}
        {...props} // Spread any additional props passed to the component
      />
    </div>
  ),
);
// Set display name for debugging purposes in React DevTools
Table.displayName = "Table";

// TableHeader component - container for table header rows
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    // Thead element with border under each row
    <thead
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for adding a border under each tr element within the header
      className={cn("[&_tr]:border-b", className)}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableHeader.displayName = "TableHeader";

// TableBody component - container for table body rows
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    // Tbody element with no border on the last row
    <tbody
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for removing border from the last tr element within the body
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableBody.displayName = "TableBody";

// TableFooter component - container for table footer rows
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    // Tfoot element with top border, muted background, medium font weight, and no border on the last row
    <tfoot
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for top border, muted background with transparency, medium font weight, and removing border from the last tr element
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableFooter.displayName = "TableFooter";

// TableRow component - individual row in the table
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for bottom border, transition effects, selected state background, and hover effects
      className={cn(
        "border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", // Base classes for border, transition, selected state, and hover
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableRow.displayName = "TableRow";

// TableHead component - header cell in the table
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for height, padding, left alignment, vertical alignment, font weight, text color, and right padding adjustment for checkboxes
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", // Base classes for height, padding, alignment, font, text color, and checkbox adjustment
        className, // Allow additional custom classes to be passed in
      )}
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableHead.displayName = "TableHead";

// TableCell component - regular cell in the table
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for padding, vertical alignment, and right padding adjustment for checkboxes
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} // Base classes for padding, alignment, and checkbox adjustment
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableCell.displayName = "TableCell";

// TableCaption component - caption for the table
// Uses React.forwardRef to allow parent components to reference the DOM element
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref} // Reference to the underlying DOM element
      // CSS classes for top margin, small text size, and muted text color
      className={cn("mt-4 text-sm text-muted-foreground", className)} // Base classes for margin, text size, and text color
      {...props} // Spread any additional props passed to the component
    />
  ),
);
// Set display name for debugging purposes in React DevTools
TableCaption.displayName = "TableCaption";

// Export all table components for use in other parts of the application
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
