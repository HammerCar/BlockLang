goog.provide('Blockly.CodeGen');

goog.require('Blockly.Generator');
goog.require('Blockly.utils.string');

Blockly.CodeGen = new Blockly.Generator('CodeGen');

Blockly.CodeGen.scrub_ = function(block, code, opt_thisOnly) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly ? '' : Blockly.CodeGen.blockToCode(nextBlock);
    return code + nextCode;
  };

Blockly.CodeGen.scrubNakedValue = function(line) {
    return line + '\n';
};



Blockly.CodeGen['led_start'] = function(block) {
    return "";
};

Blockly.CodeGen['led_animation'] = function(block) {
    var code = Blockly.CodeGen.statementToCode(block, 'ANIM');

    if (code === "")
        return "";

    return code + "x";
};



Blockly.CodeGen['led_brightness'] = function(block) {
    var leds = Blockly.CodeGen.valueToCode(block, 'LEDS', 0);
    if (leds === "")
        return "";

    leds = JSON.parse(leds);
    var brightness = block.getFieldValue('BRIGHTNESS');
    
    var code = "e0" + brightness.toString(16);

    if (leds === true) {
        return code + "a";
    } else if (leds.x !== undefined) {
        return code + "s" + (15 - leds.y).toString(16) + leds.x.toString(16);
    } else {
        for (let x = 0; x < 16; x++)
            for (let y = 0; y < 16; y++)
                if (leds.leds[x][y].value)
                    code += "s" + (15 - y).toString(16) + x.toString(16);

        return code;
    }
};

Blockly.CodeGen['led_wait'] = function(block) {
    var time = Math.round(block.getFieldValue('BRIGHTNESS') / 15);
    var str = "0000" + time.toString(16);

    return "w" + str.substr(str.length - 4);
};

Blockly.CodeGen['led_stop'] = function(block) {
    return "wffff";
};



Blockly.CodeGen['led_all'] = function(block) {
    return ["true", 0];
};

Blockly.CodeGen['led_position'] = function(block) {
    var x = block.getFieldValue('X');
    var y = block.getFieldValue('Y');

    return [JSON.stringify({ x:x, y:y }), 0];
};

Blockly.CodeGen['led_select'] = function(block) {
    var leds = block.getFieldValue('LEDS');

    return [JSON.stringify(leds), 0];
};