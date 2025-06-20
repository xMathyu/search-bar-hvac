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
      {
        id: 19,
        name: "Clean Condenser Coils",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 20,
        name: "Check Refrigerant Levels",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 21,
        name: "Inspect Belt Tension",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 22,
        name: "Check Electrical Connections",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 23,
        name: "Test Safety Controls",
        system: "controls",
        priority: "high",
      },
      {
        id: 24,
        name: "Clean Drain Pan",
        system: "cooling",
        priority: "low",
      },
      {
        id: 25,
        name: "Check Flue System",
        system: "heating",
        priority: "medium",
      },
      {
        id: 26,
        name: "Inspect Heat Exchanger",
        system: "heating",
        priority: "high",
      },
      {
        id: 27,
        name: "Test Ignition System",
        system: "heating",
        priority: "medium",
      },
      {
        id: 28,
        name: "Check Gas Pressure",
        system: "heating",
        priority: "medium",
      },
      {
        id: 29,
        name: "Inspect Ventilation Dampers",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 30,
        name: "Clean Blower Assembly",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 31,
        name: "Check Motor Amperage",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 32,
        name: "Inspect Insulation",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 33,
        name: "Test Pressure Switches",
        system: "controls",
        priority: "medium",
      },
      {
        id: 34,
        name: "Check Condensate Pump",
        system: "cooling",
        priority: "low",
      },
      {
        id: 35,
        name: "Inspect Outdoor Unit",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 36,
        name: "Clean Indoor Coil",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 37,
        name: "Check Thermostat Accuracy",
        system: "controls",
        priority: "low",
      },
      {
        id: 38,
        name: "Inspect Vent Terminations",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 39,
        name: "Test Carbon Monoxide Levels",
        system: "heating",
        priority: "high",
      },
      {
        id: 40,
        name: "Check System Performance",
        system: "controls",
        priority: "medium",
      },
      {
        id: 41,
        name: "Inspect Mechanical Connections",
        system: "heating",
        priority: "medium",
      },
      {
        id: 42,
        name: "Clean Air Intake Grilles",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 43,
        name: "Check Refrigerant Lines",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 44,
        name: "Test Emergency Shut-offs",
        system: "controls",
        priority: "high",
      },
      {
        id: 45,
        name: "Inspect Mounting Hardware",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 46,
        name: "Check System Cycling",
        system: "controls",
        priority: "medium",
      },
      {
        id: 47,
        name: "Clean Combustion Chamber",
        system: "heating",
        priority: "medium",
      },
      {
        id: 48,
        name: "Test Limit Switches",
        system: "controls",
        priority: "medium",
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
      {
        id: 49,
        name: "Replace Contactor",
        system: "electrical",
        priority: "high",
      },
      {
        id: 50,
        name: "Repair Ductwork",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 51,
        name: "Replace Relay",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 52,
        name: "Fix Condensate Drain",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 53,
        name: "Replace Transformer",
        system: "electrical",
        priority: "high",
      },
      {
        id: 54,
        name: "Repair Gas Valve",
        system: "heating",
        priority: "high",
      },
      {
        id: 55,
        name: "Replace Igniter",
        system: "heating",
        priority: "medium",
      },
      {
        id: 56,
        name: "Fix Control Board",
        system: "controls",
        priority: "high",
      },
      {
        id: 57,
        name: "Replace Pressure Switch",
        system: "controls",
        priority: "medium",
      },
      {
        id: 58,
        name: "Repair Heat Exchanger",
        system: "heating",
        priority: "critical",
      },
      {
        id: 59,
        name: "Replace Expansion Valve",
        system: "cooling",
        priority: "high",
      },
      {
        id: 60,
        name: "Fix Inducer Motor",
        system: "ventilation",
        priority: "high",
      },
      {
        id: 61,
        name: "Replace Flame Sensor",
        system: "heating",
        priority: "medium",
      },
      {
        id: 62,
        name: "Repair Compressor",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 63,
        name: "Replace Fan Motor",
        system: "ventilation",
        priority: "high",
      },
      {
        id: 64,
        name: "Fix Reversing Valve",
        system: "cooling",
        priority: "high",
      },
      {
        id: 65,
        name: "Replace Limit Switch",
        system: "controls",
        priority: "medium",
      },
      {
        id: 66,
        name: "Repair Burner Assembly",
        system: "heating",
        priority: "high",
      },
      {
        id: 67,
        name: "Replace Evaporator Fan",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 68,
        name: "Fix Sequencer",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 69,
        name: "Replace Solenoid Valve",
        system: "heating",
        priority: "medium",
      },
      {
        id: 70,
        name: "Repair Defrost Control",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 71,
        name: "Replace Blower Wheel",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 72,
        name: "Fix Pilot Light",
        system: "heating",
        priority: "medium",
      },
      {
        id: 73,
        name: "Replace Temperature Sensor",
        system: "controls",
        priority: "medium",
      },
      {
        id: 74,
        name: "Repair Vent Damper",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 75,
        name: "Replace Filter Drier",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 76,
        name: "Fix Belt Drive System",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 77,
        name: "Replace Crankcase Heater",
        system: "cooling",
        priority: "low",
      },
      {
        id: 78,
        name: "Repair Zone Control Panel",
        system: "controls",
        priority: "high",
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
      {
        id: 79,
        name: "Install New Air Handler",
        system: "ventilation",
        priority: "high",
      },
      {
        id: 80,
        name: "Install Heat Pump",
        system: "cooling",
        priority: "high",
      },
      {
        id: 81,
        name: "Install Ductwork",
        system: "ventilation",
        priority: "high",
      },
      {
        id: 82,
        name: "Install Gas Line",
        system: "heating",
        priority: "high",
      },
      {
        id: 83,
        name: "Install Electrical Disconnect",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 84,
        name: "Install Condensate Pump",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 85,
        name: "Install Smart Thermostat",
        system: "controls",
        priority: "medium",
      },
      {
        id: 86,
        name: "Install Air Purifier",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 87,
        name: "Install Dehumidifier",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 88,
        name: "Install Return Air Duct",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 89,
        name: "Install Supply Register",
        system: "ventilation",
        priority: "low",
      },
      {
        id: 90,
        name: "Install Outdoor Unit Pad",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 91,
        name: "Install Refrigerant Lines",
        system: "cooling",
        priority: "high",
      },
      {
        id: 92,
        name: "Install Control Wiring",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 93,
        name: "Install Ventilation Fan",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 94,
        name: "Install Heat Recovery Ventilator",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 95,
        name: "Install Zone Control System",
        system: "controls",
        priority: "high",
      },
      {
        id: 96,
        name: "Install Outdoor Temperature Sensor",
        system: "controls",
        priority: "low",
      },
      {
        id: 97,
        name: "Install Boiler System",
        system: "heating",
        priority: "high",
      },
      {
        id: 98,
        name: "Install Radiant Heating",
        system: "heating",
        priority: "high",
      },
      {
        id: 99,
        name: "Install Chiller Unit",
        system: "cooling",
        priority: "high",
      },
      {
        id: 100,
        name: "Install Variable Speed Drive",
        system: "electrical",
        priority: "medium",
      },
      {
        id: 101,
        name: "Install Energy Recovery Unit",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 102,
        name: "Install Carbon Monoxide Detector",
        system: "controls",
        priority: "high",
      },
      {
        id: 103,
        name: "Install Pressure Relief Valve",
        system: "heating",
        priority: "medium",
      },
      {
        id: 104,
        name: "Install Whole House Filtration",
        system: "ventilation",
        priority: "medium",
      },
      {
        id: 105,
        name: "Install Backup Generator",
        system: "electrical",
        priority: "low",
      },
      {
        id: 106,
        name: "Install Mini-Split System",
        system: "cooling",
        priority: "medium",
      },
      {
        id: 107,
        name: "Install Geothermal Loop",
        system: "heating",
        priority: "high",
      },
      {
        id: 108,
        name: "Install Building Management System",
        system: "controls",
        priority: "high",
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
      {
        id: 109,
        name: "Carbon Monoxide Leak",
        system: "heating",
        priority: "critical",
      },
      {
        id: 110,
        name: "Water Leak Emergency",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 111,
        name: "Complete System Failure",
        system: "controls",
        priority: "critical",
      },
      {
        id: 112,
        name: "Overheating Emergency",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 113,
        name: "Frozen Pipes Emergency",
        system: "heating",
        priority: "critical",
      },
      {
        id: 114,
        name: "Electrical Fire Hazard",
        system: "electrical",
        priority: "critical",
      },
      {
        id: 115,
        name: "Refrigerant Leak Emergency",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 116,
        name: "Ventilation Failure",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 117,
        name: "Thermostat Malfunction Emergency",
        system: "controls",
        priority: "critical",
      },
      {
        id: 118,
        name: "Compressor Seizure",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 119,
        name: "Heat Exchanger Crack",
        system: "heating",
        priority: "critical",
      },
      {
        id: 120,
        name: "Emergency Power Outage",
        system: "electrical",
        priority: "critical",
      },
      {
        id: 121,
        name: "Basement Flooding",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 122,
        name: "Furnace Overheating",
        system: "heating",
        priority: "critical",
      },
      {
        id: 123,
        name: "Air Quality Emergency",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 124,
        name: "System Short Circuit",
        system: "electrical",
        priority: "critical",
      },
      {
        id: 125,
        name: "Emergency Shutdown Required",
        system: "controls",
        priority: "critical",
      },
      {
        id: 126,
        name: "Ductwork Collapse",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 127,
        name: "Boiler Pressure Emergency",
        system: "heating",
        priority: "critical",
      },
      {
        id: 128,
        name: "Condenser Fan Failure",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 129,
        name: "Emergency Valve Closure",
        system: "heating",
        priority: "critical",
      },
      {
        id: 130,
        name: "Control System Lockout",
        system: "controls",
        priority: "critical",
      },
      {
        id: 131,
        name: "Emergency Filter Blockage",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 132,
        name: "Electrical Panel Emergency",
        system: "electrical",
        priority: "critical",
      },
      {
        id: 133,
        name: "Emergency Temperature Spike",
        system: "heating",
        priority: "critical",
      },
      {
        id: 134,
        name: "Cooling Tower Emergency",
        system: "cooling",
        priority: "critical",
      },
      {
        id: 135,
        name: "Emergency Ventilation Loss",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 136,
        name: "Critical Safety System Failure",
        system: "controls",
        priority: "critical",
      },
      {
        id: 137,
        name: "Emergency Bearing Failure",
        system: "ventilation",
        priority: "critical",
      },
      {
        id: 138,
        name: "Emergency Pressure Loss",
        system: "heating",
        priority: "critical",
      },
    ],
  },
};

