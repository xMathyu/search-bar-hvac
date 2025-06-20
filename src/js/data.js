// Task categories and their associated tasks
const taskCategories = {
  preventive: {
    name: "Preventive Maintenance",
    color: "blue",
    tasks: [
      {
        id: 1,
        name: "Replace Air Filter",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 2,
        name: "Clean Evaporator Coils",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 7,
        name: "Calibrate Thermostat",
        system: "controls",
        priority: "low",
      },
      {
        id: 9,
        name: "Inspect Ductwork",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 10,
        name: "Lubricate Moving Parts",
        system: "heating",
        priority: "low",
      },
    ],
  },
  corrective: {
    name: "Corrective Maintenance",
    color: "orange",
    tasks: [
      {
        id: 3,
        name: "Repair Thermostat",
        system: "controls",
        priority: "high",
      },
      {
        id: 6,
        name: "Replace Blower Motor",
        system: "ventilation",
        priority: "high",
      },
      {
        id: 8,
        name: "Repair Wiring",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 11,
        name: "Replace Capacitor",
        system: "electrical",
        priority: "high",
      },
      {
        id: 12,
        name: "Fix Refrigerant Leak",
        system: "cooling",
        priority: "critical",
      },
    ],
  },
  installation: {
    name: "Installation",
    color: "green",
    tasks: [
      {
        id: 4,
        name: "Install Humidifier",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 13,
        name: "Install Programmable Thermostat",
        system: "controls",
        priority: "medium",
      },
      {
        id: 14,
        name: "Install UV System",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 15,
        name: "Install Zone Valve",
        system: "controls",
        priority: "medium",
      },
    ],
  },
  emergency: {
    name: "Emergency",
    color: "red",
    tasks: [
      {
        id: 5,
        name: "Emergency: Gas Leak",
        system: "heating",
        priority: "critical",
      },
      {
        id: 16,
        name: "No Heat - Emergency",
        system: "heating",
        priority: "critical",
      },
      {
        id: 17,
        name: "No Cooling - Emergency",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 18,
        name: "Electrical Failure - Emergency",
        system: "electrical",
        priority: "critical",
      },
    ],
  },
};

// HVAC device configurations and their default tasks
const hvacDevices = {
  "residential-ac": {
    name: "Residential Air Conditioner",
    defaultTasks: [1, 2, 9], // Replace Air Filter, Clean Evaporator Coils, Inspect Ductwork
  },
  "commercial-ac": {
    name: "Commercial HVAC Unit",
    defaultTasks: [1, 2, 7, 9, 10], // Filter, Coils, Thermostat, Ductwork, Lubricate
  },
  "heat-pump": {
    name: "Heat Pump System",
    defaultTasks: [1, 2, 7, 10], // Filter, Coils, Thermostat, Lubricate
  },
  "furnace-gas": {
    name: "Gas Furnace",
    defaultTasks: [1, 10, 5], // Filter, Lubricate, Gas Leak check
  },
  "furnace-electric": {
    name: "Electric Furnace",
    defaultTasks: [1, 8, 11], // Filter, Wiring, Capacitor
  },
  boiler: {
    name: "Boiler System",
    defaultTasks: [10, 8, 5], // Lubricate, Wiring, Gas safety
  },
  "split-system": {
    name: "Split System AC",
    defaultTasks: [1, 2, 12], // Filter, Coils, Refrigerant
  },
  "package-unit": {
    name: "Package Unit",
    defaultTasks: [1, 2, 6, 9], // Filter, Coils, Blower Motor, Ductwork
  },
  geothermal: {
    name: "Geothermal Heat Pump",
    defaultTasks: [1, 7, 10], // Filter, Thermostat, Lubricate
  },
  chiller: {
    name: "Chiller System",
    defaultTasks: [2, 12, 8], // Coils, Refrigerant, Wiring
  },
};

// Create flat array of all tasks for search functionality
const tasks = Object.keys(taskCategories).flatMap((categoryKey) =>
  taskCategories[categoryKey].tasks.map((task) => ({
    ...task,
    type: categoryKey,
    categoryName: taskCategories[categoryKey].name,
  }))
);

// Configuration constants
const CONFIG = {
  LABOR_RATE: 75, // $75 per hour (configurable)
  MODAL_TASKS_PER_PAGE: 10,
  MIN_SEARCH_CHARACTERS: 3,
};
