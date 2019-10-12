Blockly.BlockSvg.START_HAT = true;

Blockly.defineBlocksWithJsonArray([

    // -------------------------
    // Main Blocks
    // -------------------------


    // Start of animation
    {
        "type": "led_start",
        "message0": 'Start',
        "args0": [],
        "nextStatement": "led_animation",
        "hat": "cap",
        "colour": 180,
        "tooltip": "Start of animation (There can only be one)"
    },
    
    // Animation sequence
    {
        "type": "led_animation",
        "message0": 'Animation',
        "args0": [],
        "message1": '%1',
        "args1": [
            {
                "type": "input_statement",
                "name": "ANIM"
            }
        ],
        "previousStatement": ["led_animation", "led_start"],
        "nextStatement": "led_animation",
        "colour": 230,
        "tooltip": "Defines an animation"
    },


    // -------------------------
    // Programming Blocks
    // -------------------------


    // Set brigtness of led(s)
    {
        "type": "led_brightness",
        "message0": 'Set brightness of %1 to %2',
        "args0": [
            {
                "type": "input_value",
                "name": "LEDS",
                "check": "Leds"
            },
            {
                "type": "field_number",
                "name": "BRIGHTNESS",
                "value": 0,
                "min": 0,
                "max": 15,
                "precision": 1
            }
        ],
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 160,
        "tooltip": "Sets brightness of led(s)"
    },
    
    // Wait for milliseconds
    {
        "type": "led_wait",
        "message0": 'wait for %1 milliseconds',
        "args0": [
            {
                "type": "field_number",
                "name": "BRIGHTNESS",
                "value": 1000,
                "min": 15,
                "max": 983010,
                "precision": 1
            }
        ],
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 160,
        "tooltip": "Wait for x milliseconds"
    },
    
    // Stop execution
    {
        "type": "led_stop",
        "message0": 'Stop execution',
        "args0": [],
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 160,
        "tooltip": "Stop program execution until the next animation is started"
    },


    // -------------------------
    // Variable Blocks
    // -------------------------


    // All leds
    {
        "type": "led_all",
        "message0": 'All Leds',
        "args0": [],
        "output": "Leds",
        "colour": 50,
        "tooltip": "All leds"
    },


    // Define a led
    {
        "type": "led_position",
        "message0": 'x:%1 y:%2',
        "args0": [
            {
                "type": "field_number",
                "name": "X",
                "value": 0,
                "min": 0,
                "max": 15,
                "precision": 1
            },
            {
                "type": "field_number",
                "name": "Y",
                "value": 0,
                "min": 0,
                "max": 15,
                "precision": 1
            }
        ],
        "output": "Leds",
        "colour": 50,
        "tooltip": "Define a led"
    },


    // Select leds
    {
        "type": "led_select",
        "message0": '%1 leds',
        "args0": [
            {
                "type": "field_led",
                "name": "LEDS"
            }
        ],
        "output": "Leds",
        "colour": 50,
        "tooltip": "Select leds"
    }
]);
