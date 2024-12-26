# Link Component Implementation

## Status

Implemented

## Context

We need a consistent way to handle navigation and links throughout the application. Links are fundamental UI elements that can be used in different contexts:

- Within text content (inline)
- As standalone elements
- For internal navigation

## Decision

We will implement a Link component with the following key characteristics:

1. Two main variants:
   - Inline Links: For use within text content (with validation)
   - Standalone Links: For use as independent elements with arrow icon

2. Design Constraints:
   - Default color will be primary color from the color palette
   - Standalone links will include an arrow icon on the right
   - Non-standalone links can have custom icons via slot
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
     - Elements on the same page (anchor links)

4. Technical Implementation:
   - TypeScript and Lit are used for type safety and web component implementation
   - Props include:
     ```typescript
     interface LinkProps {
       href: HTMLAnchorElement["href"];                // URL that the hyperlink points to
       variant?: "inline" | "standalone";              // Link variant (default: "inline")
       size?: "large" | "medium" | "small";            // Link size for standalone variant (default: "medium")
       kind?: "primary" | "neutral";                   // Link kind for standalone variant (default: "primary")
       target?: HTMLAnchorElement["target"];          // Where to display the linked URL (default: "_self")
       rel?: HTMLAnchorElement["rel"];                // Relationship between documents
       hreflang?: HTMLAnchorElement["hreflang"];      // Language of the linked document
       type?: HTMLAnchorElement["type"];              // MIME type of the linked document
       referrerPolicy?: HTMLAnchorElement["referrerPolicy"]; // Referrer policy for the link
       download?: HTMLAnchorElement["download"];       // Whether to download the resource
       ping?: HTMLAnchorElement["ping"];              // URLs to be notified when following the link
       "aria-label"?: string;                         // Aria label for accessibility
     }
     ```
   - Slots:
     ```typescript
     /**
      * @slot icon - Custom icon slot for non-standalone variants
      */
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
      <bl-link href="/about">About Page</bl-link>
      ```

   2. Inline Link in Text (✅ Correct Usage):
      ```html
      <p>
        This is a paragraph with an
        <bl-link href="/about" variant="inline">About Page</bl-link>
        link in the text.
      </p>
      ```

   3. Inline Link Without Text (⚠️ Warning):
      ```html
      <!-- Will show warning in console -->
      <div>
        <bl-link href="/about" variant="inline">About Page</bl-link>
      </div>
      ```

   4. Standalone Link:
      ```html
      <bl-link
        href="/about"
        variant="standalone"
        size="large"
      >
        About Page
      </bl-link>
      ```

   5. Link with Custom Icon:
      ```html
      <bl-link href="/settings">
        Settings
        <bl-icon name="settings" slot="icon"></bl-icon>
      </bl-link>
      ```

   6. Link with Native Anchor Attributes:
      ```html
      <bl-link
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        hreflang="en"
        type="text/html"
        referrerpolicy="no-referrer"
        download="file.pdf"
        ping="https://analytics.example.com"
      >
        External Link
        <bl-icon name="external_link" slot="icon"></bl-icon>
      </bl-link>
      ```

   7. Custom Colored Link:
      ```html
      <bl-link
        href="/success"
        style="
          --bl-link-color: var(--bl-color-success);
          --bl-link-hover-color: var(--bl-color-success-hover);
          --bl-link-active-color: var(--bl-color-success-active);
        "
      >
        Success Link
        <bl-icon name="check" slot="icon"></bl-icon>
      </bl-link>
      ```

## Features

1. Variants:
   - Inline: For use within text content (with validation)
   - Standalone: For use as independent elements with arrow icon

2. Icons:
   - Standalone: Fixed arrow icon on the right
   - Non-standalone: Customizable icon via slot

3. Sizes (for standalone variant):
   - Small
   - Medium (default)
   - Large

4. Kinds (for standalone variant):
   - Primary (default)
   - Neutral

5. States:
   - Default
   - Hover
   - Active
   - Focus

6. Native Anchor Attributes:
   - href: URL destination
   - target: Link target (_self, _blank, etc.)
   - rel: Document relationships
   - hreflang: Language of linked document
   - type: MIME type
   - referrerPolicy: Referrer policy
   - download: Download behavior
   - ping: Ping notifications

7. Accessibility:
   - Proper ARIA attributes
   - Keyboard navigation support
   - Focus management

8. RTL Support:
   - Uses CSS logical properties
   - Icons properly positioned in RTL layouts

9. Validation:
   - Inline variant usage validation
   - Warning for incorrect usage
   - Runtime checks for proper context

## Consequences

### Positive
- Consistent navigation pattern across the application
- Clear separation between navigation (links) and actions (buttons)
- Type-safe implementation with TypeScript and native HTML types
- Full support for all native anchor tag attributes
- Flexible icon customization for non-standalone variants
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
- [MDN Anchor Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)

