# Link Component Implementation

## Status

Implemented

## Context

We need a consistent way to handle navigation and links throughout the application. Links are fundamental UI elements that can be used in different contexts:

- Within text content (inline)
- As standalone elements
- For internal navigation
- For external links

## Decision

We will implement a Link component with the following key characteristics:

1. Two main variants:
   - Inline Links: For use within text content (with validation)
   - Standalone Links: For use as independent elements

2. Design Constraints:
   - Default color will be primary color from the color palette
   - Standalone links will include an icon on the right
   - Three sizes for standalone links: Large, Medium, and Small
   - Links will support hover and focus states
   - Links will support custom colors through CSS properties
   - Links will have proper RTL support using logical properties
   - Inline links must be used within text content

3. Usage Guidelines:
   - Links should only be used for navigation purposes
   - For actions that change data or trigger functionality, buttons should be used instead
   - Inline variant must be used within text content
   - Links can target:
     - Internal routes within the application
     - External websites (with external icon)
     - Elements on the same page (anchor links)

4. Technical Implementation:
   - TypeScript and Lit are used for type safety and web component implementation
   - Props include:
     ```typescript
     interface LinkProps {
       target: string;                              // Target URL for the link
       variant?: "inline" | "standalone";           // Link variant (default: "inline")
       size?: "large" | "medium" | "small";         // Link size for standalone variant (default: "medium")
       kind?: "primary" | "neutral";                // Link kind for standalone variant (default: "primary")
       external?: boolean;                          // Whether the link is external (default: false)
       disabled?: boolean;                          // Whether the link appears disabled (default: false)
       "aria-label"?: string;                       // Aria label for accessibility
     }
     ```
   - CSS Custom Properties:
     ```css
     :host {
       --bl-link-color: var(--bl-color-primary);           /* Default link color */
       --bl-link-hover-color: var(--bl-color-primary-hover);   /* Hover state color */
       --bl-link-active-color: var(--bl-color-primary-active); /* Active state color */
     }
     ```
   - Inline Variant Validation:
     ```typescript
     connectedCallback() {
       super.connectedCallback();

       if (this.variant === "inline") {
         const parentElement = this.parentElement;
         const hasTextSibling = Array.from(parentElement?.childNodes || []).some(
           node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
         );

         if (!parentElement || !hasTextSibling) {
           console.warn(
             "bl-link: Inline variant should be used within a text container. Example: <p>Text with <bl-link variant='inline'>a link</bl-link> inside.</p>"
           );
         }
       }
     }
     ```

5. Example Usage:

   1. Basic Link:
      ```html
      <bl-link target="/about">About Page</bl-link>
      ```

   2. Inline Link in Text (✅ Correct Usage):
      ```html
      <p>
        This is a paragraph with an
        <bl-link target="/about" variant="inline">About Page</bl-link>
        link in the text.
      </p>
      ```

   3. Inline Link Without Text (⚠️ Warning):
      ```html
      <!-- Will show warning in console -->
      <div>
        <bl-link target="/about" variant="inline">About Page</bl-link>
      </div>
      ```

   4. Standalone Link:
      ```html
      <bl-link
        target="/about"
        variant="standalone"
        size="large"
      >
        About Page
      </bl-link>
      ```

   5. External Link:
      ```html
      <bl-link
        target="https://example.com"
        external
      >
        External Link
      </bl-link>
      ```

   6. Custom Colored Link:
      ```html
      <bl-link
        target="/success"
        style="
          --bl-link-color: var(--bl-color-success);
          --bl-link-hover-color: var(--bl-color-success-hover);
          --bl-link-active-color: var(--bl-color-success-active);
        "
      >
        Success Link
      </bl-link>
      ```

## Features

1. Variants:
   - Inline: For use within text content (with validation)
   - Standalone: For use as independent elements with icons

2. Sizes (for standalone variant):
   - Small
   - Medium (default)
   - Large

3. Kinds (for standalone variant):
   - Primary (default)
   - Neutral

4. States:
   - Default
   - Hover
   - Active
   - Focus
   - Disabled

5. Accessibility:
   - Proper ARIA attributes
   - Keyboard navigation support
   - Focus management
   - Screen reader support for external links

6. RTL Support:
   - Uses CSS logical properties
   - Icons properly positioned in RTL layouts

7. Validation:
   - Inline variant usage validation
   - Warning for incorrect usage
   - Runtime checks for proper context

## Consequences

### Positive
- Consistent navigation pattern across the application
- Clear separation between navigation (links) and actions (buttons)
- Type-safe implementation with TypeScript and Lit
- Maintainable and scalable component structure
- Proper accessibility support
- RTL language support
- Customizable through CSS properties
- Validation for proper inline variant usage

### Negative
- Additional complexity in maintaining two variants
- Need to educate team members on proper usage (links vs buttons)
- Additional development time for implementing all states and variants
- Runtime validation overhead for inline variant

## Resources

- [Storybook Documentation](https://baklava.design/components/link)
- [Figma Design](https://www.figma.com/file/RrcLH0mWpIUy4vwuTlDeKN/Baklava-Design-Guide?node-id=23617-1414)

