# HVAC Task Selection Web Application

A modern, responsive web application for HVAC task selection and cost estimation. This application allows users to select HVAC devices, search for tasks, and manage task selections with cost calculations.

## Features

- **Device Selection**: Choose from various HVAC device types with pre-configured default tasks
- **Smart Search**: Search tasks with minimum 3-character requirement for performance
- **Limited Dropdown Results**: Shows only 10 results in dropdown with "View more results" option
- **Dropdown Selection**: Quick task selection from filtered search results
- **Modal View**: Browse all tasks in a paginated modal interface
- **Enhanced Search Flow**: "View more results" button opens modal with search pre-applied
- **Task Management**: Add, remove, and manage selected tasks with cost calculations
- **Cost Estimation**: Calculate costs including parts, labor hours, and flat fees
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Category Organization**: Tasks organized by maintenance type (Preventive, Corrective, Installation, Emergency)

## Project Structure

```
search-bar-hvac/
├── index.html              # Main entry point - clean HTML structure
├── src/
│   ├── css/
│   │   └── styles.css      # Custom CSS styles and animations
│   └── js/
│       ├── data.js         # Task categories, HVAC devices, and configuration
│       └── app.js          # Main application logic and event handlers
└── README.md               # This file
```

## File Organization

### `index.html`
- Main entry point for the application
- Clean HTML structure without inline JavaScript
- Semantic markup for accessibility
- Tailwind CSS for styling via CDN
- Links to separate CSS and JavaScript files in `/src/` directory

### `/src/css/styles.css`
- Custom CSS styles and animations
- Responsive design adjustments
- Modal and dropdown transitions
- Print styles for documentation

### `/src/js/data.js`
- Task categories and their associated tasks (138 total tasks)
  - Preventive Maintenance: 35 tasks
  - Corrective Maintenance: 35 tasks  
  - Installation: 34 tasks
  - Emergency: 34 tasks
- HVAC device configurations with default tasks
- Configuration constants (labor rates, pagination settings)
- Data structure definitions

### `/src/js/app.js`
- Application initialization and state management
- Event listeners and handlers
- DOM manipulation and rendering
- Modal, dropdown, and task management logic
- Cost calculation functions
- Utility functions

## Key Improvements Made

1. **Separation of Concerns**: HTML, CSS, and JavaScript are now in separate files
2. **Event Delegation**: Replaced inline event handlers with proper event delegation
3. **Modular Structure**: Code is organized into logical modules and functions
4. **Performance Optimization**: DOM element caching and efficient event handling
5. **Maintainability**: Clear code structure with comments and consistent naming
6. **Accessibility**: Proper semantic markup and keyboard navigation support
7. **Single Entry Point**: Removed duplicate index.html files - now uses only root index.html
8. **Production Ready**: Removed debugging code and console logs
9. **Asset Organization**: All CSS and JS assets properly organized in `/src/` directory
10. **Clean Architecture**: No inline JavaScript or CSS, all code properly externalized
11. **Enhanced Search UX**: Limited dropdown results (10 max) with "View more results" option
12. **Seamless Modal Integration**: "View more results" opens modal with search pre-applied

## Configuration

### Labor Rate
The labor rate can be configured in `/src/js/data.js`:
```javascript
const CONFIG = {
    LABOR_RATE: 75, // $75 per hour (configurable)
    // ...
};
```

### Search Settings
Search behavior can be adjusted:
```javascript
const CONFIG = {
    MIN_SEARCH_CHARACTERS: 3, // Minimum characters before search
    MODAL_TASKS_PER_PAGE: 10, // Tasks per page in modal
    // ...
};

// In renderDropdownTasks function:
const maxDropdownResults = 10; // Maximum results shown in dropdown
```

## Usage

1. **Select Device**: Choose an HVAC device type from the dropdown
2. **Search Tasks**: Use the search input to find additional tasks (minimum 3 characters)
3. **Quick Selection**: Select from up to 10 results shown in the dropdown
4. **View More Results**: Click "View more results (X)" to see all matching tasks in a modal
5. **Browse All Tasks**: Click the "All Tasks" button to view all available tasks in a modal
6. **Manage Selection**: Add/remove tasks by clicking on them
7. **Calculate Costs**: Enter parts cost, labor hours, and fees for each task
8. **View Totals**: See individual task totals and grand total

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- ES6+ JavaScript features used

## Development

To modify the application:

1. **Add New Tasks**: Update task categories in `/src/js/data.js`
2. **Style Changes**: Modify `/src/css/styles.css` for custom styling
3. **Feature Updates**: Add new functionality in `/src/js/app.js`
4. **HTML Structure**: Update `index.html` for layout changes

## Deployment

The application is ready for production deployment:

1. **Single Entry Point**: Use `index.html` as the main entry point
2. **Static Assets**: All assets are in `/src/` directory for easy hosting
3. **CDN Dependencies**: Uses Tailwind CSS via CDN for styling
4. **No Build Process**: Ready to deploy as-is to any static hosting service
5. **Cross-Browser**: Compatible with all modern browsers

### Hosting Options
- GitHub Pages
- Netlify
- Vercel
- Any static file hosting service

Simply upload all files maintaining the directory structure.

## Performance Considerations

- DOM elements are cached for better performance
- Event delegation is used for dynamic content
- Search is optimized with minimum character requirements
- Modal pagination prevents rendering too many items at once

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support (Escape to close modal)
- Focus management
- Screen reader friendly markup
- High contrast colors for better visibility

## Future Enhancements

- Local storage for task persistence
- Export functionality for selected tasks
- Print-friendly views
- Advanced filtering options
- Task templates and presets
- Integration with external APIs