// HVAC device configurations and their default tasks
const hvacDevices = {
  "residential-ac": {
    name: "Residential Air Conditioner",
    defaultTasks: [1, 2, 9, 19, 20, 22, 24], // Basic maintenance tasks
  },
  "commercial-ac": {
    name: "Commercial HVAC Unit",
    defaultTasks: [1, 2, 7, 9, 10, 22, 23, 31, 40], // Comprehensive maintenance
  },
  "heat-pump": {
    name: "Heat Pump System",
    defaultTasks: [1, 2, 7, 10, 20, 64, 70], // Heat pump specific tasks
  },
  "furnace-gas": {
    name: "Gas Furnace",
    defaultTasks: [1, 10, 5, 25, 26, 27, 28, 39], // Gas furnace safety checks
  },
  "furnace-electric": {
    name: "Electric Furnace",
    defaultTasks: [1, 8, 11, 22, 31, 68], // Electric furnace maintenance
  },
  boiler: {
    name: "Boiler System",
    defaultTasks: [10, 8, 5, 25, 28, 103, 127], // Boiler specific maintenance
  },
  "split-system": {
    name: "Split System AC",
    defaultTasks: [1, 2, 12, 19, 20, 35, 43], // Split system maintenance
  },
  "package-unit": {
    name: "Package Unit",
    defaultTasks: [1, 2, 6, 9, 21, 30, 35], // Package unit maintenance
  },
  geothermal: {
    name: "Geothermal Heat Pump",
    defaultTasks: [1, 7, 10, 20, 40, 107], // Geothermal specific tasks
  },
  chiller: {
    name: "Chiller System",
    defaultTasks: [2, 12, 8, 22, 31, 99, 134], // Chiller maintenance
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
